
'use strict';

/*  PROPERTY DATA */
const properties = [
  {
    id: 1, type: 'buy',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
    price: '$485,000', title: 'Modern Villa with Pool', location: 'Kiyovu, Kigali',
    beds: 4, baths: 3, area: 320,
    desc: 'A stunning modern villa featuring an infinity pool, open-plan living spaces, and breathtaking city views. Perfect for luxury living.'
  },
  {
    id: 2, type: 'rent',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80',
    price: '$2,400/mo', title: 'Executive Penthouse', location: 'Nyarutarama, Kigali',
    beds: 3, baths: 2, area: 210,
    desc: 'A luxury penthouse on the 18th floor with panoramic city views, a private terrace, and high-end finishes throughout.'
  },
  {
    id: 3, type: 'buy',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    price: '$320,000', title: 'Contemporary Family Home', location: 'Gacuriro, Kigali',
    beds: 5, baths: 4, area: 400,
    desc: 'Spacious family home with a large garden, modern kitchen, and 5 en-suite bedrooms. Located near top schools and amenities.'
  },
  {
    id: 4, type: 'buy',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    price: '$595,000', title: 'Hilltop Dream Estate', location: 'Kimihurura, Kigali',
    beds: 6, baths: 5, area: 550,
    desc: 'An extraordinary estate on Kigali\'s most prestigious hill, featuring sweeping views, a home cinema, and a guest cottage.'
  },
  {
    id: 5, type: 'rent',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
    price: '$1,800/mo', title: 'Garden Apartment', location: 'Kibagabaga, Kigali',
    beds: 2, baths: 2, area: 140,
    desc: 'A charming ground-floor apartment with direct garden access, open kitchen, and a private parking space in a secure compound.'
  },
  {
    id: 6, type: 'sell',
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80',
    price: '$250,000', title: 'Cozy Suburban House', location: 'Remera, Kigali',
    beds: 3, baths: 2, area: 185,
    desc: 'A well-maintained 3-bedroom house in a quiet neighbourhood, ideal for first-time buyers or investors looking for solid rental yield.'
  }
];

/* UTILS*/
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* NAVBAR  */
const navbar   = $('navbar');
const hamburger = $('hamburger');
const navLinks  = $('navLinks');

window.addEventListener('scroll', () => {
  navbar && navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger && hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

/* Close mobile nav on link click */
$$('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks && navLinks.classList.remove('open');
  });
});

/* DARK / LIGHT MODE  */
const themeToggle = $('themeToggle');
const themeIcon   = $('themeIcon');
let darkMode = localStorage.getItem('skyline-theme') === 'dark';

function applyTheme() {
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  if (themeIcon) {
    themeIcon.className = darkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}
applyTheme();

themeToggle && themeToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  localStorage.setItem('skyline-theme', darkMode ? 'dark' : 'light');
  applyTheme();
});

/* SEARCH TABS  */
$$('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* SEARCH HANDLER  */
function handleSearch() {
  const loc = $('locationInput') && $('locationInput').value.trim();
  if (!loc) {
    if ($('locationInput')) {
      $('locationInput').focus();
      $('locationInput').style.borderBottom = '2px solid #e74c3c';
      setTimeout(() => { $('locationInput').style.borderBottom = ''; }, 1500);
    }
    return;
  }
  window.location.href = `listings.html?location=${encodeURIComponent(loc)}`;
}

/* COUNTER ANIMATION */
function animateCounters() {
  $$('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

/* Trigger counters once hero is visible */
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const counterObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); counterObs.disconnect(); }
  }, { threshold: 0.3 });
  counterObs.observe(heroStats);
}

/* IMAGE SLIDER */
const slides    = $$('.slide');
const dotsWrap  = $('sliderDots');
let currentSlide = 0;
let sliderTimer;

if (slides.length) {
  /* Build dots */
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap && dotsWrap.appendChild(dot);
  });

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    $$('.dot')[currentSlide] && $$('.dot')[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    $$('.dot')[currentSlide] && $$('.dot')[currentSlide].classList.add('active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 4500);
  }

  $('prevBtn') && $('prevBtn').addEventListener('click', () => goToSlide(currentSlide - 1));
  $('nextBtn') && $('nextBtn').addEventListener('click', () => goToSlide(currentSlide + 1));
  resetTimer();
}

/* FEATURED PROPERTY CARDS */
const featuredCards = $('featuredCards');
if (featuredCards) {
  const featured = properties.slice(0, 6);
  featuredCards.innerHTML = featured.map(p => `
    <div class="prop-card reveal" onclick="openModal(${p.id})">
      <div class="prop-img-wrap">
        <img src="${p.image}" alt="${p.title}" loading="lazy"/>
        <span class="prop-badge">${p.type.charAt(0).toUpperCase() + p.type.slice(1)}</span>
        <button class="prop-fav" onclick="toggleFav(event, this)" aria-label="Favourite">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
      <div class="prop-body">
        <div class="prop-price">${p.price}</div>
        <div class="prop-title">${p.title}</div>
        <div class="prop-loc"><i class="fa-solid fa-location-dot"></i>${p.location}</div>
        <div class="prop-meta">
          <span><i class="fa-solid fa-bed"></i> ${p.beds} Beds</span>
          <span><i class="fa-solid fa-bath"></i> ${p.baths} Baths</span>
          <span><i class="fa-solid fa-vector-square"></i> ${p.area} m²</span>
        </div>
      </div>
    </div>
  `).join('');
}

/* MODAL */
const modal      = $('modal');
const modalClose = $('modalClose');

