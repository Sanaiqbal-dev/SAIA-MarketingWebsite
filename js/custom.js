// ---------------------
// Swiper Carousels
// ---------------------
var swiper1 = new Swiper(".serviceCarousel", {
  autoplay: { delay: 5000 },
  slidesPerView: 2,
  spaceBetween: 16,
  breakpoints: {
    320: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1200: { slidesPerView: 5 },
  },
  loop: true,
  loopAdditionalSlides: 5,
  slidesPerGroup: 1,
  pagination: {
    el: ".serviceCarousel-pagination",
    clickable: true,
  },
});

var swiper2 = new Swiper(".partnerSwiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
  loop: true,
  loopAdditionalSlides: 5,
  slidesPerGroup: 1,
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

// -------------------------------------------------------------------------
// EVERYTHING BELOW THIS LINE IS SAFE INSIDE DOMContentLoaded
// -------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // ---------------------
  // SEARCH DROPDOWN
  // ---------------------
  const searchDropdown = document.getElementById("searchDropdown");

  document.querySelectorAll(".search-trigger").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const offcanvas = document.getElementById("offcanvasNav");
      const instance = offcanvas
        ? bootstrap.Offcanvas.getInstance(offcanvas)
        : null;
      if (instance) instance.hide();

      if (searchDropdown) {
        searchDropdown.style.display =
          searchDropdown.style.display === "block" ? "none" : "block";
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (
      searchDropdown &&
      !e.target.closest(".search-trigger") &&
      !e.target.closest("#searchDropdown")
    ) {
      searchDropdown.style.display = "none";
    }
  });

  // ---------------------
  // SIDE NAV HOVER + ACTIVE
  // ---------------------
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

  // ---------------------
  // SMOOTH SCROLL
  // ---------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ---------------------
  // FEEDBACK SECTION
  // ---------------------
  const collapseEl = document.getElementById("feedbackExpanded");
  const bsCollapse = collapseEl
    ? new bootstrap.Collapse(collapseEl, { toggle: false })
    : null;
  const feedbackStats = document.getElementById("feedbackStats");
  const closeFeedbackBtn = document.getElementById("closeFeedbackBtn");
  let currentSelection = null;

  window.toggleFeedback = function (type) {
    if (!bsCollapse) return;

    const yesOptions = document.getElementById("yesOptions");
    const noOptions = document.getElementById("noOptions");
    const btnYes = document.getElementById("btnYes");
    const btnNo = document.getElementById("btnNo");

    currentSelection = type;

    btnYes?.classList.toggle("active", type === "yes");
    btnNo?.classList.toggle("active", type === "no");

    if (yesOptions && noOptions) {
      yesOptions.classList.toggle("d-none", type !== "yes");
      noOptions.classList.toggle("d-none", type !== "no");
    }

    bsCollapse.show();
    closeFeedbackBtn?.classList.remove("d-none");
    feedbackStats?.classList.add("d-none");
  };

  window.closeFeedback = function () {
    if (!bsCollapse) return;

    const btnYes = document.getElementById("btnYes");
    const btnNo = document.getElementById("btnNo");

    bsCollapse.hide();
    btnYes?.classList.remove("active");
    btnNo?.classList.remove("active");
    currentSelection = null;

    closeFeedbackBtn?.classList.add("d-none");
    feedbackStats?.classList.remove("d-none");

    document
      .querySelectorAll(".form-check-input")
      .forEach((input) => (input.checked = false));

    const feedbackText = document.getElementById("feedbackText");
    if (feedbackText) feedbackText.value = "";
  };

  window.submitFeedback = function () {
    alert("Thank you for your feedback!");
    window.closeFeedback();
  };

  // ---------------------
  // TOP BAR POPUP
  // ---------------------
  const popupSection = document.getElementById("popupSection");
  const chevronIcon = document.getElementById("chevronIcon");
  const topCollapse = popupSection
    ? new bootstrap.Collapse(popupSection, { toggle: false })
    : null;
  let isOpen = false;

  window.togglePopup = function () {
    if (!topCollapse) return;

    if (isOpen) {
      topCollapse.hide();
      chevronIcon?.classList.replace("fa-chevron-up", "fa-chevron-down");
    } else {
      topCollapse.show();
      chevronIcon?.classList.replace("fa-chevron-down", "fa-chevron-up");
    }
    isOpen = !isOpen;
  };

  // ---------------------
  // RATING SECTION – Smooth expand/collapse like Feedback
  // ---------------------
  const ratingExpandedEl = document.getElementById("ratingExpanded");
  const bsRatingCollapse = ratingExpandedEl
    ? new bootstrap.Collapse(ratingExpandedEl, { toggle: false })
    : null;
  const ratingCollapsed = document.getElementById("ratingCollapsed");

  // Open: fade out collapsed → smooth expand
  window.openRating = function () {
    if (!bsRatingCollapse || !ratingCollapsed) return;

    ratingCollapsed.style.opacity = "0";
    setTimeout(() => {
      ratingCollapsed.classList.add("d-none");
      bsRatingCollapse.show(); // ← smooth height animation
    }, 300);
  };

  const openRatingBtn = document.getElementById("openRatingBtn"); // ← this was missing!
  let currentRating = 0;

  // Attach the click event to the button
  if (openRatingBtn) {
    openRatingBtn.addEventListener("click", openRating);
  }
  // Close: smooth collapse → fade collapsed view back in
  window.closeRating = function () {
    if (!bsRatingCollapse || !ratingCollapsed) return;

    bsRatingCollapse.hide();

    ratingExpandedEl.addEventListener(
      "hidden.bs.collapse",
      function handler() {
        ratingCollapsed.classList.remove("d-none");
        ratingCollapsed.style.opacity = "1";

        // Reset form
        currentRating = 0;
        updateStars(0);
        const textarea = document.getElementById("ratingFeedbackText");
        if (textarea) textarea.value = "";

        ratingExpandedEl.removeEventListener("hidden.bs.collapse", handler);
      },
      { once: true }
    );
  };

  // Star rating functions (unchanged)
  window.setRating = function (rating) {
    currentRating = rating;
    updateStars(rating);
  };
  window.hoverRating = function (rating) {
    updateStars(rating);
  };
  window.resetHover = function () {
    updateStars(currentRating);
  };

  function updateStars(rating) {
    document.querySelectorAll("#starRating i").forEach((star, i) => {
      if (i < rating) {
        star.classList.remove("bi-star", "text-secondary");
        star.classList.add("bi-star-fill", "text-primary");
      } else {
        star.classList.remove("bi-star-fill", "text-primary");
        star.classList.add("bi-star", "text-secondary");
      }
    });
  }

  window.submitRating = function () {
    if (currentRating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }
    alert("Thank you for your rating of " + currentRating + " stars!");
    closeRating();
  };
});
