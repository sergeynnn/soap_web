<meta charset="UTF-8">
<!doctype html>
<html >
	<head>
	</head>
	
	<body>
		<?php
			$url = "https://yandex.com?pa55=33&pa1=1&pa2=3&pa3=4&pa22=3&pa35=3";
			
			$url = preg_replace('/pa\d{1,}=3$/', '', $url);

			$url = preg_replace('/&&/', '&', $url);
			$url = preg_replace('/&$/', '', $url);
			$url_parts = explode('?',$url);
			$params = $url_parts[1];
			$param_parts = explode('&', $params);
			//$param_parts = maps)
			$param_parts = array_map(function($part) { return explode('=',$part); }, $param_parts);
			usort($param_parts, function($a, $b) { 
																	if($a[1] > $b[1]) {
																		return 1;
																	} else if($a[1] < $b[1]) {
																		return -1;
																	} 
																	return 0;
																 });
			echo '<br><br>';
			echo var_dump($param_parts);
			
			echo '<br><br>';
			echo $url;
		?>
	</body>

</html>
