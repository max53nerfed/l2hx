var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].innerHTML += '<svg class="icon" width="15" height="15" viewBox="0 0 13 8"><path d="M11.762 7.5l.738-.862L6.5.5l-6 6.138.829.862L6.5 2.005z" fill-rule="evenodd"></path></svg>';
}

for (i = 0; i < toggler.length; i++) {
  toggler[i].parentElement.querySelector(".icon").addEventListener("click", function() {
    $(".caret-down").removeClass("caret-down");
    $(".active").removeClass("active");
    this.parentElement.parentElement.querySelector(".nested").classList.toggle("active");
    this.parentElement.classList.toggle("caret-down");
  });
}

const clearActive = function () {
  var elems = document.getElementById("menu").querySelectorAll(".topic");
    [].forEach.call(elems, function(el) {
      el.classList.remove("active");
    });
    elems = document.getElementById("menu").querySelectorAll(".subtopic");
    [].forEach.call(elems, function(el) {
      el.classList.remove("active");
    });

    this.classList.toggle("active");
}

toggler = document.getElementById("menu").querySelectorAll(".topic");
for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", clearActive);
}

toggler = document.getElementById("menu").querySelectorAll(".subtopic");
for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", clearActive);
}