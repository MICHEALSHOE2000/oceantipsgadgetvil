const WHATSAPP_NUMBER = "2347038995759";
const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_STEP = 8;

const categories = [
  { name: "iPhone", image: "images/17pro-1.jpg", copy: "Premium Apple models for buyers who want trusted performance." },
  { name: "Android", image: "images/16promax-1.jpg", copy: "Samsung, Tecno, Infinix, and more Android options." },
  { name: "iPad", image: "images/15promax-1.jpeg", copy: "Apple iPads for work, creativity, school, and entertainment." },
  { name: "Tablet", image: "images/15promax-2.jpeg", copy: "Everyday tablets for browsing, calls, learning, and business." },
  { name: "Children Tab", image: "images/14-1.jpeg", copy: "Learning-focused tabs for children and family use." },
  { name: "Laptop", image: "images/brand17.jpg", copy: "HP, Dell, MacBook, and work-ready laptops." },
  { name: "Accessories", image: "images/15pro-3.jpeg", copy: "Chargers, AirPods, power banks, cases, and essentials." }
];

// Add more objects to this array to grow the catalog. Rendering is paginated for performance.
const products = [
  { id: 1, name: "iPhone 15 Pro Max", category: "iPhone", condition: "New / UK Used options", image: "images/15promax-1.jpeg", shortDescription: "Flagship Apple performance with pro camera features.", badge: "Popular", whatsappMessage: "iPhone 15 Pro Max" },
  { id: 2, name: "iPhone 14 Pro Max", category: "iPhone", condition: "New / UK Used options", image: "images/14promax-1.jpeg", shortDescription: "Premium iPhone model with strong battery and display.", badge: "Hot Deal", whatsappMessage: "iPhone 14 Pro Max" },
  { id: 3, name: "Samsung Galaxy S23 Ultra", category: "Android", condition: "Available on request", image: "images/16pro-1.jpg", shortDescription: "High-end Android option for power users and creators.", badge: "Android", whatsappMessage: "Samsung Galaxy S23 Ultra" },
  { id: 4, name: "Samsung Galaxy A Series", category: "Android", condition: "Available on request", image: "images/16-1.jpg", shortDescription: "Everyday Samsung phones with reliable value.", badge: "Value", whatsappMessage: "Samsung Galaxy A series" },
  { id: 5, name: "Tecno Camon Series", category: "Android", condition: "Available on request", image: "images/13pro-1.jpeg", shortDescription: "Stylish Android phones with strong camera features.", badge: "Camera", whatsappMessage: "Tecno Camon series" },
  { id: 6, name: "Infinix Note Series", category: "Android", condition: "Available on request", image: "images/13-1.jpeg", shortDescription: "Large-screen Android phones for work and entertainment.", badge: "Budget", whatsappMessage: "Infinix Note series" },
  { id: 7, name: "iPad Pro", category: "iPad", condition: "Available on request", image: "images/15promax-2.jpeg", shortDescription: "Powerful iPad for design, school, media, and business.", badge: "Pro", whatsappMessage: "iPad Pro" },
  { id: 8, name: "Samsung Tablet", category: "Tablet", condition: "Available on request", image: "images/14pro-2.jpeg", shortDescription: "Android tablet options for browsing and productivity.", badge: "Tablet", whatsappMessage: "Samsung Tablet" },
  { id: 9, name: "Children Learning Tab", category: "Children Tab", condition: "Available on request", image: "images/12-2.jpeg", shortDescription: "Kid-friendly tab options for learning and play.", badge: "Kids", whatsappMessage: "Children Learning Tab" },
  { id: 10, name: "HP Laptop", category: "Laptop", condition: "Available on request", image: "images/brand17.jpg", shortDescription: "Work, school, and business laptop options from HP.", badge: "Laptop", whatsappMessage: "HP Laptop" },
  { id: 11, name: "Dell Laptop", category: "Laptop", condition: "Available on request", image: "images/shop.jpeg", shortDescription: "Reliable Dell laptops for office and study needs.", badge: "Work Ready", whatsappMessage: "Dell Laptop" },
  { id: 12, name: "MacBook", category: "Laptop", condition: "Available on request", image: "images/17air-1.jpg", shortDescription: "Apple laptop options for creators and professionals.", badge: "Apple", whatsappMessage: "MacBook" },
  { id: 13, name: "Phone Charger", category: "Accessories", condition: "Available on request", image: "images/11-1.jpeg", shortDescription: "Charging accessories for different phone models.", badge: "Essential", whatsappMessage: "Phone Charger" },
  { id: 14, name: "AirPods", category: "Accessories", condition: "Available on request", image: "images/11pro-1.jpeg", shortDescription: "Wireless audio accessories for calls and music.", badge: "Audio", whatsappMessage: "AirPods" },
  { id: 15, name: "Power Bank", category: "Accessories", condition: "Available on request", image: "images/12pro-1.jpeg", shortDescription: "Portable backup power for daily movement.", badge: "Power", whatsappMessage: "Power Bank" },
  { id: 16, name: "Phone Case", category: "Accessories", condition: "Available on request", image: "images/12promax-1.jpeg", shortDescription: "Protective cases for popular phone models.", badge: "Protection", whatsappMessage: "Phone Case" },
  { id: 17, name: "iPhone 13 Pro Max", category: "iPhone", condition: "New / UK Used options", image: "images/13promax-1.jpeg", shortDescription: "Strong Apple flagship option with great camera quality.", badge: "Featured", whatsappMessage: "iPhone 13 Pro Max" },
  { id: 18, name: "iPhone 12 Pro", category: "iPhone", condition: "UK Used options", image: "images/12pro-1.jpeg", shortDescription: "A premium iPhone option at a more accessible range.", badge: "Available", whatsappMessage: "iPhone 12 Pro" },
  { id: 19, name: "Android Phone Bundle", category: "Android", condition: "Available on request", image: "images/16plus-1.jpg", shortDescription: "Ask for current Android phones that match your budget.", badge: "Ask Us", whatsappMessage: "Android Phone Bundle" },
  { id: 20, name: "Tablet Accessories", category: "Accessories", condition: "Available on request", image: "images/15-3.jpeg", shortDescription: "Cases, chargers, and useful tablet add-ons.", badge: "Add-ons", whatsappMessage: "Tablet Accessories" }
];

