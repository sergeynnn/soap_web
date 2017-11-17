<?php
	session_start();

	if(@strtolower($_REQUEST['code']) == strtolower($_SESSION['random_number']))
	{
		echo json_encode(array("status"=>"success"));
	}
	else
	{
        echo json_encode(array("status"=>"invalid"));
    }
?>
