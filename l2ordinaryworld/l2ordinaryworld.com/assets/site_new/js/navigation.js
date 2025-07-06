$(document).ready(function(){
	
	let scroll_distance = $(this).scrollTop();
	
	
	if(scroll_distance >= 100)
	{
		$(".header__bg-nav").addClass("hide");
		$(".header__bg-nav").css('top', '-100px');
		
		$(".navigation").addClass("fixed");
		$(".navigation").css('top', '-100px');
		
		setTimeout(function(){
			$(".navigation").animate({top: "0px"}, 500);
		}, 500);
		
	}
	else
	{
		$(".header__bg-nav").removeClass("hide");
		$(".header__bg-nav").css('top', '0px');
		$(".navigation").removeClass("fixed");
	}
	
	$(document).scroll(function() {
		let scroll_distance = $(this).scrollTop();
		
		if(scroll_distance >= 100)
		{
			$(".header__bg-nav").addClass("hide");
			$(".navigation").addClass("fixed");
		}
		else
		{
			$(".header__bg-nav").removeClass("hide");
			$(".header__bg-nav").css('top', '0px');
			$(".navigation").removeClass("fixed");
		}
	});
	

	$('.open-main-menu').click(function(event){
		if($('.navigation__links').is(':hidden')){
			$('.navigation__links').slideDown(300, function() { 
				$(this).css('display', 'block');
			});
			$(this).addClass('active');
		}
		else{
			$('.navigation__links').slideUp(300, function() { 
				$(this).css('display', 'none');
			});
			$(this).removeClass('active');
		}
	});
	
	$(document).mouseup(function (e){
		if (!$('.open-main-menu').is(e.target) && !$('.navigation__links').is(e.target) && $('.navigation__links').has(e.target).length === 0 && $(".open-main-menu").is(":visible")) {
			$(".open-main-menu").removeClass('active');
			$('.navigation__links' + ':visible').slideUp(300, function() { 
				$(this).css('display', 'none');
			});
		}
	});
	
	$(window).resize(function(){
		if(!$(".open-main-menu").is(":visible")){
			$(".navigation__links").removeAttr("style");
			$(".open-main-menu").removeClass('active');
		}
	});

	$('.drop-button').click(function(){
		
		event.preventDefault();

		$(this).parent().parent().find('.drop-box').not($(this).parent().children('.drop-box')).slideUp(300, function(){
			$(this).css('display', 'none');
		});
		$(this).parent().parent().find('.drop-button').not($(this).parent().children('.drop-button')).parent().removeClass('active');
		
		if(!$(this).parent().hasClass('active')){
			$(this).parent().children('.drop-box').slideDown(300, function() {
				$(this).css('display', 'block');
			});
			$(this).parent().addClass('active');
		}
		else{
			$(this).parent().children('.drop-box').slideUp(300, function() {
				$(this).css('display', 'none');
			});
			$(this).parent().removeClass('active');
		}
	});

	$(document).mouseup(function (e){
		if (!$('.drop-button').is(e.target) && $(".drop-button").has(e.target).length === 0 && $(".drop-box").has(e.target).length === 0){
			
			$(".drop-box").slideUp(300, function() { 
				$(this).css('display', 'none');
			});
			
			$(".drop-box").parent().removeClass("active");
		}
	});

});

