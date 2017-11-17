<?php session_start(); ?>
<?php
	include_once 'php/libraries/dataTypes.php';
    include_once 'php/bd_connect.php';
	require_once 'php/libraries/send_gmail.php';

	switch($_GET['cmd']) {
        case 'phpinfo':
            echo phpinfo();
            break;
		case 'get_functions':
			$url = $_GET['url'];

			try {
                ini_set('soap.wsdl_cache_enabled',0);
                ini_set('soap.wsdl_cache_ttl',0);
                libxml_disable_entity_loader(false);
                $location = $url;
                $client = new SoapClient($url,array (
                    "trace" => 1,
                    "exceptions" => 0,
                    "connection_timeout"=>2000,
                    "location"=>$location // <- this was the reqiured parameter
                ));
                $functionList = $client->__getFunctions();
                if ($_GET['t'] == 1) {
                    echo var_dump($functionList);
                } else {
                    echo json_encode(array("status" => "success", "function_list" => $functionList));
                }
            } catch (SoapFault $e) {
			    echo json_encode(array('status' => 'error', 'message' => $e->getMessage()));
            }
			break;
		case 'get_types':
			echo var_dump(getAllTypes($_GET['url']));
			break;
        case 'get_type':
            $allTypes = getAllTypes($_GET['url']);
            $result = getSOAPType($_GET['type'],'');
            if($_GET['t'] == 1) {
                echo var_dump($result);
            } else {
                print_r(json_encode(array("status"=>"success", "type" => $result)));
            }
            break;
        case 'get_function_input':
            $allTypes = getAllTypes($_GET['url']);
            $result = getSOAPType($_GET['type'],'');

            print_r(json_encode(array("status"=>"success", "type" => "result")));
            break;
        case 'show_session_language';
            echo $_SESSION['current_language'];
            break;
        case 'send_test_mail':
            $success = sendMessage('buzin_semen@mail.ru','Semen',"Hello\r\nHello\r\nHello");
            if($success) {
                echo 'Mail has send successful';
            }
            break;
        case 'get_send_email_message':
            $success = sendMessage($_GET['mail_address'], $_GET['name'], $_GET['text']);
            header('Content-type: text/plain; charset=utf-8');
            echo var_dump($success);
            break;
        case 'php_info':
            echo phpinfo();
            break;
        case 'login_password_mail':
            print base64_encode("onlinesoapservice");
            print '<br>';
            print base64_encode("tr79LLsmFH");
            break;

    }

	switch ($_POST['cmd']) {
        case 'change_language':
            $_SESSION['current_language'] = $_POST['language'];
            echo json_encode(array('status'=>'success','current_laguage'=>$_SESSION['current_language']));
            break;
        case 'send_email_message':
            if(!$_POST['test_error']) {
                $text = $_POST['text'];
            } else {
                $text = '';
            }
            $success = sendMessage($_POST['mail_address'], $_POST['name'], $text);
            if($success['hasSend']) {
                echo json_encode(array('status'=>'success'));
            } else {
                echo json_encode(array('status'=>'error', 'error'=>$success['error']));
            }
            break;
        case 'call_method':
            $url = $_POST['url'];
            $method = $_POST['method'];
            $parameters = $_POST['parameters'];
            try {
                $client = new SoapClient($url);
                $return = $client->$method($parameters);
                print_r(json_encode(array('status'=>'success','result'=>$return)));
            } catch(SoapFault $e) {
                print(json_encode(array('status'=>'error', 'message'=>$e->getMessage())));
            }
            break;
        case 'send_refer':
            $refer = $_POST['refer'];
            $current_date = $_POST['current_date'];
            mysql_query("INSERT INTO `refer`(`id`, `refer`, `time`) VALUES (NULL, '$refer', '$current_date')");
            echo 'ok';
            break;

    }

    function getSOAPType($neededType, $variableName) {
        global $allTypes;
        $subTypeValues = array();
        foreach ($allTypes as $type) {
            $typeName = trim(str_replace('struct ', '',explode('{',$type)[0]));
            if($typeName == $neededType) {
                $subTypes = trim(str_replace('}','',explode('{',$type)[1]));
                $subTypes = substr($subTypes,0,-1);
                $subTypes = explode(';',$subTypes);
                if(count($subTypes) == 1 and trim($subTypes[0]) == '') {
                    continue;
                }
                foreach($subTypes as $subType) {
                    $subTypeSignature = explode(' ',trim($subType));
                    $subType = $subTypeSignature[0];
                    $subVariableName = $subTypeSignature[1];
                    if(isPrimitiveDataType($subType)) {
                        array_push($subTypeValues, $subType.' '.$subVariableName);
                    } else {
                        $subTypeValue = getSOAPType($subType,$subVariableName);
                        array_push($subTypeValues,$subTypeValue);
                    }
                }
                break;
            }
        }
        $result = array();
        $key = $neededType;
        if($variableName) {
            $key = $key.' '.$variableName;
        }
        $result[$key] = $subTypeValues;
        return $result;
    }

	function getAllTypes($url) {
        $client = new SoapClient($url);
        $types = $client->__getTypes();
        return $types;
    }



?>