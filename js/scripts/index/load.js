$(document).ready(function() {
    var refer = document.referrer;

    if(refer) {
        var currentDate = new Date();
        $.post('server.php', {cmd: 'send_refer', refer: refer, current_date: currentDate}, function(data) {
            console.log(data);
        })
    }
});
