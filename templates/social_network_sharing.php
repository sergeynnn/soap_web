<style>
    #social_shared_btns {
        display: flex;
        justify-content: center;
       // position: absolute;
       // bottom: 5%;
       // width: 100%;
    }

    .fb_share_btn {
        background-color: #4267b2;
        border-color: #4267b2;
        text-decoration: none;
        border: 1px solid #4267b2;
        border-radius: 4px;
        box-sizing: content-box;
        font-size: 12px;
        -moz-osx-font-smoothing: grayscale;
        font-weight: bold;
        justify-content: center;
        padding: 0 8px;
        position: relative;
        text-align: center;
        text-shadow: none;
        vertical-align: middle;
        color: #fff;
        line-height: 22px;
        font-weight: bold;
    }

    .fb_share_btn:hover {
        background: #365899;
        border: 1px solid #365899;
        color: white;
    }

    #fb_share_count {
        margin-left: 0.5em;
        background-color: white;
        padding: 0.25px 4px 0.25px 4px;
        border-radius: 2px;
        color: #4267b2;
    }
</style>
<div id="social_shared_btns" style="text-align: center; ">
    <div style="display: inline-block; vertical-align: bottom; ">
        <a class="fb_share_btn" href="https://www.facebook.com/sharer/sharer.php?u=http://www.soap-web.com" target="_blank">
            <i class="facebook f icon"></i> Share <span id="fb_share_count"></span>
        </a>
    </div>
    <script>
        $(document).ready(function() {
            fb_count_update();
            $('#fb_share_btn').click(function() {

                fb_count_update();
            })
        })



        var fb_count_update = function() {
            if(location.pathname == '/') {
                var prefix = '';
            } else {
                var prefix = '../';
            }
            $.get(prefix+'php/facebook/count.php', {bd: 1}, function(data) {
                console.log(data)
                var response = JSON.parse(data);
				if(response.status == 'success') {
					$('#fb_share_count').html(response.count);					
				}

            })
        }
    </script>



    <div id="vk_btn" style="display: inline-block; vertical-align: bottom; margin-left: 1%">
        <script type="text/javascript">
            document.write(VK.Share.button({url: 'http://soap-web.com',
                title: 'Легкий, удобный и гибкий SOAP веб-клиент',
                image: 'http://soap-web.com/img/share/icon_soap_share.jpg',

            }, {type: "round",
                text: "Поделиться",
            }));
            $('#vk_btn').find('a').each(function() {
                $(this).css('box-sizing','initial')
            })
        </script>
    </div>





</div>

