let currentSlide = 0;
let slideCount = 0;
let carouselInterval;

export function initCarousel() {
  const carouselTrack = document.getElementById('carouselTrack');

  // Add slides
  const slides = [
    {
      bg: 'from-blue-500 to-blue-600',
      title: 'Специальное предложение!',
      text: 'Скидки до 30% на все товары',
      link: 'https://example.com/ad1'
    },
    {
      bg: 'from-green-500 to-green-600',
      title: 'Новая коллекция!',
      text: 'Только сегодня скидка 25%',
      link: 'https://example.com/ad2'
    },
    {
      bg: 'from-amber-500 to-orange-500',
      title: 'Ограниченный выпуск',
      text: 'Уникальные товары в наличии',
      link: 'https://example.com/ad3'
    }
  ];

  carouselTrack.innerHTML = slides.map(slide => `
    <a href="${slide.link}" target="_blank" class="carousel-slide bg-gradient-to-r ${slide.bg} p-4 text-white">
      <div class="flex items-center h-full">
        <div class="flex-1">
          <h3 class="font-bold text-lg">${slide.title}</h3>
          <p class="text-sm">${slide.text}</p>
        </div>
      </div>
      <span class="ad-label">Реклама</span>
    </a>
  `).join('');

  slideCount = slides.length;

  // Add event listeners
  document.querySelector('.carousel-prev').addEventListener('click', prevSlide);
  document.querySelector('.carousel-next').addEventListener('click', nextSlide);

  startCarousel();
}

function startCarousel() {
  carouselInterval = setInterval(nextSlide, 10000);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slideCount;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slideCount) % slideCount;
  updateCarousel();
}

function updateCarousel() {
  const track = document.getElementById('carouselTrack');
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  resetCarouselInterval();
}

function resetCarouselInterval() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(nextSlide, 10000);
}

// Initialize
initCarousel();