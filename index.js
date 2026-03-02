// Navigation toggle between WORK and INFO sections
document.addEventListener('DOMContentLoaded', () => {
    const navWork = document.querySelector('.nav-work');
    const navInfo = document.querySelector('.nav-info');
    const workSection = document.getElementById('work');
    const infoSection = document.getElementById('info');

    navWork.addEventListener('click', (e) => {
        e.preventDefault();
        workSection.classList.remove('hidden');
        infoSection.classList.add('hidden');
        navWork.classList.add('active');
        navInfo.classList.remove('active');
    });

    navInfo.addEventListener('click', (e) => {
        e.preventDefault();
        infoSection.classList.remove('hidden');
        workSection.classList.add('hidden');
        navInfo.classList.add('active');
        navWork.classList.remove('active');
    });

    // ── Infinite scroll loop ───────────────────────────
    const grid = document.querySelector('.portfolio-grid');

    // Save the original items as individual HTML strings
    const originalItems = Array.from(grid.querySelectorAll('.grid-item'))
        .map(el => el.outerHTML);

    let appending = false;

    function checkScroll() {
        if (appending) return;
        const scrollY = window.scrollY || window.pageYOffset;
        const viewportH = window.innerHeight;
        const docH = document.documentElement.scrollHeight;

        // When the user is within 800px of the bottom, append another set
        if (scrollY + viewportH >= docH - 800) {
            appending = true;
            originalItems.forEach(html => {
                grid.insertAdjacentHTML('beforeend', html);
            });
            appending = false;
        }

        // Prune items from the top to prevent DOM bloat (keep max ~8 sets)
        const allItems = grid.querySelectorAll('.grid-item');
        const maxItems = originalItems.length * 8;
        if (allItems.length > maxItems) {
            const toRemove = allItems.length - maxItems;
            // Measure scroll adjustment before removing
            const heightBefore = document.documentElement.scrollHeight;
            for (let i = 0; i < toRemove; i++) {
                allItems[i].remove();
            }
            const heightAfter = document.documentElement.scrollHeight;
            window.scrollBy(0, heightAfter - heightBefore);
        }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
});