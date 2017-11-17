function change_captcha()
{
    document.getElementById('captcha').src="../captcha/get_captcha.php?rnd=" + Math.random();
}