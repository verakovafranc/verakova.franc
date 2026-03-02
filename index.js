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
    // Save the original set of grid items as HTML
    const originalItems = Array.from(grid.querySelectorAll('.grid-item'));
    const originalHTML = originalItems.map(el => el.outerHTML).join('\n');

    // Seed with extra copies so there's content to scroll into
    grid.insertAdjacentHTML('beforeend', originalHTML);
    grid.insertAdjacentHTML('beforeend', originalHTML);

    let appending = false;

    function checkScroll() {
        if (appending) return;
        const scrollY = window.scrollY || window.pageYOffset;
        const viewportH = window.innerHeight;
        const docH = document.documentElement.scrollHeight;

        // When the user is within 600px of the bottom, append another copy
        if (scrollY + viewportH >= docH - 600) {
            appending = true;
            grid.insertAdjacentHTML('beforeend', originalHTML);
            appending = false;
        }

        // Keep DOM from growing forever: if we have more than 6 sets,
        // remove the oldest set and adjust scroll so user doesn't notice
        const currentItems = grid.querySelectorAll('.grid-item');
        const setSize = originalItems.length;
        const maxSets = 6;
        if (currentItems.length > setSize * maxSets) {
            const heightBefore = document.documentElement.scrollHeight;
            for (let i = 0; i < setSize; i++) {
                currentItems[i].remove();
            }
            const heightAfter = document.documentElement.scrollHeight;
            window.scrollBy(0, heightAfter - heightBefore);
        }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
});