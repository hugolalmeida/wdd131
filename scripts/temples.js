const navList = document.querySelector('.nav-list');
const menuToggle = document.querySelector('.menu-toggle');
const copyrightYear = document.querySelector('#copyright-year');
const lastModified = document.querySelector('#lastModified');

if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = document.lastModified;
}

if (menuToggle && navList) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });
}
