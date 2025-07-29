
$(window).scroll(function(){
    if ($(this).scrollTop() > 25) {
       $('.content-menu').addClass('fixed');
    } else {
       $('.content-menu').removeClass('fixed');
    }
});