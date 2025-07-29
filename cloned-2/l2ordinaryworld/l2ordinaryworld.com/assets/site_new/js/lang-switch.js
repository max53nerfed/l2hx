$(document).ready(function(){

	$('.navigation__langs-current').click(function(event){
		if($(this).parent().hasClass('active')){
			$(this).parent().removeClass('active');
		}
		else{
			$(this).parent().addClass('active');
		}
	});
	
	$(document).mouseup(function (e){
		if (!$('.navigation__langs').is(e.target) && $('.navigation__langs').has(e.target).length === 0){
			$(".navigation__langs").removeClass('active');
		}
	});

});


