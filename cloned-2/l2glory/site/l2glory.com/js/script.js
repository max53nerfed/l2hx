AOS.init({
    duration: 1000, 
    easing: 'ease', 
    once: false 
});

function updateCountdown() {
    const targetDate = new Date('July 19, 2025 23:00:00 GMT+0300').getTime();
    
    function update() {
        try {
            const now = new Date().getTime();
            const difference = targetDate - now;
            
            if (difference < 0) {
                ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
                    document.getElementById(id).textContent = '00';
                });
                return;
            }
            
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } catch (error) {
            console.error('Error updating countdown:', error);
        }
    }
    
    update();
    return setInterval(update, 1000);
}

function handleSectionVisibility() {
    const sections = document.querySelectorAll('section');
    const homeSection = document.querySelector('#home');
    const rect = homeSection.getBoundingClientRect();
    const isHomeVisible = rect.top >= -window.innerHeight/2 && rect.top <= window.innerHeight/2;
    
    document.body.classList.toggle('section-home-active', isHomeVisible);
}

function initSmoothScroll() {
    let isScrolling = false;
    let lastScrollTime = 0;
    const scrollCooldown = 600;
    const sections = document.querySelectorAll('section');
    let lastKnownScrollPosition = window.pageYOffset;

    window.addEventListener('scroll', () => {
        lastKnownScrollPosition = window.pageYOffset;
    });

    window.addEventListener('wheel', (e) => {
        let target = e.target;
        
        const scrollableElement = target.closest('.features-content, .features-sidebar');
        if (scrollableElement) {
            const isAtTop = scrollableElement.scrollTop === 0;
            const isAtBottom = Math.abs(scrollableElement.scrollHeight - scrollableElement.scrollTop - scrollableElement.clientHeight) < 1;
    
            if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
    
            e.stopPropagation();
            return;
        }

        e.preventDefault();
        
        const currentTime = Date.now();
        if (isScrolling || currentTime - lastScrollTime < scrollCooldown) return;

        // Find nearest section based on current scroll position
        const viewportMiddle = window.innerHeight / 2;
        let currentSection = null;
        let minDistance = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top + rect.height / 2 - viewportMiddle);
            if (distance < minDistance) {
                minDistance = distance;
                currentSection = section;
            }
        });
        
        if (currentSection) {
            const direction = e.deltaY > 0 ? 1 : -1;
            const currentIndex = [...sections].indexOf(currentSection);
            const targetIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
            const targetSection = sections[targetIndex];
            
            if (targetSection) {
                isScrolling = true;
                lastScrollTime = currentTime;
                
                targetSection.scrollIntoView({ behavior: 'smooth' });
                handleSectionVisibility();
                
                setTimeout(() => {
                    isScrolling = false;
                }, scrollCooldown);
            }
        }
    }, { passive: false });
}

function initPopups() {
    const iconButtons = document.querySelectorAll('.icon-btn, .pickup-btn');
    const closePopupButtons = document.querySelectorAll('.close-popup-btn');
    
    function closeAllPopups() {
        const popups = document.querySelectorAll('.popup-menu');
        const backdrop = document.querySelector('.popup-backdrop');
        popups.forEach(popup => popup.classList.remove('active'));
        backdrop?.classList.remove('active');
    }
    
    iconButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPopup = document.getElementById(button.getAttribute('data-target'));
            const backdrop = document.querySelector('.popup-backdrop');
            
            if (targetPopup) {
                closeAllPopups();
                targetPopup.classList.add('active');
                backdrop?.classList.add('active');
            }
        });
    });
    
    closePopupButtons.forEach(button => {
        button.addEventListener('click', closeAllPopups);
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeAllPopups();
    });
    
    document.addEventListener('click', (event) => {
        const activePopup = document.querySelector('.popup-menu.active');
        if (activePopup && !activePopup.contains(event.target) && !event.target.closest('.icon-btn, .pickup-btn')) {
            closeAllPopups();
        }
    });
}

