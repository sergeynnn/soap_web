$(document).ready(function() {
    var currentLanguage = $('input[name="current_language"]').val();
    var languageData = {'en_US': 'en-text', 'ru_RU': 'ru-text'};
    $('#add_to_bookmarks').popup({
        position : 'bottom center',
        content  : $('#add_to_bookmarks').data(languageData[currentLanguage])
    });

    $('#close_bookmark_modal').click(function() {
        $('#bookmark_modal').modal('hide');
    })
});

function addFavorite(a) {
    var title = document.title;
    var url = document.location;
    try {
        // Internet Explorer
        window.external.AddFavorite(url, title);
    }
    catch (e) {
        try {
            // Mozilla
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            // Opera
            if (typeof(opera)=="object" || window.sidebar) {
                a.rel="sidebar";
                a.title=title;
                a.url=url;
                a.href=url;
                return true;
            }
            else {
                var currentLanguage = $('input[name="current_language"]').val();
                var languageData = {'en_US': 'en-text', 'ru_RU': 'ru-text'};
                $('#bookmark_modal>div.header>span').html($('#bookmark_modal>div.header').data(languageData[currentLanguage]));
                $('#bookmark_modal>div.content').html($('#bookmark_modal>div.content').data(languageData[currentLanguage]));
                $('#cancel_bookmark_modal').html($('#cancel_bookmark_modal').data(languageData[currentLanguage]));
                $('#bookmark_modal').modal('show');
            }
        }
    }
    return false;
}