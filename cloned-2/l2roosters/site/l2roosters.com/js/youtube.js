$(function() {
    $(".youtube").on("click", function(e) {
      $(".youtube-videos").toggleClass("active");
      $(".youtube").toggleClass("active");
      e.stopPropagation()
    });
    $(document).on("click", function(e) {
      if ($(e.target).is(".language") === false) {
        $(".youtube-videos").removeClass("active");
        $(".youtube").removeClass("active");
      }
    });
  });