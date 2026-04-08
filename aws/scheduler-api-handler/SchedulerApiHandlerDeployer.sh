#!/bin/bash
set -e

ENV=${1:-dev}
REGION="us-east-1"
STACK_NAME="scheduler-api-${ENV}"
BUCKET="ssa-lambdas-code-${ENV}"
PROFILE=${2:-default}
CODE_VERSION=$(date +%s)  # timestamp unix ex: 1716825600 Unique value for each deployment

echo "Deployment environment: $ENV"
echo "Code version: $CODE_VERSION"

# ─── 1. CREATE THE S3 BUCKET IF NOT EXISTING ──────────────────────────────────
aws s3 mb s3://$BUCKET --region $REGION --profile $PROFILE 2>/dev/null || true

# ─── 2. ZIP AND UPLOAD ──────────────────────────────────────────────────
echo "Uploading code..."
aws s3 cp SchedulerApiHandler.zip s3://$BUCKET/SchedulerApiHandler-$CODE_VERSION.zip --profile $PROFILE
echo "Code uploaded to S3 bucket: $BUCKET"

# ─── 3. CLOUDFORMATION DEPLOYMENT ─────────────────────────────────────────────
echo "CloudFormation deployment..."
aws cloudformation deploy \
  --template-file ssa-scheduler-api-stack.yaml \
  --stack-name $STACK_NAME \
  --parameter-overrides Environment=$ENV CodeVersion=$CODE_VERSION \
  --capabilities CAPABILITY_NAMED_IAM \
  --region $REGION --profile $PROFILE

# ─── 4. DISPLAY THE API URL ─────────────────────────────────────────────
echo ""
echo "API URL:"
aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --region $REGION \
  --query "Stacks[0].Outputs[?OutputKey=='ApiUrl'].OutputValue" \
  --output text --profile $PROFILE

echo "Deployment completed!"

# EXECUTION INSTRUCTIONS:
# chmod +x SchedulerApiHandlerDeployer.sh
# ./SchedulerApiHandlerDeployer.sh dev ssa-dev
# ./SchedulerApiHandlerDeployer.sh qa ssa-qa
# ./SchedulerApiHandlerDeployer.sh prod ssa-uat