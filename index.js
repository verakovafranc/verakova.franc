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
});