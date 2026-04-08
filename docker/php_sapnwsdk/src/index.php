<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAP Connection</title>
</head>
<body>
    <form method="post">
        <button type="submit" name="reload">Conect</button>
    </form>

    <?php
	if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['reload'])) {
		
		include 'env.php';

		$parameters = [
			'ashost' => ASHOST,
			'sysnr'  => SYSNR,
			'client' => CLIENT,
			'user' => USER,
			'passwd' => PASSWD,
			'LANG' => LANG
		];

		// $parameters = [
		// 	'MSHOST' => MSHOST,
		// 	'R3NAME'  => R3NAME,
		// 	'GROUP' => GROUP,
		// 	'CLIENT' => CLIENT,
		// 	'user' => USER,
		// 	'passwd' => PASSWD,
		// 	'LANG' => LANG
		// ];

		// connect
		$connection = new SAPNWRFC\Connection($parameters);

		$function = $connection->getFunction('STFC_CHANGING');
		$result = $function->invoke([
		    'START_VALUE' => 0,
		    'COUNTER' => 1,
		]);

		echo "Connected";
		echo "<br />";
		echo "Function STFC_CHANGING Result:";

		var_dump($result);

		$connection->close();

    	}
    ?>
</body>
</html>

