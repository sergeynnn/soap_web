$(document).ready(function() {
    var currentLanguage = $('input[name="current_language"]').val();
    switch(currentLanguage) {
        case 'en_US':
            $('#main_container').load('../about/en-about.html');
            break;
        case 'ru_RU':
            $('#main_container').load('../about/ru-about.html');
            break;
    }

    $('.pls-selected-locale').click(function() {
        switch($(this).data('lang-id')) {
            case 'en_US':
                $('#main_container').load('../about/en-about.html');
                break;
            case 'ru_RU':
                $('#main_container').load('../about/ru-about.html');
                break;
        }
    });
});