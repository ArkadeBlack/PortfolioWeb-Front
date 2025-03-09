document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('section');
    const themeToggle = document.getElementById('theme-toggle');

    function changeActiveLink() {
        let currentSection = sections[0];

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 50) {
                currentSection = section;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection.getAttribute('id')) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', changeActiveLink);
    window.addEventListener('load', changeActiveLink);

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });

            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Modo nocturno
    themeToggle.addEventListener('change', function () {
        document.body.classList.toggle('dark-mode', this.checked);
    });
});

/*Typing effect*/

var typed = new Typed(".typing", {
    strings: ["","Tester QA", "Editor", "Diseñador web"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});