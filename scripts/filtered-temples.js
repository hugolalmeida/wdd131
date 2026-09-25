const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642.jpg"
  },
  {
    templeName: "Sao Paulo Brazil",
    location: "Sao Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/sao-paulo-brazil-temple/sao-paulo-brazil-temple-55945.jpg"
  },
  {
    templeName: "Fortaleza Brazil",
    location: "Fortaleza, Brazil",
    dedicated: "2019, June, 2",
    area: 37000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/fortaleza-brazil-temple/fortaleza-brazil-temple-11029.jpg"
  }
];

const navList = document.querySelector('.nav-list');
const menuToggle = document.querySelector('.menu-toggle');
const gallery = document.querySelector('.gallery');
const copyrightYear = document.querySelector('#copyright-year');
const lastModified = document.querySelector('#lastModified');
const filterLinks = document.querySelectorAll('[data-filter]');

function createTempleCard(temple) {
  const card = document.createElement('figure');
  card.className = 'temple-card';

  const image = document.createElement('img');
  image.src = temple.imageUrl;
  image.alt = `${temple.templeName} exterior`;
  image.loading = 'lazy';

  const caption = document.createElement('figcaption');
  const name = document.createElement('h2');
  name.textContent = temple.templeName;
  const location = document.createElement('p');
  location.innerHTML = `<strong>Location:</strong> ${temple.location}`;
  const dedicated = document.createElement('p');
  dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;
  const area = document.createElement('p');
  area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

  caption.append(name, location, dedicated, area);
  card.append(image, caption);
  return card;
}

function displayTemples(templeList) {
  gallery.replaceChildren(...templeList.map(createTempleCard));
}

function filterTemples(filter) {
  if (filter === 'old') {
    return temples.filter((temple) => Number(temple.dedicated.slice(0, 4)) < 1900);
  }
  if (filter === 'new') {
    return temples.filter((temple) => Number(temple.dedicated.slice(0, 4)) > 2000);
  }
  if (filter === 'large') {
    return temples.filter((temple) => temple.area > 90000);
  }
  if (filter === 'small') {
    return temples.filter((temple) => temple.area < 10000);
  }
  return temples;
}

filterLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    displayTemples(filterTemples(link.dataset.filter));
    navList.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

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

displayTemples(temples);
