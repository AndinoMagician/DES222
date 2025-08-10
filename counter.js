document.addEventListener('DOMContentLoaded', () => {
    let totalEmissions = 0;
    const counterElement = document.getElementById('hoverCounter');
    const cards = document.querySelectorAll('.card');

    // Function to animate the counter change
    function animateCounter(from, to) {
        const duration = 500; // ms
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(from + (to - from) * progress);
            counterElement.textContent = `Emissions - ${value}`;
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    cards.forEach(card => {
        let hoveredOnce = false;
        const emissionsValue = parseInt(card.dataset.emissions, 10) || 0;

        card.addEventListener('mouseenter', () => {
            if (!hoveredOnce) {
                const previousTotal = totalEmissions;
                totalEmissions += emissionsValue;
                animateCounter(previousTotal, totalEmissions);
                hoveredOnce = true;
            }
        });
    });
});