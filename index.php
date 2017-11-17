<?php session_start(); ?>
<!DOCTYPE html>
<html xmlns:fb="http://ogp.me/ns/fb#">
<head>
	<title> Online SOAP </title>

    <!-- <meta name="description" content="Online SOAP web-client. Light, comfortable and flexible client help to test, debug and work with SOAP-based web services"> -->

    <meta name="description" content="Онлайн SOAP веб-клиент. Легкий, удобный и гибкий клиент для тестирования, отладки и работы с веб-сервисами, основанными на протоколе SOAP.">
    <meta name="robots" content="noyaca"/>
    <meta name="keywords" content="online soap wsdl client soap wsdl test testing debug debugging  web services web client онлайн соап всдл клиент тестирование отладка веб сервисы веб клиент" />
    <meta charset="utf-8">
    <meta name="yandex-verification" content="2f62916fc8bad2f0" />
	<link rel="stylesheet" type="text/css" href="semantic/semantic.min.css">
	<link rel="stylesheet" type="text/css" href="styles/main.css">
    <link rel="stylesheet" type="text/css" href="styles/language.css">
    <link rel="stylesheet" type="text/css" href="styles/function_params.css">
    <link rel="stylesheet" type="text/css" href="styles/parameters_definition.css">
    <link rel="stylesheet" type="text/css" href="styles/method.css">
    <script src="js/jquery-3.2.1.min.js"></script>
	<script src="semantic/semantic.min.js"></script>
    <script src="js/scripts/extensions/object.js"></script>
	<script src="js/scripts/methods.js"></script>
    <script src="js/scripts/language.js"></script>
    <script src="js/jquery.autosize.js"></script>
    <script src="js/scripts/call_method.js"></script>
    <script src="js/scripts/error.js"></script>
    <script src="js/bookmark.js"></script>
    <script src="js/scripts/index/load.js"></script>

    <!-- Put this script tag to the <head> of your page -->
    <script type="text/javascript" src="https://vk.com/js/api/share.js?94" charset="windows-1251"></script>

    <meta property="og:url"           content="http://soap-web.com" />
    <meta property="og:type"          content="website" />
    <meta property="og:title"         content="SOAP web-client" />
    <meta property="og:description"   content="Light and comfortable SOAP web-client" />
    <meta property="og:image"         content="http://soap-web.com/img/share/icon_soap_share.jpg" />



    <link rel="icon" type="image/png" href="img/fav-1.png">
    <link rel="shortcut icon" href="img/fav-1.png" type="image/vnd.microsoft.icon">
</head>
<body>
<a href="http://soap-web.com">1</a>
<?php include_once 'templates/main_menu.php'; ?>



<div id="main_container" class="ui raised very padded text container segment">
	<div class="ui grid">
        <div class="ui five wide column">
            <div  id="function_list_container"></div>
        </div>
		<div class="ui form thirten wide column">
		  <div class="inline fields ui grid container">
			<label style="visibility: hidden" id="url_label" data-en-text="URL:" data-ru-text="Адрес:" class="one lang-item wide column">URL:</label>
              <script>
                  var urlRuClone = $('#url_label').clone(false);
                  urlRuClone.html(urlRuClone.data('ru-text'));
                  urlRuClone.attr('id', 'url_label_ru')
                  urlRuClone.css('display','none');
                  $('#url_label').before(urlRuClone);
                  if(urlRuClone.css('width') >  $('#url_label').css('width')) {
                      $('#url_label').css('width',  urlRuClone.css('width'));
                  }
                  urlRuClone.remove();
                  $('#url_label').css('visibility','initial');
              </script>
			<div class="field nine wide column">
			  <input class="language-placeholder" type="text" id="url" data-en-text="Enter URL" data-ru-text="Введите адрес" placeholder="Enter URL">
            </div>
			<div id="get_methods" style="visibility: hidden" class="lang-item ui download primary button" data-en-text="Get Methods" data-ru-text="Получить методы">Get Methods</div>
		    <script>
                var getMethodsRuClone = $('#get_methods').clone(false);
                getMethodsRuClone.attr('id','get_methods_ru');
                getMethodsRuClone.html(getMethodsRuClone.data('ru-text'));
                getMethodsRuClone.css('display','none');
                $('body').append(getMethodsRuClone);
                if(parseFloat(getMethodsRuClone.css('width').toString().replace('px','')) >  parseFloat($('#get_methods').css('width').toString().replace('px',''))) {
                    $('#get_methods').css('width',  getMethodsRuClone.css('width'));
                }
                getMethodsRuClone.remove();
                $('#get_methods').css('visibility','initial')
            </script>
          </div>

          <div id="working-container">
               <div id="message_place"></div>
               <div id="call_method_place" style="display: none">
                  <div class="field">
                      <div id="method_name_label">
                          <h4 id="method_name"></h4>
                          <span id="close_call_method_place">x</span>
                      </div>
                      <div id="response_place"></div>
                      <div id="method_parameters"></div>
                  </div>
              </div>
          </div>

		</div>
	</div>

</div>

</body>


<?php include_once 'templates/social_network_sharing.php'; ?>
<?php include_once 'templates/stat.php'; ?>
</html>

