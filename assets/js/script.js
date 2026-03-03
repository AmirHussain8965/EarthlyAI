window.addEventListener("scroll", function () {
    const header = document.querySelector(".header_section");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".header_section .navbar ul li a");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove("active"));
                    const activeLink = document.querySelector(
                        `.header_section .navbar ul li a[href="#${entry.target.id}"]`
                    );
                    if (activeLink) activeLink.classList.add("active");
                }
            });
        },
        {
            root: null,
            rootMargin: "-100px 0px -50% 0px", // offset for sticky header
            threshold: 0
        }
    );

    sections.forEach(section => observer.observe(section));
});

