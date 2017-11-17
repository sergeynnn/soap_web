var showError = function(message) {
    var currentLanguage = $('input[name="current_language"]').val();
    var errorLabels = {'en_US':'Pay attention on this error!','ru_RU':'Внимание, ошибка!'};
    var currentLanguageErrorLabel = errorLabels[currentLanguage];
    var errorHTML = '<a class="item">'+
        '<div data-en-text="'+errorLabels['en_US']+'" ' +
        '					  data-ru-text="'+errorLabels['ru_RU']+'" class="ui pointing below red  label lang-item">'+currentLanguageErrorLabel+'</div><br>'+
        message+
        '</a>';
    $('#message_place').html(errorHTML)
}
