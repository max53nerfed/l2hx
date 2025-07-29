const unHidder = function(e) {
    var elements = document.getElementsByClassName("hidden");
    var i;

    for (i = elements.length - 1; i >= 0; i--) {
        if (document.body.scrollTop + document.body.clientHeight > elements[i].getBoundingClientRect().top + (elements[i].getBoundingClientRect().height / 2)) {
            if (elements[i].classList.contains('hidden'))
            {
                var animationName = elements[i].style.animation;
                elements[i].style.animation = 'none';
                elements[i].offsetHeight;
                elements[i].style.animation = animationName;
                elements[i].classList.remove('hidden');
            }
        }
        else if (document.body.clientWidth <= 768)
        {
            if (elements[i].classList.contains('hidden'))
            {
                elements[i].classList.remove('hidden');
            }
        }
    }
}

const onMouseOver = function(e) {
    var element = e.target.parentElement;
    if (element != null && element.classList.contains('label'))
        element = e.target.parentElement.parentElement;
    var elements = document.getElementsByClassName("char");
    var i;

    if (element != null && element.classList.contains('char')) {
        for (i = elements.length - 1; i >= 0; i--) {
            elements[i].classList.add('disabled');
            elements[i].classList.remove('enabled');
            elements[i].classList.remove('none');
        }

        element.classList.remove('disabled');
        element.classList.add('enabled');
        element.classList.remove('none');
    }
    else
    {
        for (i = elements.length - 1; i >= 0; i--) {
            elements[i].classList.remove('disabled');
            elements[i].classList.remove('enabled');
            elements[i].classList.add('none');
        }
    }

    elements = document.getElementsByClassName("point");

    if (e.target != null && e.target.classList.contains('point')) {
        for (i = elements.length - 1; i >= 0; i--) {
            elements[i].classList.remove('focus');
        }

        e.target.classList.add('focus');
    }
    else
    {
        for (i = elements.length - 1; i >= 0; i--) {
            elements[i].classList.remove('focus');
        }
    }

    elements = document.querySelectorAll('#security .point');
    if (elements != null) {
        for (i = elements.length - 1; i >= 0; i--) {
            if (elements[i].classList.contains('focus')) {
                elements[i].style.zIndex = "10";
            }
            else 
            {
                var z = elements[i].style.zIndex;
                z = z - 1;
                if (z < 0)
                {
                    z = 0;
                }

                elements[i].style.zIndex = z;
            }
        }
    }
}

const onClick = function(e) {
    var element = e.target;
    var parentElement;
    if (element != null && element.parentElement != null)
    {
        parentElement = element.parentElement;
    }

    if (element != null && element.classList.contains('slider-nav')) {
        var slider = element.parentElement;
        var currentPage = slider.getAttribute('page');
        var sliderWraper = slider.querySelector('.slider-wrapper');
        var pagesCount = sliderWraper.children.length;

        if (element.classList.contains('next') && currentPage < pagesCount) {
            currentPage++;
            slider.setAttribute("page", currentPage);
        }
        else if (element.classList.contains('prev') && currentPage > 1) {
            currentPage--;
            slider.setAttribute("page", currentPage);
        }
        else
        {
            return;
        }

        var buttons = slider.querySelectorAll('ul li');
        for (i = buttons.length - 1; i >= 0; i--) {
            buttons[i].classList.remove('active');
        }

        buttons[currentPage - 1].classList.add('active');

        var pages = sliderWraper.children;
        for (i = pages.length - 1; i >= 0; i--) {
            pages[i].classList.remove('visible');
        }

        var animation = pages[currentPage - 1].querySelectorAll('.animated');
        for (i = animation.length - 1; i >= 0; i--) {
            var animationName = animation[i].style.animation;
            animation[i].style.animation = 'none';
            animation[i].offsetHeight;
            animation[i].style.animation = animationName;
        }

        pages[currentPage - 1].classList.add('visible');
    }
    else if (parentElement.parentElement != null && parentElement.parentElement.classList.contains('slider-pages')) {
        if (parentElement.classList.contains('active')) {
            return;
        }

        var slider = parentElement.parentElement.parentElement;
        var currentPage = parentElement.getAttribute('page');
        var sliderWraper = slider.querySelector('.slider-wrapper');
        var pagesCount = sliderWraper.children.length;

        slider.setAttribute("page", currentPage);

        var buttons = parentElement.parentElement.children;
        for (i = buttons.length - 1; i >= 0; i--) {
            buttons[i].classList.remove('active');
        }

        buttons[currentPage - 1].classList.add('active');

        var pages = sliderWraper.children;

        for (i = pages.length - 1; i >= 0; i--) {
            pages[i].classList.remove('visible');
        }

        var animation = pages[currentPage - 1].querySelectorAll('.animated');
        for (i = animation.length - 1; i >= 0; i--) {
            var animationName = animation[i].style.animation;
            animation[i].style.animation = 'none';
            animation[i].offsetHeight;
            animation[i].style.animation = animationName;
        }

        pages[currentPage - 1].classList.add('visible');
    }
    else if (element != null && element.classList.contains('vote-wrapper')) {
        element.classList.add('hide');
    }
    else if (element != null && element.classList.contains('voteunhide')) {
        var voteWraper = document.querySelector('.vote-wrapper');
        if (voteWraper != null) {
            voteWraper.classList.remove('hide');
        }
    }
}

const onMouseMove = function(e) {
    var posX = e.clientX;
    var posY = e.clientY;

    var perX = -(posX - document.body.clientWidth / 2) / document.body.clientWidth * 100;
    var perY = -(posY - document.body.clientHeight / 2) / document.body.clientHeight * 100;

    var layers = document.querySelectorAll('#security .layer');
    if (layers != null) {
        var bgCount = layers.length;
        for (i = layers.length - 1; i >= 0; i--) {
            var posX = (i + 1) * perX * layers[i].getAttribute('mov') / bgCount;
            var posY = (i + 1) * perY * layers[i].getAttribute('mov') / bgCount;
            posX = Math.min(50,posX);
            posY = Math.min(50,posY);
            posX = Math.max(-50,posX);
            posY = Math.max(-50,posY);
            layers[i].style.backgroundPosition = (50 - posX) + "% " + (50 - posY) + "%";
        }
    }
}

const onLoad = function(e) {
    unHidder;

    var layers = document.querySelectorAll('#security .rotator');
    if (layers != null) {
        for (i = layers.length - 1; i >= 0; i--) {
            var rnd = Math.floor(Math.random() * 360);
            if (layers[i].parentElement.parentElement.classList.contains('backpoints')) {
                layers[i].style.transform = "rotate(" + rnd + "deg) scale(0.9)";
            }
            else {
                layers[i].style.transform = "rotate(" + rnd + "deg)";
            }
        }
    }
}

window.addEventListener('scroll',unHidder);
window.onload = onLoad;
window.addEventListener('mouseover',onMouseOver, false);
window.addEventListener('mousemove',onMouseMove, false);
window.addEventListener('click',onClick, false);