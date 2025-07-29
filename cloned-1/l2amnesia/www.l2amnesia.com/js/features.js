const unHidder = function(e) {
  var buttonH1 = document.getElementById("h1");
  var buttonH2 = document.getElementById("h2");

  var elements = document.getElementsByClassName("h1");
  for (i = elements.length - 1; i >= 0; i--) {
    if (elements[i].parentElement != null && elements[i].parentElement.tagName == 'LI')
    {
      if (buttonH1.classList.contains("active"))
      {
        elements[i].parentElement.classList.remove("nodisplay");
      }
      else
      {
        elements[i].parentElement.classList.add("nodisplay");
      }
    }
    else if (elements[i].parentElement != null && elements[i].parentElement.parentElement != null && elements[i].parentElement.parentElement.tagName == 'LI')
    {
      if (buttonH1.classList.contains("active"))
      {
        elements[i].parentElement.parentElement.classList.remove("nodisplay");
      }
      else
      {
        elements[i].parentElement.parentElement.classList.add("nodisplay");
      }
    }
    else
    {
      if (buttonH1.classList.contains("active"))
      {
        elements[i].classList.remove("nodisplay");
      }
      else
      {
        elements[i].classList.add("nodisplay");
      }
    }
  }

  var elements = document.getElementsByClassName("h2");
  for (i = elements.length - 1; i >= 0; i--) {
    if (elements[i].parentElement != null && elements[i].parentElement.tagName == 'LI')
    {
      if (buttonH2.classList.contains("active"))
      {
        elements[i].parentElement.classList.remove("nodisplay");
      }
      else
      {
        elements[i].parentElement.classList.add("nodisplay");
      }
    }
    else if (elements[i].parentElement != null && elements[i].parentElement.parentElement != null && elements[i].parentElement.parentElement.tagName == 'LI')
    {
      if (buttonH2.classList.contains("active"))
      {
        elements[i].parentElement.parentElement.classList.remove("nodisplay");
      }
      else
      {
        elements[i].parentElement.parentElement.classList.add("nodisplay");
      }
    }
    else
    {
      if (buttonH2.classList.contains("active"))
      {
        elements[i].classList.remove("nodisplay");
      }
      else
      {
        elements[i].classList.add("nodisplay");
      }
    }
  }
}

var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].innerHTML += '<svg class="icon" width="15" height="15" viewBox="0 0 13 8"><path d="M11.762 7.5l.738-.862L6.5.5l-6 6.138.829.862L6.5 2.005z" fill-rule="evenodd"></path></svg>';
}

for (i = 0; i < toggler.length; i++) {
  toggler[i].parentElement.querySelector(".icon").addEventListener("click", function() {
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

var url = window.location.href;
if (url.indexOf("#") > -1)
{
  var topic = url.split("#")[1];
  var isH1 = topic.indexOf("_h1") > -1;
  var isH2 = topic.indexOf("_h2") > -1;
  var topic = topic.replace("_h1","").replace("_h2","");
  var topics = document.querySelectorAll("a[href='#" + topic + "']");

  if (topics != null && (topics[0].classList.contains("h2") || isH2))
  {
    var button = document.getElementById("h2");
    button.classList.add("active");
  
    if (topics[0].classList.contains("subtopic"))
    {
      topics[0].classList.toggle("active");
      topics[0].parentElement.parentElement.classList.toggle("active");
      topics[0].parentElement.parentElement.parentElement.querySelector(".caret").classList.toggle("caret-down");
    }
    else if (topics[0].classList.contains("topic"))
    {
      topics[0].classList.toggle("active");
    }
  }
  else if (topics != null && (topics[0].classList.contains("h1") || isH1))
  {
    var button = document.getElementById("h1");
    button.classList.add("active");

    if (topics[0].classList.contains("subtopic"))
    {
      topics[0].classList.toggle("active");
      topics[0].parentElement.parentElement.classList.toggle("active");
      topics[0].parentElement.parentElement.parentElement.querySelector(".caret").classList.toggle("caret-down");
    }
    else if (topics[0].classList.contains("topic"))
    {
      topics[0].classList.toggle("active");
    }
  }
  else
  {
    var buttons = document.getElementsByClassName("part");
    for (i = buttons.length - 1; i >= 0; i--) {
      buttons[i].classList.add("active");
    }
  
    if (topics != null && topics[0].classList.contains("subtopic"))
    {
      topics[0].classList.toggle("active");
      topics[0].parentElement.parentElement.classList.toggle("active");
      topics[0].parentElement.parentElement.parentElement.querySelector(".caret").classList.toggle("caret-down");
    }
    else if (topics != null && topics[0].classList.contains("topic"))
    {
      topics[0].classList.toggle("active");
    }
  }
}
else
{
  var buttons = document.getElementsByClassName("part");
  for (i = buttons.length - 1; i >= 0; i--) {
    buttons[i].classList.add("active");
  }
  
  document.getElementById("first").classList.add("active");
}

unHidder(null);

const onClick = function(e) {
  var element = e.target;
  var parentElement;
  if (element != null && element.parentElement != null)
  {
      parentElement = element.parentElement;
  }

  if (element != null && element.classList.contains("part")) {
      if (element.classList.contains("active"))
      {
        var buttons = document.getElementsByClassName("part");
        for (i = buttons.length - 1; i >= 0; i--) {
            buttons[i].classList.add("active");
        }
  
        element.classList.remove("active");
      }
      else
      {
        element.classList.add("active");
      }

      unHidder(e);
  }
}

window.addEventListener("click",onClick, false);