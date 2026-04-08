import {
    SchedulerClient,
    UpdateScheduleCommand,
    DeleteScheduleCommand,
    GetScheduleCommand,
    ListSchedulesCommand
} from "@aws-sdk/client-scheduler";

const SCHEDULE_GROUP = "default";
const scheduler = new SchedulerClient({ region: "us-east-1" });

const SCHEDULER_ROLE_ARN = process.env.SCHEDULER_ROLE_ARN;
const EVENT_BUS_ARN = process.env.EVENT_BUS_ARN;

export const handler = async (event) => {
    console.log("RAW EVENT:", JSON.stringify(event, null, 2));

    if(event.requestContext.http.method === "OPTIONS") {
        return response(200, { });
    }

    let { groupId, index: indexParam } = event.pathParameters ?? {};

    if (!groupId || groupId === "") {
        groupId = undefined;
    } else {
        groupId = groupId.replace(/[^0-9a-zA-Z-_.]/g, "");
        groupId = groupId.slice(0, 32);
    }

    const index = indexParam !== undefined ? Number(indexParam) : undefined;

    if (indexParam !== undefined && Number.isNaN(index)) {
        return response(400, { error: "index must be a number" });
    }

    let body = {};

    try {
        body = event.body ? JSON.parse(event.body) : {};
    } catch {
        return response(400, { error: "Invalid JSON body" });
    }

    console.log("ROUTE INPUT:", {
        routeKey: event.routeKey,
        pathParameters: event.pathParameters,
        queryStringParameters: event.queryStringParameters,
        body
    });

    try {
        switch (event.routeKey) {
            case "GET /schedules":
                return await listSchedules({ nextToken: event.queryStringParameters?.nextToken });

            case "GET /schedules/{groupId}":
                return await listSchedules({
                    eventGroupId: groupId,
                    nextToken: event.queryStringParameters?.nextToken
                });

            case "GET /schedules/{groupId}/{index}":
                return await listSchedules({
                    eventGroupId: groupId,
                    index
                });

            case "PUT /schedules/{groupId}/{index}":
                return await updateSchedule({
                    eventGroupId: groupId,
                    index,
                    ...body
                });

            case "DELETE /schedules/{groupId}/{index}":
                return await deleteSchedule({
                    eventGroupId: groupId,
                    index
                });

            case "DELETE /schedules/{groupId}":
                return await deleteSchedule({
                    eventGroupId: groupId
                });

            default:
                return response(404, { error: "Route not found" });

        }
    } catch (err) {
        console.error("Operation failed:", err);
        return err.name === "ResourceNotFoundException"
            ? response(404, { error: "Schedule not found" })
            : response(500, { code: err.name, message: err.message });
    }
};

async function listSchedules({ eventGroupId, nextToken, index }) {
    if (eventGroupId && index !== undefined) {
        const scheduleName = `${eventGroupId}-${index}`;
        const result = await scheduler.send(new GetScheduleCommand({ Name: scheduleName, GroupName: SCHEDULE_GROUP }));

        return response(200, {
            name: result.Name,
            scheduledAt: result.ScheduleExpression,
            detail: JSON.parse(result.Target.Input),
            detailType: result.Target.EventBridgeParameters.DetailType,
        });
    }

    const params = {
        NextToken: nextToken ?? undefined,
    };

    if (eventGroupId) {
        params.NamePrefix = eventGroupId;
    }

    const result = await scheduler.send(new ListSchedulesCommand(params));

    return response(200, {
        schedules: result.Schedules.map(s => ({
            name: s.Name,
            scheduledAt: s.ScheduleExpression,
            state: s.State,
        })),
        nextToken: result.NextToken ?? null,
    });
}

async function updateSchedule({ eventGroupId, index, scheduledAt, detail, detailType }) {
    if (!eventGroupId || index === undefined) {
        return response(400, { error: !eventGroupId ? "eventGroupId required" : "index required" });
    }

    const scheduleName = `${eventGroupId}-${index}`;
    const existing = await scheduler.send(new GetScheduleCommand({ Name: scheduleName, GroupName: SCHEDULE_GROUP }));

    await scheduler.send(new UpdateScheduleCommand({
        Name: scheduleName,
        GroupName: SCHEDULE_GROUP,
        ScheduleExpression: scheduledAt
            ? `at(${scheduledAt.replace(/Z$/, "")})`
            : existing.ScheduleExpression,
        ScheduleExpressionTimezone: existing.ScheduleExpressionTimezone,
        FlexibleTimeWindow: existing.FlexibleTimeWindow,
        Target: {
            Arn: EVENT_BUS_ARN,
            RoleArn: SCHEDULER_ROLE_ARN,
            EventBridgeParameters: {
                DetailType: detailType ?? existing.Target.EventBridgeParameters.DetailType,
                Source: "trip.management",
            },
            Input: detail ? JSON.stringify(detail) : existing.Target.Input,
        },
        ActionAfterCompletion: "DELETE",
    }));

    return response(200, { success: true, updated: scheduleName });
}

async function deleteSchedule({ eventGroupId, index }) {
    if (!eventGroupId) {
        return response(400, { error: "eventGroupId is required" });
    }

    const deleted = [];

    // Optional index, if it's absent, we delete all schedules with the group prefix
    if (index !== undefined) {
        const scheduleName = `${eventGroupId}-${index}`;
        deleted.push(scheduleName);
        await scheduler.send(new DeleteScheduleCommand({ Name: scheduleName, GroupName: SCHEDULE_GROUP }));
    } else {
        let nextToken = undefined;

        do {
            const listed = await scheduler.send(new ListSchedulesCommand({
                NamePrefix: eventGroupId,
                GroupName: SCHEDULE_GROUP,
                NextToken: nextToken,
            }));

            for (const s of listed.Schedules) {
                deleted.push(s.Name);
            }

            const BATCH_SIZE = 10;

            for (let i = 0; i < listed.Schedules.length; i += BATCH_SIZE) {
                const batch = listed.Schedules.slice(i, i + BATCH_SIZE);

                await Promise.all(
                    batch.map(s =>
                        scheduler.send(new DeleteScheduleCommand({
                            Name: s.Name,
                            GroupName: SCHEDULE_GROUP
                        }))
                    )
                );
            }

            nextToken = listed.NextToken;
        } while (nextToken);

    }

    return response(200, { success: true, deleted, total: deleted.length });
}

async function response(statusCode, body) {
    const response = {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
            "Access-Control-Allow-Methods": "GET,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(body)
    };
    console.log("RESPONSE:", JSON.stringify(response, null, 2));

    return response;
}