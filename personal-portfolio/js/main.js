"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  window.addEventListener("load", function () {
    document.getElementById("loader").style.display = "none";
    document.getElementById("preloader").style.display = "none";
  });

  // FitText Settings
  setTimeout(function () {
    const introHeading = document
      .getElementById("intro")
      .getElementsByTagName("h1")[0];
    fitText(introHeading, 42, 84);
  }, 100);

  function fitText(element, minSize, maxSize) {
    const fontSize = Math.max(
      Math.min(
        element.clientWidth / (10 * (element.textContent.length / 2)),
        parseFloat(maxSize)
      ),
      parseFloat(minSize)
    );
    element.style.fontSize = fontSize + "px";
  }

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

  // Back to top
  const pxShow = 300;
  const goTopButton = document.getElementById("go-top");

  window.addEventListener("scroll", function () {
    if (
      !document.getElementById("header-search").classList.contains("is-visible")
    ) {
      if (window.scrollY >= pxShow) {
        goTopButton.style.display = "block";
      } else {
        goTopButton.style.display = "none";
      }
    }
  });
});
