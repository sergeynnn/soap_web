$(document).ready(function() {
    $('#send_email').click(function() {
        console.log('message sending');
        $('.message-send-status-label-container').remove();
        $('#captcha_error_message').remove();
        var currentLanguage = $('input[name="current_language"]').val();
        var email = $('#email'), mailText = $('#mail_text'), hasError = false;

        if(!validateEmail($.trim(email.val()))) {
            var emailErrorLabels = {'en_US':'Enter correct email value', 'ru_RU':'Введите корректное значение адреса электронной почты'};
            var currentEmailErrorLabel = emailErrorLabels[currentLanguage];
            email.addClass('input-error');
            $('#email_error_label').remove();
            $('#email_input_place').before('<div class="fields ui" id="email_error_label" style="margin: 0px !important;">'+
                                              '<div class="field four wide column "></div>'+
                                              '<div class="ui lang-item pointing below red label" data-en-text="'+emailErrorLabels['en_US']+'" '+
                                                    ' data-ru-text="'+emailErrorLabels['ru_RU']+'" >'+
                                                    currentEmailErrorLabel+
                                              '</div>'+
                                          '</div>');
            hasError = true;
        } else {
            email.removeClass('input-error');
            $('#email_error_label').remove();
        }

        if(!$.trim(mailText.val())) {
            mailText.addClass('input-error');
            var mailTextErrorLabels = {'en_US':'Enter a message text', 'ru_RU':'Введите текст сообщения'};
            var currentMailTextErrorLabel = mailTextErrorLabels[currentLanguage];
            $('#mail_text_error_label').remove();
            mailText.before('<div id="mail_text_error_label" class="ui pointing below lang-item red label" id="mail_error_label" data-en-text="'+mailTextErrorLabels['en_US']+'" '+
                                ' data-ru-text="'+mailTextErrorLabels['ru_RU']+'" >'+
                                    currentMailTextErrorLabel+
                           '</div>');
            hasError = true;
        } else {
            mailText.removeClass('input-error');
            $('#mail_text_error_label').remove();
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../captcha/check_captcha.php', false);
        var captchaCode = $('#captcha_code');
        var body = 'code='+encodeURIComponent(captchaCode.val());
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(body);
        if(xhr.status == 200) {
            console.log(xhr.responseText)
            try {
                var response = JSON.parse(xhr.responseText);
                switch(response.status) {
                    case 'invalid':
                        $('#captcha_code').addClass('input-error');
                        var captchaErrorLabels = {'en_US':'Incorrect captcha code', 'ru_RU':'Неверный код каптчи'};
                        var currentCaptchaErrorLabel = captchaErrorLabels[currentLanguage];
                        $('#captcha_code').before('<div id="captcha_error_message" class="ui lang-item pointing below red label" data-en-text="'+captchaErrorLabels['en_US']+'" '+
                                                  ' data-ru-text="'+captchaErrorLabels['ru_RU']+'">'+
                                                    currentCaptchaErrorLabel+
                                                 '</div>');
                        hasError = true;
                        break;
                    case 'success':
                        $('#captcha_code').removeClass('input-error');
                        $('#captcha_error_message').remove();
                        break;
                }
            } catch(e) {
                $('#captcha_code').addClass('input-error');
                var captchaErrorLabels = {'en_US':'Failed to check captcha code', 'ru_RU':'Нe удалось проверить код каптчи'};
                var currentCaptchaErrorLabel = captchaErrorLabels[currentLanguage];
                $('#captcha_code').before('<div id="captcha_error_message" class="ui lang-item pointing below red label" data-en-text="'+captchaErrorLabels['en_US']+'" '+
                    ' data-ru-text="'+captchaErrorLabels['ru_RU']+'">'+
                    currentCaptchaErrorLabel+
                    '</div>');
                hasError = true;
            }
        }

        if(hasError) {
            return;
        }
        console.log('validate successfull');
        var name = $.trim($('#name').val()), text = $.trim(mailText.val()), emailAddress = $.trim(email.val());
        var data = {cmd: 'send_email_message', name: $('#name').val(), text: text, mail_address: emailAddress};
        console.log(data);
        $.post('../server.php', data, function(data) {
            console.log(data);
            try {
                var response = JSON.parse(data);
                switch(response.status) {
                    case 'success':
                        var mailSendStateLabels = {'en_US':'Massage has been sent successful', 'ru_RU':'Сообщение успешно отправлено'};
                        var currentMailSendStateLabel = mailSendStateLabels[currentLanguage];
                        $('#main_container').prepend('<div class="ui centered grid wide column message-send-status-label-container">'+
                                                         '<div class="field ui pointing below orange label message-send-status-label">'+
                                                            '<i id="close-message-send-status-label" class="delete icon" style="float: right;"></i>'+
                                                            '<span class="lang-item" id="message-send-status-label-text"' +
                                                                ' data-en-text="'+mailSendStateLabels['en_US']+'"'+
                                                                ' data-ru-text="'+mailSendStateLabels['ru_RU']+'"> '+
                                                                    currentMailSendStateLabel+
                                                            '</span>'+
                                                         '</div>'+
                                                    '</div>');
                        setTimeout(function() {
                            $('#email').val('');
                            $('#name').val('');
                            $('#mail_text').val('');
                            $('#captcha_code').val('');
                            change_captcha();
                        }, 500);
                        break;
                    case 'error':
                        showMailSendError(response.error, currentLanguage);
                        break;
                }
            } catch(e) {
                showMailSendError(e.message, currentLanguage);
            }
        });

    });



    $('body').on('click','#close-message-send-status-label', function() {
        $('.message-send-status-label-container').remove();
    });
});

function showMailSendError(errorText, currentLanguage) {
    var mailSendStateLabels = {'en_US':'Massage hasn\'t been sent successful because', 'ru_RU':'Сообщение не было доставлено тех. поддержке, потому что:'};
    var currentMailSendStateLabel = mailSendStateLabels[currentLanguage];
    $('#main_container').prepend('<div class="ui centered grid wide column message-send-status-label-container">'+
                                     '<div class="field ui pointing below red label message-send-status-label">'+
                                         '<i id="close-message-send-status-label" class="delete icon" style="float: right;"></i>'+
                                         '<span class="lang-item" id="message-send-status-label-text"' +
                                         ' data-en-text="'+mailSendStateLabels['en_US']+'"'+
                                         ' data-ru-text="'+mailSendStateLabels['ru_RU']+'"> '+
                                            currentMailSendStateLabel+
                                         '</span>'+
                                         '<span id="error_reason" style="color: #dee41a;"> ' +
                                            errorText+
                                         '</span>'+
                                     '</div>'+
                                 '</div>');
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}