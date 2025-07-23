$(document).ready(function () {

	// ---------------------------------------------------------------------------------- //
    // Main features
    // ---------------------------------------------------------------------------------- //

    var main_features = new Swiper(".main-features__slider-swiper", {
        slidesPerView: 5,
        spaceBetween: 15,
        navigation: {
            nextEl: ".swiper-button-next.main-features__slider-next",
            prevEl: ".swiper-button-prev.main-features__slider-prev",
        },
        breakpoints: {
            '@0.00': {
                slidesPerView: 1,
            },
            '@0.65': {
                slidesPerView: 2,
            },
            '@1.00': {
                slidesPerView: 3,
            },
            '@1.20': {
                slidesPerView: 4,
            },
            '@1.50': {
                slidesPerView: 5,
            },
        },
    });
	
	// ---------------------------------------------------------------------------------- //
    // Features
    // ---------------------------------------------------------------------------------- //

    var features_thumbs = new Swiper(".features__thumbs-swiper", {
        slidesPerView: 5,
        spaceBetween: 15,
        initialSlide: 2,
        centeredSlides: true,
        navigation: {
            nextEl: ".swiper-button-next.features__thumbs-next",
            prevEl: ".swiper-button-prev.features__thumbs-prev",
        },
        breakpoints: {
            '@0.00': {
                slidesPerView: 1,
            },
            '@0.80': {
                slidesPerView: 3,
            },
            '@1.20': {
                slidesPerView: 5,
            },
        }
    });

    var features_slider = new Swiper(".features__slider-swiper", {
        slidesPerView: 1,
        spaceBetween: 15,
        initialSlide: 2,
    });

    features_thumbs.on('slideChangeTransitionStart', (e) => {
        features_slider.slideTo(e.activeIndex, 500, false);
    });

    features_slider.on('slideChangeTransitionStart', (e) => {
        features_thumbs.slideTo(e.activeIndex, 500, false);
    });

    features_thumbs.on('click', (e) => {
        features_slider.slideTo(e.clickedIndex, 500, false);
        features_thumbs.slideTo(e.clickedIndex, 500, false);
    });
	
	// ---------------------------------------------------------------------------------- //
	// Stages
	// ---------------------------------------------------------------------------------- //

	var stages_thumbs = new Swiper(".stages__thumbs-swiper", {
		slidesPerView: 1,
		spaceBetween: 15,
		initialSlide: $('.stages__thumbs-swiper').attr('data-stage') - 1 ?? 0,
		centeredSlides: true,
	});

	var stages_slider = new Swiper(".stages__slider-swiper", {
		slidesPerView: 1,
		spaceBetween: 15,
		allowTouchMove: false,
		navigation: {
			nextEl: ".swiper-button-next.stages__slider-next",
			prevEl: ".swiper-button-prev.stages__slider-prev",
		},
	});

	stages_thumbs.on('slideChangeTransitionStart', (e) => {
		stages_slider.slideTo(e.activeIndex, 500, false);
	});

	stages_slider.on('slideChangeTransitionStart', (e) => {
		stages_thumbs.slideTo(e.activeIndex, 500, false);
	});

	stages_thumbs.on('click', (e) => {
		stages_thumbs.slideTo(e.clickedIndex, 500, false);
		stages_slider.slideTo(e.clickedIndex, 500, false);
	});

	// SWIPER MAIN-NEWS

	var swiperOptions2 = {
		loop: true,
		freeMode: true,
		//spaceBetween: 40,
		grabCursor: true,
		loop: true,
		autoplay: {
			delay: 0,
			disableOnInteraction: false
		},
		freeMode: true,
		speed: 5000,
		freeModeMomentum: false,

		breakpoints: {
			10: {
				slidesPerView: 1,
			},

			480: {
				slidesPerView: 2,
			},

			1024: {
				slidesPerView: 3,
			},

			1240: {
				slidesPerView: 4,
			},

			1920: {
				slidesPerView: 5,
			},
		},
	};

	var news_slider = new Swiper(".main-news__slider", swiperOptions2);


	// SWIPER PARTNERS

	var swiperOptions = {
		loop: true,
		freeMode: true,
		//spaceBetween: 40,
		grabCursor: true,
		loop: true,
		autoplay: {
			delay: 0,
			disableOnInteraction: false
		},
		freeMode: true,
		speed: 5000,
		freeModeMomentum: false,

		breakpoints: {
			10: {
				slidesPerView: 1,
			},

			480: {
				slidesPerView: 2,
			},

			1024: {
				slidesPerView: 3,
			},

			1240: {
				slidesPerView: 4,
			},

			1920: {
				slidesPerView: 5,
			},
		},
	};

	var partners_slider = new Swiper(".partners__slider", swiperOptions);


	// VIDEO POPUP
	$('.promo__player').click(function (event) {
		event.preventDefault();
		let video_player = '<iframe width="100%" height="100%" src="' + $(this).attr('data-video-id') + '?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		$(".video-wnd__box").append(video_player);
		$('.video-wnd').addClass("active");
	});
	$('.video-wnd__cancel').click(function (event) {
		if ($('.video-wnd').hasClass('active')) {
			$('.video-wnd').removeClass("active");
			setTimeout(function () {
				$(".video-wnd__box").html("");
			}, 300);
		}
	});
	$('.btn_up').click(function (event) {
		event.preventDefault();
		$('body, html').animate({ scrollTop: 0 }, 600);
	});

	// Inner features toggle class

	$('.inner-features').MVisionToggleClass({
		classButton: 'swiper-slide',
		toggleClassButton: 'active',
		dataButtonAttr: 'data-open-tab',
		classBox: 'inner-features__content-box',
		toggleClassBox: 'active',
		dataBoxAttr: 'data-name-tab',
		defaultElement: true,
		defaultIndexElement: 0,
		ancoreLinks: true,
	});

	// SWIPER INNER FEATURES

	var inner_features_thumbs = new Swiper(".inner-features__thumbs", {
		spaceBetween: 30,
		slidesPerView: 1,
		allowTouchMove: false,
		watchSlidesVisibility: true,
		passiveListeners: false,

		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},

		breakpoints: {
			680: {
				slidesPerView: 2,
			},

			1024: {
				slidesPerView: 3,
			},

			1240: {
				slidesPerView: 4,
			},
		},
	});

});