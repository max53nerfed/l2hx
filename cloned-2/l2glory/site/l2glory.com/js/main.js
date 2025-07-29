document.addEventListener('DOMContentLoaded', function() {
    const section = sessionStorage.getItem('scrollToSection');
    if (section) {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            sessionStorage.removeItem('scrollToSection');
        }
    }
});