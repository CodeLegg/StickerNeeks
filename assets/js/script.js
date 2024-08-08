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
  const newLogoSrc = "assets/images/stickerneeks-color-no-bg.png"; // New logo src to be used when menu is open

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





























const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const sliderScrollbar = document.querySelector(
    ".slider-container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  const firstImage = imageList.firstElementChild;
  const computedStyle = getComputedStyle(imageList); // Get the computed style of the image list
  const imageWidth =
    firstImage.clientWidth + parseInt(computedStyle.gridColumnGap); // Include grid gap in image width

  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    // Uodate thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const maxThumbPosition =
        sliderScrollbar.getBoundingClientRect().width -
        scrollbarThumb.offsetWidth;

      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };
    // remove event listener on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // add event listener for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  const handleSlideButtons = () => {
    slideButtons[0].style.display =
      imageList.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
  };

  imageList.addEventListener("scroll", () => {
    handleSlideButtons();
    updateScrollThumbPosition(); // Update scrollbar thumb position when the slider is scrolled
  });

  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  // Call handleSlideButtons initially to set initial button visibility
  handleSlideButtons();
  updateScrollThumbPosition();
};

window.addEventListener("load", initSlider);