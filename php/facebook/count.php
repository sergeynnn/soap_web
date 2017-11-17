 <?php
  include_once '../bd_connect.php';
  $ch = curl_init();
  $url = 'http://graph.facebook.com/?fields=share&id=http://www.soap-web.com';
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 300);
  curl_setopt($ch, CURLOPT_TIMEOUT, 300);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

  $data = curl_exec($ch);
  
  curl_close($ch);
  if($_GET['bd'] == 1) {
	  $response = json_decode($data);
	  if(isset($response->share->share_count)) {
		  $count = $response->share->share_count;
		  if($count > 0) {
			  mysql_query("INSERT INTO `social_sharing`(`id`, `name`, `count`) VALUES (NULL, 'fb', '$count') 
									ON DUPLICATE KEY UPDATE `count` =  '$count'" );
			  echo json_encode(array('status'=>'success', 'count' => $count));
		  }	else {
			  $count = mysql_fetch_array(mysql_query("SELECT `count` FROM `social_sharing` WHERE `name` = 'fb'"))[0];
			  echo json_encode(array('status'=>'success', 'count' => $count));
		  }	  
	  } else {
		$count = mysql_fetch_array(mysql_query("SELECT `count` FROM `social_sharing` WHERE `name` = 'fb'"))[0];
		echo json_encode(array('status'=>'success', 'count' => $count));		  
	  }

	  
  } else {
	  echo $data;
  }
  
  ?>