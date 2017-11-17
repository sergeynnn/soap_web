$(document).ready(function() {
    $('.lang-item').css('visibility','hidden');
    var currentLanguage = $('input[name="current_language"]').val();
    changeLanguage(currentLanguage);
    $('.lang-item').css('visibility','initial');
    $('.pls-selected-locale').click(function() {
        $('.pls-selected-locale').removeClass('active-lang-label');
        $(this).addClass('active-lang-label');
        var currentLanguage = $(this).data('lang-id');
        $('input[name="current_language"]').val(currentLanguage);
        changeLanguage(currentLanguage);
        $.post('../server.php', {cmd: 'change_language', language: currentLanguage}, function(data) {
            console.log(data);
        });
        return false;
    })
});

var languageData = {'en_US': 'en-text', 'ru_RU': 'ru-text'};

function changeLanguage(language) {
    $('.lang-item').each(function() {
        $(this).html($(this).data(languageData[language]))
    });

    $('.menu-item').each(function() {
        $(this).text($(this).data(languageData[language]));
    });

    $('.language-placeholder').each(function() {
        $(this).attr('placeholder',$(this).data(languageData[language]));
    });

    $('.lang-popup').each(function() {
        $(this).popup({
            position : $(this).data('position'),
            content  :  $(this).data(languageData[language])
        });
    })
}
