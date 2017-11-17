<?php session_start(); ?>
<?php include_once $_SERVER['DOCUMENT_ROOT'].'/php/libraries/MenuItem.php'; ?>
<style>
    #add_to_bookmarks {
        margin-top: 0.4em;
        font-size: x-large;
        cursor: pointer;
    }
</style>

<?php
    $menuItems = array(new MenuItem("/","Online SOAP","Веб-клиент SOAP"), new MenuItem("/tutorial/", "Tutorial", "Демонстрация"), new MenuItem("/about/","About project","О проекте"),
                       new MenuItem("/faq/", "F.A.Q.", "Вопрос/ответ"), new MenuItem("/feedback/", "Feedback", "Обратная связь"));
?>
<div id="main-menu" class="ui violet six item inverted menu" style="visibility: hidden; margin-top: 0px !important;">
     <?php
     foreach ($menuItems as $menuItem) {
         $menuItem->printHTML();
     }
     ?>
    <script>
        $('.menu-item').each(function() {
            var ruMenuItem = $(this).clone(false);
            ruMenuItem.html($(this).data('ru-text'));
            $('#main-menu').append(ruMenuItem);
            if(parseFloat(ruMenuItem.css('width').toString().replace('px','')) > parseFloat($(this).css('width').toString().replace('px',''))) {
                $(this).css('width',ruMenuItem.css('width'));
            }
            ruMenuItem.remove();
        });
        $('#main-menu').css('visibility','initial')
    </script>
    <?php if($_SERVER["REQUEST_URI"] == "/") {
        echo '<a onclick="return addFavorite(this);"> <i id="add_to_bookmarks" data-position="bottom center"  data-en-text="Add site to bookmarks" data-ru-text="Добавить сайт в закладки"  class="lang-popup empty star icon"></i></a>';
    } ?>
    <div>
        <?php  $currentLanguage = 'en_US'; ?>
        <div id="language-panel">
            <div class="radio-group">
                <input type="radio" class="lang-input" id="en_lang" name="language" value="en_US">
                <label class="lang-label" for="en_lang">
                    <?php if($_SERVER["REQUEST_URI"] != "/") {
                        $img_path_prefix = '../';
                    } else {
                        $img_path_prefix = '';
                    }?>
                    <a title="English (US)" data-lang-id="en_US" class="pls-selected-locale lang-label
                        <?php if(!isset($_SESSION['current_language']) or $_SESSION['current_language'] == '' or $_SESSION['current_language'] == 'en_US') {
                                $currentLanguage = 'en_US';
                                echo 'active-lang-label ';
                               }  ?>
                    ">
                        <img src="<?php echo $img_path_prefix; ?>img/languages/en.png" alt="United States"> English (US)
                    </a>
                </label>
            </div>
            <div class="radio-group">
                <input type="radio" class="lang-input" id="ru_lang" name="language"  value="ru_RU">
                <label class="lang-label" for="ru_lang">
                    <a title="Русский (RU)" data-lang-id="ru_RU" class="pls-selected-locale lang-label
                        <?php if($_SESSION['current_language'] == 'ru_RU') {
                                     $currentLanguage = 'ru_RU';
                                echo 'active-lang-label ';
                              } ?>
                    ">
                        <img src="<?php echo $img_path_prefix; ?>img/languages/ru.png" alt="United States"> Русский (RU)
                    </a>
                </label>
            </div>
        </div>
        <input type="hidden" name="current_language" value="<?php echo $currentLanguage; ?>"/>
    </div>
</div>

<style>
    #bookmark_modal .header {
        color: #535399;
        text-align: center;
    }

    #bookmark_modal .content {
        color: #5050b2;
        text-align: center;
        font-size: medium;
    }

    #close_bookmark_modal {
        float: right;
        cursor: pointer;
        color: #2185d0;
    }

    #close_bookmark_modal:hover {
        color: #85bfeb;
    }
</style>

<div id="bookmark_modal" class="ui small modal">
    <div class="header" data-ru-text="Добавление в закладки"
         data-en-text="Adding to bookmarks"><span>Adding to bookmarks</span><i id="close_bookmark_modal" class="close icon"></i></div>
    <div class="content" data-ru-text="Нажмите <strong>Ctrl+D</strong> чтобы добавить страницу в закладки"
                         data-en-text="Press <strong>Ctrl+D</strong> to add site in bookmarks" >
        Press <strong>Ctrl+D</strong> to add site in bookmarks
    </div>
    <div class="actions">
        <div id="cancel_bookmark_modal" class="ui cancel button primary" data-en-text="Cancel" data-ru-text="Закрыть">Cancel</div>
    </div>
</div>