function initFeaturePanels() {
    const featureRadios = document.querySelectorAll('.feature-radio input');
    const featurePanels = document.querySelectorAll('.feature-panel');
    
    featureRadios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            featurePanels.forEach(panel => panel.classList.remove('active'));
            const targetPanel = document.getElementById(`panel${index + 1}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                const featuresContent = document.querySelector('.features-content');
                if (featuresContent) {
                    featuresContent.scrollTop = 0;
                }
            }
        });
    });
    
    if (!document.querySelector('.feature-panel.active') && featurePanels.length > 0) {
        featurePanels[0].classList.add('active');
        if (featureRadios[0]) featureRadios[0].checked = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth;
            scroll-snap-type: y mandatory;
            overflow-y: scroll;
        }
        section {
            scroll-snap-align: start;
            scroll-snap-stop: always;
        }
    `;
    document.head.appendChild(style);
    
    updateCountdown();
    handleSectionVisibility();
    initSmoothScroll();
    initPopups();
    initFeaturePanels();
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
        scrollTimeout = window.requestAnimationFrame(handleSectionVisibility);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-middle a');

    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').replace('#', '') === current) {
                link.classList.add('active');
            }
        });


        if (window.location.pathname.endsWith('/stats')) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === 'stats') {
                    link.classList.add('active');
                }
            });
        }
    }


    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');

            if (targetId === 'stats') {
                window.location.href = 'stats';
                return;
            }

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('load', setActiveLink);
});

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active');
}


document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        
       
        if (href.startsWith('#')) {

            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
        
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
 
                const mobileMenu = document.querySelector('.mobile-menu');
                mobileMenu.classList.remove('active');
                
         
                history.pushState('', document.title, window.location.pathname);
            }
        } else {

            window.location.href = href;
        }
    });
});


document.addEventListener('DOMContentLoaded', function() { 
    const container = document.querySelector('.downloads-container'); 
    const section = document.querySelector('.downloads-section');
    const prevArrow = document.querySelector('.download-nav-arrow.prev'); 
    const nextArrow = document.querySelector('.download-nav-arrow.next'); 
    
    function updateArrows() { 
        if (!container || !prevArrow || !nextArrow || !section) return;
        

        const maxScroll = container.scrollWidth - container.clientWidth;
        const isScrollable = maxScroll > 1;
        const isMobile = window.innerWidth < 769;
        

        prevArrow.classList.remove('active');
        nextArrow.classList.remove('active');

        if (isMobile && isScrollable) {
  
            if (container.scrollLeft > 10) {
                prevArrow.classList.add('active');
            }
            
      
            if (container.scrollLeft < maxScroll - 10) {
                nextArrow.classList.add('active');
            }
        }
    }


    const scrollAmount = 480; 

    prevArrow?.addEventListener('click', () => { 
        container.scrollBy({ 
            left: -scrollAmount, 
            behavior: 'smooth' 
        }); 
    }); 

    nextArrow?.addEventListener('click', () => { 
        container.scrollBy({ 
            left: scrollAmount, 
            behavior: 'smooth' 
        }); 
    }); 


    container?.addEventListener('scroll', () => {
        requestAnimationFrame(updateArrows);
    });
    window.addEventListener('resize', () => {
        requestAnimationFrame(updateArrows);
    });
    

    setTimeout(() => {
        updateArrows();
    }, 100);
});

function googleTranslateElementInit() {

  if (!document.getElementById('google_translate_element')) {
    const div = document.createElement('div');
    div.id = 'google_translate_element';
    document.body.appendChild(div);
  }


  setTimeout(() => {
    if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) {
      console.log('Google Translate API not yet loaded, retrying...');
      googleTranslateElementInit();
      return;
    }

    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,es,ru,pt',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: true,
      multilanguagePage: true
    }, 'google_translate_element');


    const preventTranslateHiding = () => {
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
              const style = translateElement.style.display;
              if (style === 'none') {
                translateElement.style.display = 'block';
              }
            }
          });
        });

        observer.observe(translateElement, {
          attributes: true,
          childList: true,
          subtree: true
        });
      }
    };


    const storeLanguage = () => {
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.addEventListener('change', (e) => {
          localStorage.setItem('preferred_language', e.target.value);
        });
      }
    };


    const restoreLanguage = () => {
      const storedLang = localStorage.getItem('preferred_language');
      if (storedLang) {
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
          combo.value = storedLang;
          combo.dispatchEvent(new Event('change'));
        }
      }
    };


    preventTranslateHiding();
    storeLanguage();
    restoreLanguage();
  }, 1000);
}


document.addEventListener('DOMContentLoaded', googleTranslateElementInit);