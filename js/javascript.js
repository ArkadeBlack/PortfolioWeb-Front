document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('section');
    const themeToggle = document.getElementById('theme-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const translatableElements = document.querySelectorAll('[data-key]');

    let currentLanguage = localStorage.getItem('language') || 'es';
    let typed;

    function setLanguage(lang) {
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        localStorage.setItem('language', lang);
        currentLanguage = lang;
        updateTypedStrings();
    }

    function updateTypedStrings() {
        if (typed) {
            typed.destroy();
        }
        const strings = currentLanguage === 'es' 
            ? ["Full stack developer jr","Tester QA", "Editor", "Diseñador web"]
            : ["Junior Full Stack Developer", "QA Tester", "Editor", "Web Designer"];
        
        document.querySelector(".typing").innerHTML = '';

        typed = new Typed(".typing", {
            strings: strings,
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

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

    // Language switcher
    languageToggle.addEventListener('change', function () {
        setLanguage(this.checked ? 'en' : 'es');
    });

    // Set initial language
    languageToggle.checked = currentLanguage === 'en';
    setLanguage(currentLanguage);
});
