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

    // ── Masonry + Infinite scroll ─────────────────────
    const grid = document.querySelector('.portfolio-grid');

    // Save original items as HTML before modifying the DOM
    const originalItemsHTML = Array.from(grid.querySelectorAll('.grid-item'))
        .map(el => el.outerHTML);
    const totalItems = originalItemsHTML.length;

    function getColCount() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    // Distribute items sequentially (same order as CSS columns: fill left to right)
    function distributeItems(items, cols) {
        const result = Array.from({ length: cols }, () => []);
        let idx = 0;
        let remaining = items.length;
        for (let c = 0; c < cols; c++) {
            const count = Math.ceil(remaining / (cols - c));
            for (let i = 0; i < count; i++) {
                result[c].push(items[idx++]);
            }
            remaining -= count;
        }
        return result;
    }

    let colCount = getColCount();
    let colElements = [];
    let setsCount = 0;

    function buildGrid() {
        colCount = getColCount();
        grid.innerHTML = '';
        grid.classList.add('masonry-flex');
        colElements = [];
        setsCount = 0;
        for (let i = 0; i < colCount; i++) {
            const col = document.createElement('div');
            col.className = 'masonry-col';
            grid.appendChild(col);
            colElements.push(col);
        }
        appendSet();
    }

    function appendSet() {
        const distributed = distributeItems(originalItemsHTML, colCount);
        distributed.forEach((items, colIdx) => {
            items.forEach(html => {
                colElements[colIdx].insertAdjacentHTML('beforeend', html);
            });
        });
        setsCount++;
    }

    buildGrid();

    // Infinite scroll
    let appending = false;

    function checkScroll() {
        if (appending) return;
        const scrollY = window.scrollY || window.pageYOffset;
        const viewportH = window.innerHeight;
        const docH = document.documentElement.scrollHeight;

        if (scrollY + viewportH >= docH - 800) {
            appending = true;
            appendSet();
            appending = false;
        }

        // Prune oldest set if too many
        if (setsCount > 8) {
            const distributed = distributeItems(originalItemsHTML, colCount);
            const heightBefore = document.documentElement.scrollHeight;
            distributed.forEach((items, colIdx) => {
                const colItems = colElements[colIdx].querySelectorAll('.grid-item');
                for (let i = 0; i < items.length && i < colItems.length; i++) {
                    colItems[i].remove();
                }
            });
            const heightAfter = document.documentElement.scrollHeight;
            window.scrollBy(0, heightAfter - heightBefore);
            setsCount--;
        }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });

    // Rebuild on resize if column count changes
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (getColCount() !== colCount) {
                buildGrid();
            }
        }, 200);
    });
});