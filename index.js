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
    const wrapper = document.querySelector('.portfolio-wrapper');
    const grid = document.querySelector('.portfolio-grid');
    // Save the original grid's inner HTML
    const originalGridHTML = grid.innerHTML;

    // Seed with extra copies so there's content to scroll into
    for (let i = 0; i < 2; i++) {
        const clone = document.createElement('div');
        clone.className = 'portfolio-grid';
        clone.innerHTML = originalGridHTML;
        wrapper.appendChild(clone);
    }

    let appending = false;

    function checkScroll() {
        if (appending) return;
        const scrollY = window.scrollY || window.pageYOffset;
        const viewportH = window.innerHeight;
        const docH = document.documentElement.scrollHeight;

        // When the user is within 800px of the bottom, append another copy
        if (scrollY + viewportH >= docH - 800) {
            appending = true;
            const clone = document.createElement('div');
            clone.className = 'portfolio-grid';
            clone.innerHTML = originalGridHTML;
            wrapper.appendChild(clone);
            appending = false;
        }

        // Keep DOM from growing forever: max 8 grid blocks
        const grids = wrapper.querySelectorAll('.portfolio-grid');
        if (grids.length > 8) {
            const heightBefore = document.documentElement.scrollHeight;
            grids[0].remove();
            const heightAfter = document.documentElement.scrollHeight;
            window.scrollBy(0, heightAfter - heightBefore);
        }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
});