const categoryGrid = document.querySelector("#categoryGrid");
const filterTabs = document.querySelector("#filterTabs");
const productGrid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const resultsCount = document.querySelector("#resultsCount");
const loadMoreBtn = document.querySelector("#loadMoreBtn");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".carousel-dot");
const menuToggle = document.querySelector(".menu-toggle");
const navActions = document.querySelector(".nav-actions");

let activeFilter = "All";
let visibleCount = INITIAL_VISIBLE_COUNT;
let activeHeroSlide = 0;
let heroTimer;

function whatsappLink(productName) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello, I want to order ${productName}. Is it available and what is the current price?`)}`;
}

function setFilter(categoryName) {
  activeFilter = categoryName;
  visibleCount = INITIAL_VISIBLE_COUNT;
  searchInput.value = "";
  renderFilterTabs();
  renderProducts();
  document.querySelector("#products").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCategories() {
  categoryGrid.innerHTML = categories.map((category) => `
    <article class="category-card" data-category="${category.name}">
      <img src="${category.image}" alt="${category.name} gadgets at MEGABROS ENTERPRISE" loading="lazy">
      <div>
        <h3>${category.name}</h3>
        <p>${category.copy}</p>
        <button type="button">View Products</button>
      </div>
    </article>
  `).join("");

  categoryGrid.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => setFilter(card.dataset.category));
  });
}

function renderFilterTabs() {
  const filterNames = ["All", ...categories.map((category) => category.name)];
  filterTabs.innerHTML = filterNames.map((name) => `
    <button class="tab ${activeFilter === name ? "active" : ""}" type="button" data-filter="${name}">${name}</button>
  `).join("");

  filterTabs.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      activeFilter = tab.dataset.filter;
      visibleCount = INITIAL_VISIBLE_COUNT;
      renderFilterTabs();
      renderProducts();
    });
  });
}

function filteredProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  return products.filter((product) => {
    const matchesCategory = activeFilter === "All" || product.category === activeFilter;
    const matchesSearch = !searchTerm || [product.name, product.category, product.shortDescription].some((value) => value.toLowerCase().includes(searchTerm));
    return matchesCategory && matchesSearch;
  });
}

// Only the current slice of matching products is placed in the DOM to keep the page lightweight.
function renderProducts() {
  const matches = filteredProducts();
  const visibleProducts = matches.slice(0, visibleCount);

  resultsCount.textContent = `${matches.length} product${matches.length === 1 ? "" : "s"} found`;
  productGrid.innerHTML = "";

  if (!matches.length) {
    productGrid.innerHTML = `<p class="empty-state">No products matched your search. Try another category or message us on WhatsApp.</p>`;
    loadMoreBtn.hidden = true;
    return;
  }

  const fragment = document.createDocumentFragment();
  visibleProducts.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-media">
        <img src="${product.image}" alt="${product.name} at MEGABROS ENTERPRISE" loading="lazy">
        <span class="product-badge">${product.badge}</span>
      </div>
      <div class="product-body">
        <div class="product-meta"><span>${product.category}</span><span>${product.condition}</span></div>
        <h3>${product.name}</h3>
        <p>${product.shortDescription}</p>
        <p class="price-copy">Current price available on WhatsApp</p>
        <p>Available for pickup at Computer Village or delivery</p>
        <a class="btn btn-primary" href="${whatsappLink(product.whatsappMessage)}" target="_blank" rel="noopener">Order on WhatsApp</a>
      </div>
    `;
    fragment.appendChild(card);
  });

  productGrid.appendChild(fragment);
  loadMoreBtn.hidden = visibleProducts.length >= matches.length;
}

function showHeroSlide(index) {
  activeHeroSlide = index;
  heroSlides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === index));
  heroDots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
}

function startHeroCarousel() {
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => {
    showHeroSlide((activeHeroSlide + 1) % heroSlides.length);
  }, 3000);
}

function setupInteractions() {
  searchInput.addEventListener("input", () => {
    visibleCount = INITIAL_VISIBLE_COUNT;
    renderProducts();
  });

  loadMoreBtn.addEventListener("click", () => {
    visibleCount += LOAD_MORE_STEP;
    renderProducts();
  });

  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showHeroSlide(Number(dot.dataset.slide));
      startHeroCarousel();
    });
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = navActions.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navActions.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navActions.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll("[data-footer-category]").forEach((link) => {
    link.addEventListener("click", () => setFilter(link.dataset.footerCategory));
  });
}

function setupRevealAnimation() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));
}

renderCategories();
renderFilterTabs();
renderProducts();
setupInteractions();
setupRevealAnimation();
startHeroCarousel();
