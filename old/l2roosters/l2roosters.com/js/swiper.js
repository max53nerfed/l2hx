var featuresThumbs = new Swiper('.features-controls', {
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,

  
  breakpoints: {
    300: {
      slidesPerView: 1,
      spaceBetween: 15,
    },


    769: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

var features = new Swiper('.features-swiper', {
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: featuresThumbs
  }
});