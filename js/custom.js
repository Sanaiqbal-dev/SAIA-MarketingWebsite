var swiper = new Swiper(".serviceCarousel", {
  autoplay: {
    delay: 5000,
  },
  slidesPerView: 2,
  spaceBetween: 16,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 3,
    },
    // when window width is >= 1200px
    1200: {
      slidesPerView: 5,
    },
  },
  loop: true,
  loopAdditionalSlides: 5, // ensures smooth infinite scroll
  slidesPerGroup: 1, // move one logo per click
  //centeredSlidesBounds:true,
  pagination: {
    el: ".serviceCarousel-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".partnerSwiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
  loop: true,
  loopAdditionalSlides: 5, // ensures smooth infinite scroll
  slidesPerGroup: 1, // move one logo per click
  speed: 600,
  pagination: {
    el: ".partnerSwiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});
const searchToggle = document.querySelector(".action-menu .bi-search");
const searchDropdown = document.getElementById("searchDropdown");

if (searchToggle && searchDropdown) {
  searchToggle.closest("a").addEventListener("click", (e) => {
    e.preventDefault();
    const isVisible = searchDropdown.style.display === "block";
    searchDropdown.style.display = isVisible ? "none" : "block";
  });
}

// Optional: hide dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (
    !e.target.closest(".action-menu") &&
    !e.target.closest("#searchDropdown")
  ) {
    searchDropdown.style.display = "none";
  }
});
// Add hover + active styles
const links = document.querySelectorAll("#sideNav .nav-link");
links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.borderLeft = "3px solid #198754";
    link.style.backgroundColor = "#f8f9fa";
  });
  link.addEventListener("mouseleave", () => {
    if (!link.classList.contains("active")) {
      link.style.borderLeft = "3px solid transparent";
      link.style.backgroundColor = "transparent";
    }
  });
  link.addEventListener("click", () => {
    links.forEach((l) => {
      l.classList.remove("active");
      l.style.borderLeft = "3px solid transparent";
      l.style.fontWeight = "normal";
    });
    link.classList.add("active");
    link.style.borderLeft = "3px solid #198754";
    link.style.fontWeight = "600";
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
