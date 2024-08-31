document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".js-menuToggle");
  const mobileMenuLevelZero = document.querySelector(".js-pushmobileMenu");
  const navOverlay = document.querySelector(".js-navOverlay");
  const openLevel = document.querySelectorAll(".js-openLevel");
  const closeLevel = document.querySelectorAll(".js-closeLevel");
  const header = document.querySelector("header"); // Select the header element
  const logo = document.querySelector(".logo"); // Select the logo element
  const headerIcons = document.querySelectorAll(".header-icon"); // Select all header icon elements
  const bars = document.querySelectorAll(".bar"); // Select all header icon elements
  const originalLogoSrc = "assets/images/stickerneeks-b-and-w-no-bg.png"; // Original logo src
  const newLogoSrc = "assets/images/stickerneeks-color.png"; // New logo src to be used when menu is open

  function toggleHeaderBackground() {
    if (mobileMenuLevelZero.classList.contains("isOpen") || window.pageYOffset >20) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  }

  menuToggle.addEventListener("click", function (e) {
    e.preventDefault();

    mobileMenuLevelZero.classList.toggle("isOpen");
    menuToggle.classList.toggle("cross");
    navOverlay.classList.toggle("active");

  // Function to update logo and header icons based on menu state and scroll position
function updateMenuState() {
  const isScrollAtZero = window.scrollY === 0; // Check if scroll is exactly 0 pixels
  const isScrollAboveZero = window.scrollY > 0; // Check if scroll is above 0 pixels
  const isMenuOpen = mobileMenuLevelZero.classList.contains("isOpen"); // Check if the menu is open

  if (isMenuOpen) {
    logo.src = newLogoSrc;
    headerIcons.forEach(icon => icon.classList.add("active"));
    bars.forEach(bar => bar.classList.add("active"));
  } else {
    logo.src = originalLogoSrc;
    if (isScrollAboveZero) {
      headerIcons.forEach(icon => icon.classList.add("active"));
      bars.forEach(bar => bar.classList.add("active"));
    } else {
      headerIcons.forEach(icon => icon.classList.remove("active"));
      bars.forEach(bar => bar.classList.remove("active"));
    }
  }
}

// Attach event listeners
window.addEventListener('scroll', updateMenuState);
mobileMenuLevelZero.addEventListener('click', updateMenuState); // Or whatever triggers the menu open/close

// Initial call to set the correct state based on initial scroll position and menu state
updateMenuState();

    // Toggle overflow hidden on body
    document.body.style.overflow = mobileMenuLevelZero.classList.contains("isOpen")
      ? "hidden"
      : "auto";

    // Remove isOpen class from all levels
    document.querySelectorAll(".js-pushNavLevelBack.isOpen")
      .forEach((navLevel) => navLevel.classList.remove("isOpen"));

    toggleHeaderBackground(); // Update header background based on menu state
  });

  openLevel.forEach((item) => {
    item.addEventListener("click", function () {
      const nextNavLevel = this.nextElementSibling;
      if (nextNavLevel) {
        nextNavLevel.classList.add("isOpen");
      }
    });
  });

  closeLevel.forEach((item) => {
    item.addEventListener("click", function () {
      const parentNavLevel = this.closest(".js-pushNavLevelBack");
      if (parentNavLevel) {
        parentNavLevel.classList.remove("isOpen");
        parentNavLevel.querySelectorAll(".isOpen")
          .forEach((childLevel) => childLevel.classList.remove("isOpen"));
      }
    });
  });

  // HEADER SCROLL
  const body = document.body;
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 20) {
      body.classList.add("scroll-up");
      body.classList.remove("scroll-down");
      header.classList.remove("active"); // Make header transparent at top
      headerIcons.forEach(icon => icon.classList.remove("active")); // Remove active class from all header icons
      bars.forEach(bar => bar.classList.remove("active")); // Add active class to all header icons
    } else if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
      body.classList.remove("scroll-up");
      body.classList.add("scroll-down");
    } else if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
      body.classList.remove("scroll-down");
      body.classList.add("scroll-up");
      headerIcons.forEach(icon => icon.classList.add("active")); // Remove active class from all header icons
      bars.forEach(bar => bar.classList.add("active")); // Add active class to all header icons

    }

    

    lastScroll = currentScroll;
    toggleHeaderBackground(); // Update header background based on scroll state
  });
});





























document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");
  const prevArrow = document.querySelector(".nav-arrow.prev");
  const nextArrow = document.querySelector(".nav-arrow.next");
  const pausePlayButton = document.querySelector(".pause-play-button");
  let currentIndex = 0;
  let slideInterval;
  let isPaused = false;

  // Create dots
  slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function goToSlide(index) {
      slides[currentIndex].classList.remove("active");
      dots[currentIndex].classList.remove("active");
      currentIndex = index;
      slides[currentIndex].classList.add("active");
      dots[currentIndex].classList.add("active");
      resetTimer();
  }

  function nextSlide() {
      let newIndex = (currentIndex + 1) % slides.length;
      goToSlide(newIndex);
  }

  function prevSlide() {
      let newIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(newIndex);
  }

  function resetTimer() {
      if (slideInterval) clearInterval(slideInterval);
      if (!isPaused) {
          slideInterval = setInterval(nextSlide, 3000);
      }
  }

  function togglePausePlay() {
      if (isPaused) {
          pausePlayButton.querySelector("span").textContent = "Pause";
          isPaused = false;
          resetTimer();
      } else {
          pausePlayButton.querySelector("span").textContent = "Play";
          isPaused = true;
          clearInterval(slideInterval);
      }
  }

  pausePlayButton.addEventListener("click", togglePausePlay);
  nextArrow.addEventListener("click", nextSlide);
  prevArrow.addEventListener("click", prevSlide);

  resetTimer(); // Start the automatic slideshow
});
