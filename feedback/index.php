<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
    <title> Online SOAP </title>

    <meta name="robots" content="noindex, nofollow" />

    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="../semantic/semantic.min.css">
    <link rel="stylesheet" type="text/css" href="../styles/main.css">
    <link rel="stylesheet" type="text/css" href="../styles/language.css">
    <link rel="stylesheet" type="text/css" href="../styles/feedback.css">
    <script src="../js/jquery-3.2.1.min.js"></script>
    <script src="../semantic/semantic.min.js"></script>
    <script src="../js/scripts/extensions/object.js"></script>
    <script src="../js/scripts/language.js"></script>
    <script src="../js/jquery.autosize.js"></script>
    <script src="../js/scripts/feedback/send_message.js"></script>
    <script src="../captcha/js/change_captcha.js"></script>
    <script src="../js/scripts/feedback/captcha.js"></script>
    <link rel="icon" type="image/png" href="../img/fav-1.png">
    <style>

        #refresh{
            cursor:pointer;
            vertical-align: top;
            font-size: xx-large;
            color: #3323AD;
        }

        #captcha {
            cursor: pointer;
        }

    </style>
    <script type="text/javascript" src="https://vk.com/js/api/share.js?94" charset="windows-1251"></script>

    <meta property="og:url"           content="http://soap-web.com" />
    <meta property="og:type"          content="website" />
    <meta property="og:title"         content="SOAP web-client" />
    <meta property="og:description"   content="Light and comfortable SOAP web-client" />
    <meta property="og:image"         content="http://soap-web.com/img/share/icon_soap_share.jpg" />

</head>
<body>

<?php include_once '../templates/main_menu.php'; ?>
    <div id="main_container" class="ui raised very padded text container segment">
        <?php

        ?>
        <div id="header_label">
            <h2 class="ui header">
                <i class="at icon"></i>
                <div id="header_content" data-en-text="Send a message to us" data-ru-text="Отправить нам письмо" class="content lang-item"  style="visibility: hidden">Send a message to us</div>
                <i class="mail outline icon"></i>
                <i class="send outline icon"></i>
            </h2>
        </div>
        <script>

        </script>

        <div class="ui form  wide column">

            <div class="inline fields ui grid " id="email_input_place">
                <div class="field two wide column ">
                </div>
                <label id="mail_label" style="font-size: medium; margin: 0px !important;" class="one  wide column">Mail:</label>

                <div class="field nine wide column">
                    <input class="language-placeholder" autocomplete="off" type="text" id="email" data-en-text="Enter your e-mail" data-ru-text="Введите вашу почту" placeholder="Enter your e-mail">
                </div>
                <div id="send_email" style="visibility: hidden" class="lang-item ui download primary button" data-en-text="Send Mail" data-ru-text="Отправить письмо">Send Mail</div>
                <script>
                    var getSendMailRuClone = $('#send_email').clone(false);
                    getSendMailRuClone.attr('id','send_email_ru');
                    getSendMailRuClone.html(getSendMailRuClone.data('ru-text'));
                    getSendMailRuClone.css('display','none');
                    $('body').append(getSendMailRuClone);
                    if(parseFloat(getSendMailRuClone.css('width').toString().replace('px','')) >  parseFloat($('#send_email').css('width').toString().replace('px',''))) {
                        $('#send_email').css('width',  getSendMailRuClone.css('width'));
                    }
                    getSendMailRuClone.remove();
                    $('#send_email').css('visibility','initial')
                </script>
            </div>

            <div class="inline fields ui grid " id="email_input_place">
                <div class="field two wide column ">
                </div>
                <label id="name_label" style="visibility: hidden; font-size: medium; margin: 0px !important" data-ru-text="Имя:" data-en-text="Name:" class="one  wide column lang-item">Name:</label>
                <script>
                    var mailLabel = $('#mail_label').css('width');
                    $('#name_label').css({'width':mailLabel, 'visibility':'initial'});

                </script>
                <div class="field nine wide column">
                    <input class="language-placeholder" autocomplete="off" type="text" id="name" data-en-text="Enter your name" data-ru-text="Введите ваше имя" placeholder="Enter your name">
                </div>
            </div>

            <script>
                $(function(){
                    $('#mail_text').autosize();
                });
            </script>

            <div class="fields ui">
                <div class="field three wide column "></div>
                <div class="field nine wide column">
                    <textarea class="language-placeholder" data-en-text="Message text" data-ru-text="Текст сообщения" id="mail_text"></textarea>
                </div>
            </div>


            <div class="fields ui">
                <div class="field three wide column "></div>
                <div class="field five wide column ">
                    <img src="../captcha/get_captcha.php" alt="" id="captcha" />
                    <i id="refresh" class="refresh icon"></i>
                </div>
            </div>

            <div class="fields ui">
                <div class="field three wide column "></div>
                <div class="field four wide column">
                    <input id="captcha_code" class="language-placeholder" data-en-text="Enter Captcha code" data-ru-text="Введите код капчи" name="code" type="text">
                </div>
            </div>


        </div>

    </div>
</body>
<?php include_once '../templates/social_network_sharing.php'; ?>
<?php include_once '../templates/stat.php'; ?>
</html>
