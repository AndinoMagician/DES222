let totalEmissions = 0;
const counterDisplay = document.getElementById("hoverCounter");

// Initialize all cards as not activated
document.querySelectorAll(".card").forEach(card => {
  card.dataset.activated = "false";

  // Hover for desktop
  card.addEventListener("mouseenter", () => {
    if (window.innerWidth > 1024 && card.dataset.activated === "false") {
      addEmissions(card);
    }
  });

  // Click/tap for mobile/tablet
  card.addEventListener("click", () => {
    if (window.innerWidth <= 1024 && card.dataset.activated === "false") {
      addEmissions(card);
    }
  });
});

function addEmissions(card) {
  const emissions = parseInt(card.dataset.emissions, 10) || 0;
  totalEmissions += emissions;
  animateCounter(totalEmissions);
  card.dataset.activated = "true"; // Mark as used
}

function animateCounter(target) {
  let current = parseInt(counterDisplay.textContent.replace(/\D/g, ""), 10) || 0;
  const increment = target > current ? 10 : -10; // Faster increments

  const step = () => {
    current += increment;

    // Avoid overshooting
    if ((increment > 0 && current > target) || (increment < 0 && current < target)) {
      current = target;
    }

    counterDisplay.textContent = `EMISSIONS = ${current}`;

    if (current !== target) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}