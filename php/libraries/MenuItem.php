<?php
class MenuItem
{
    var $url;
    var $ruText;
    var $enText;

    public function getUrl()
    {
        return $this->url;
    }

    public function setUrl($url)
    {
        $this->url = $url;
    }

    public function getRuText()
    {
        return $this->ruText;
    }

    public function setRuText($ruText)
    {
        $this->ruText = $ruText;
    }

    public function getEnText()
    {
        return $this->enText;
    }

    public function setEnText($enText)
    {
        $this->enText = $enText;
    }

    public function printHTML() {
        echo '<a class="item lang-tem menu-item ';
        if($_SERVER["REQUEST_URI"] == $this->url) {
            echo ' active ';
        }
        echo '" ';
        echo ' href="'.$this->url.'" ';
        echo ' data-en-text="'.$this->enText.'" ';
        echo ' data-ru-text="'.$this->ruText.'" >';
        if(isset($_SESSION['current_language'])) {
            switch($_SESSION['current_language']) {
                case 'en_US':
                    echo $this->enText;
                    break;
                case 'ru_RU':
                    echo $this->ruText;
                    break;
                case '':
                    echo $this->enText;
                    break;
            }
        } else {
            echo $this->enText;
        }
        echo '</a>';
    }

    public function __construct($url, $enText, $ruText)
    {
        $this->url = $url;
        $this->ruText = $ruText;
        $this->enText = $enText;
    }

}