document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  window.addEventListener("load", function () {
    document.getElementById("loader").style.display = "none";
    document.getElementById("preloader").style.display = "none";
  });

  // Navigation Menu
  const toggleButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-navigation");
  if (toggleButton && nav) {
    toggleButton.addEventListener("click", function (e) {
      e.preventDefault();
      toggleButton.classList.toggle("is-clicked");
      nav.style.display = nav.style.display === "block" ? "none" : "block";
    });
  }

  // Smooth Scrolling
  const smoothScrollLinks = document.querySelectorAll(".smoothscroll");
  smoothScrollLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(link.hash);
      if (target) {
        scrollToTarget(target);
      }
    });
  });

  function scrollToTarget(target) {
    const targetPosition = target.offsetTop;
    const currentPosition = window.scrollY;
    const distance = targetPosition - currentPosition;
    const duration = 800;
    const startTime = performance.now();

    function animateScroll(currentTime) {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        window.scrollTo(
          0,
          currentPosition + distance * easeInOutQuad(progress)
        );
        requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, targetPosition);
      }
    }

    requestAnimationFrame(animateScroll);
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  // Swiper services
  const swiperServices = new Swiper("#swiper-services", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      1300: {
        slidesPerView: 3,
      },
      900: {
        slidesPerView: 2,
      },
    },
  });

  // countUp
  const countUpElements = document.querySelectorAll(".stat-count");

  countUpElements.forEach((element) => {
    const targetValue = parseInt(element.textContent, 10);
    let startTime;
    let animationStarted = false;

    const animateCountUp = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const totalTime = 3500;
      const incrementValue = (progress / totalTime) * targetValue;

      if (progress < totalTime) {
        element.textContent = Math.round(incrementValue);
        requestAnimationFrame(animateCountUp);
      } else {
        element.textContent = targetValue;
      }
    };

    window.addEventListener("scroll", () => {
      if (window.scrollY > 7000 && !animationStarted) {
        startTime = null;
        animationStarted = true;
        requestAnimationFrame(animateCountUp);
      }
    });
  });

  // Back to top
  const pxShow = 500;
  const goTopButton = document.getElementById("go-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY >= pxShow) {
      goTopButton.style.display = "block";
    } else {
      goTopButton.style.display = "none";
    }
  });
});
