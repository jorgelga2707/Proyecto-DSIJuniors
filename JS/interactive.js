document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");
    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("active", window.scrollY > 0);
        });
    }

    const headerBlog = document.querySelector(".header-blog");
    if (headerBlog) {
        window.addEventListener("scroll", () => {
            headerBlog.classList.toggle("active", window.scrollY > 0);
        });
    }

    const headerRegister = document.querySelector(".header-register");
    if (headerRegister) {
        window.addEventListener("scroll", () => {
            headerRegister.classList.toggle("active", window.scrollY > 0);
        });
    }

    const carouselInner = document.querySelector(".carousel-inner");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    if (carouselInner && prevButton && nextButton) {
        let currentIndex = 0;

        function showSlide(index) {
            const slides = document.querySelectorAll(".carousel-item");
            const totalSlides = slides.length;

            if (index >= totalSlides) currentIndex = 0;
            else if (index < 0) currentIndex = totalSlides - 1;
            else currentIndex = index;

            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        prevButton.addEventListener("click", () => {
            showSlide(currentIndex - 1);
        });

        nextButton.addEventListener("click", () => {
            showSlide(currentIndex + 1);
        });

        showSlide(currentIndex);
    }

    const devRadio = document.getElementById("tipo_dev");
    const empRadio = document.getElementById("tipo_emp");

    const devForm = document.querySelector(".register-dev");
    const empForm = document.querySelector(".register-company");

    if (!devRadio || !empRadio) return;

    devForm.style.display = "block";
    empForm.style.display = "none";

    devRadio.addEventListener("change", () => {
        devForm.style.display = "block";
        empForm.style.display = "none";
    });

    empRadio.addEventListener("change", () => {
        empForm.style.display = "block";
        devForm.style.display = "none";
    });

});
