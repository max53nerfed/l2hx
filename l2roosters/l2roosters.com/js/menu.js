const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  let scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = (current.getBoundingClientRect().top + window.pageYOffset) - 350;
    const sectionId = current.getAttribute("id");

    // Verifica si existe el enlace antes de agregar o remover clases
    const menuLink = document.querySelector(".content-menu a[href*=" + sectionId + "]");

    if (menuLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        menuLink.classList.add("active");
      } else {
        menuLink.classList.remove("active");
      }
    }
  });
}