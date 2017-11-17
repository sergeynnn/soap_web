    <div id="qoo-counter" style="display: none">
        <a href="http://qooi.ru/" title="Бесплатный счетчик посещений на сайт">
        <img src="http://qooi.ru/counter/standard/002.png" alt="Счетчик посещаемости и статистика сайта">
        <div id="qoo-counter-visits"></div>
        <div id="qoo-counter-views"></div>
        </a>
    </div>
<script src="../js/detect/detect.js"></script>
<script>
	$(document).ready(function() {
        var user = detect.parse(navigator.userAgent);
        switch(user.browser.family) {
            case 'Firefox':  case 'Edge':
                $('body').keypress(function(e) {
                    var targetCode;
                    switch(user.browser.family) {
                        case 'Firefox':
                            targetCode = 13;
                            break;
                        case 'Edge':
                            targetCode = 10;
                            break;
                    }
                    if(e.which == targetCode && e.ctrlKey && e.shiftKey) {
                        switch($('#qoo-counter').css('display')) {
                            case 'none':
                                $('#qoo-counter').css('display','block');
                                break;
                            case 'block':
                                $('#qoo-counter').css('display','none');
                                break;
                        }
                    }
                });
                break;

            case 'Chrome':
                $('body').keydown(function(e) {
                    if(e.which == 13 && e.ctrlKey && e.shiftKey) {
                        switch($('#qoo-counter').css('display')) {
                            case 'none':
                                $('#qoo-counter').css('display','block');
                                break;
                            case 'block':
                                $('#qoo-counter').css('display','none');
                                break;
                        }
                    }
                });
        }


	});
</script>
<script type="text/javascript" src="http://qoo.by/counter.js"></script>
<!-- Yandex.Metrika counter --> <script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter44685826 = new Ya.Metrika({ id:44685826, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks"); </script> <noscript><div><img src="https://mc.yandex.ru/watch/44685826" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter -->


