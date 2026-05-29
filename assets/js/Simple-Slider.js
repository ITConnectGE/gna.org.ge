document.addEventListener("DOMContentLoaded", function () {
  const rotatingTexts = [
    "ადგილობრივი და საერთაშორისო სამეცნიერო კვლევების წარმოება",
    "ხარისხიანი ნეიროფსიქოლოგიური სერვისების დანერგვისა და განვითარების ხელშეწყობა",
    "საგანმანათლებლო ლიტერატურის მომზადება და გავრცელება",
    "საქართველოში ნეიროფსიქოლოგიის წინადიპლომური და პოსტდიპლომური სწავლების სტიმულირება"
  ];

  const swiper = new Swiper('.swiper-container', {
    loop: true,
    speed: 1200,
    effect: 'slide',
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      init: function () {
        updateSlideTexts(this.realIndex);
      },
      slideChangeTransitionStart: function () {
        const prevSlide = document.querySelector('.swiper-slide-prev, .swiper-slide-active');
        const prevText = prevSlide?.querySelector('.slide-text');
        if (prevText) {
          prevText.classList.remove('slideFadeIn'); 
          prevText.classList.add('slide-fade-out');
        }
      },
      slideChangeTransitionEnd: function () {
        // Clean up old fade-out classes
        document.querySelectorAll('.slide-text').forEach(text => {
          text.classList.remove('slide-fade-out');
        });

        updateSlideTexts(this.realIndex);
        // No need to manually add fade-in; Swiper applies your .swiper-slide-active styles
      }
    }
  });

  function updateSlideTexts(index) {
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach((slide, i) => {
      const textEl = slide.querySelector('.slide-text');
      if (textEl) {
        const realIndex = i % rotatingTexts.length;
        textEl.textContent = rotatingTexts[realIndex];
      }
    });
  }
});