function openModal(id) {
  const p = properties.find(x => x.id === id);
  if (!p || !modal) return;
  $('modalTitle').textContent = p.title;
  $('modalBody').innerHTML = `
    <img src="${p.image}" alt="${p.title}" class="modal-prop-img"/>
    <div class="modal-price">${p.price}</div>
    <div class="modal-meta">
      <span><i class="fa-solid fa-location-dot"></i> ${p.location}</span>
      <span><i class="fa-solid fa-bed"></i> ${p.beds} Bedrooms</span>
      <span><i class="fa-solid fa-bath"></i> ${p.baths} Bathrooms</span>
      <span><i class="fa-solid fa-vector-square"></i> ${p.area} m²</span>
    </div>
    <p class="modal-desc">${p.desc}</p>
    <div style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap;">
      <a href="contact.html" class="btn-primary"><i class="fa-solid fa-phone"></i> Contact Agent</a>
      <a href="listings.html" class="btn-outline"><i class="fa-solid fa-list"></i> See Similar</a>
    </div>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal && modal.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose && modalClose.addEventListener('click', closeModal);
modal && modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/*FAVOURITE TOGGLE*/
function toggleFav(e, btn) {
  e.stopPropagation();
  btn.classList.toggle('active');
  btn.innerHTML = btn.classList.contains('active')
    ? '<i class="fa-solid fa-heart"></i>'
    : '<i class="fa-regular fa-heart"></i>';
}

/*REVEAL ON SCROLL*/
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function initReveal() {
  $$('.reveal').forEach(el => revealObs.observe(el));
}
initReveal();

/*REAL-TIME CLOCK*/
function updateClock() {
  const el = $('liveClock');
  if (!el) return;
  const now  = new Date();
  const pad  = n => String(n).padStart(2, '0');
  el.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
updateClock();
setInterval(updateClock, 1000);

/*FORM VALIDATION (contact page)*/
const contactForm = $('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'fname', msg: 'First name is required' },
      { id: 'lname', msg: 'Last name is required' },
      { id: 'email', msg: 'Valid email is required', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      { id: 'phone', msg: 'Phone number is required' },
      { id: 'subject', msg: 'Please select a subject' },
      { id: 'message', msg: 'Message cannot be empty' }
    ];

    fields.forEach(f => {
      const el  = $(f.id);
      const grp = el && el.closest('.form-group');
      const err = grp && grp.querySelector('.form-error');
      if (!el) return;

      const val = el.value.trim();
      const fail = !val || (f.pattern && !f.pattern.test(val));

      grp.classList.toggle('error', fail);
      if (err) err.textContent = f.msg;
      if (fail) valid = false;
    });

    if (valid) {
      const successEl = $('formSuccess');
      contactForm.style.display = 'none';
      if (successEl) successEl.style.display = 'block';
    }
  });

  /* Clear error on input */
  contactForm.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      const grp = el.closest('.form-group');
      grp && grp.classList.remove('error');
    });
  });
}

/*LISTINGS PAGE FILTER*/
const listingsGrid = $('listingsGrid');
if (listingsGrid) {
  function renderListings(filtered) {
    if (!filtered.length) {
      listingsGrid.innerHTML = '<p style="text-align:center;color:var(--clr-muted);grid-column:1/-1;padding:40px">No properties found for the selected filters.</p>';
      return;
    }
    listingsGrid.innerHTML = filtered.map(p => `
      <div class="prop-card reveal" onclick="openModal(${p.id})">
        <div class="prop-img-wrap">
          <img src="${p.image}" alt="${p.title}" loading="lazy"/>
          <span class="prop-badge">${p.type.charAt(0).toUpperCase() + p.type.slice(1)}</span>
          <button class="prop-fav" onclick="toggleFav(event, this)" aria-label="Favourite">
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
        <div class="prop-body">
          <div class="prop-price">${p.price}</div>
          <div class="prop-title">${p.title}</div>
          <div class="prop-loc"><i class="fa-solid fa-location-dot"></i>${p.location}</div>
          <div class="prop-meta">
            <span><i class="fa-solid fa-bed"></i> ${p.beds} Beds</span>
            <span><i class="fa-solid fa-bath"></i> ${p.baths} Baths</span>
            <span><i class="fa-solid fa-vector-square"></i> ${p.area} m²</span>
          </div>
        </div>
      </div>
    `).join('');
    initReveal();
  }

  renderListings(properties);

  const filterType = $('filterType');
  const filterBeds = $('filterBeds');
  const filterBtn  = $('filterBtn');

  filterBtn && filterBtn.addEventListener('click', () => {
    const type = filterType && filterType.value;
    const beds = filterBeds && parseInt(filterBeds.value, 10);

    const filtered = properties.filter(p => {
      const matchType = !type || p.type === type;
      const matchBeds = !beds || p.beds >= beds;
      return matchType && matchBeds;
    });
    renderListings(filtered);
  });

  /* Handle URL param */
  const params = new URLSearchParams(window.location.search);
  if (params.get('type') && filterType) {
    filterType.value = params.get('type');
    filterBtn && filterBtn.click();
  }
}

/*DYNAMIC GREETING (page-specific)*/
const greetEl = $('dynamicGreeting');
if (greetEl) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  greetEl.textContent = greeting + '!';
}

/*GALLERY LIGHTBOX*/
$$('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img || !modal) return;
    $('modalTitle').textContent = img.alt || 'Gallery';
    $('modalBody').innerHTML = `<img src="${img.src}" alt="${img.alt}" style="width:100%;border-radius:8px;"/>`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

console.log('%cSkyline Real Estate', 'color:#7c5cbf;font-size:1.2rem;font-weight:bold;');