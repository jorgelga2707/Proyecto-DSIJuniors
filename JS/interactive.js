const header = document.querySelector(".header");
window.addEventListener("scroll",function(){
    header.classList.toggle("active",window.scrollY>0)
});

const carouselInner = document.querySelector('.carousel-inner');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentIndex = 0;

function showSlide(index) {
    const totalSlides = document.querySelectorAll('.carousel-item').length;
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevButton.addEventListener('click', () => {
    showSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
    showSlide(currentIndex + 1);
});

showSlide(currentIndex);