// cart.js   [global dynamic cart function]
let listProducts = [];
let carts = [];

const iconCart = document.getElementById("icon-cart");
const closeCart = document.getElementById("close");
const cartTab = document.getElementById("cartTab");
const overlay = document.getElementById("overlay");
const listCartHTML = document.querySelector(".listCart");
const cartCount = document.getElementById("cart-count");

iconCart?.addEventListener("click", () => {
  cartTab.classList.add("active");
  overlay.classList.add("active");
});

closeCart?.addEventListener("click", () => {
  cartTab.classList.remove("active");
  overlay.classList.remove("active");
});

overlay?.addEventListener("click", () => {
  cartTab.classList.remove("active");
  overlay.classList.remove("active");
});

const addToCart = (product_id) => {
  const product = listProducts.find(p => p.id == product_id);
  if (!product) return;

  const existing = carts.find(cart => cart.product_id == product_id);
  if (existing) {
    alert("This product has already been added to your cart!");
    return; // prevent quantity increment & stop further execution
    // existing.quantity++;
  } else {
    carts.push({ product_id, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(carts));
  addCartToHTML();
};

const addCartToHTML = () => {
  // FIXED: Add a check to ensure listCartHTML exists
  if (!listCartHTML) {
      return;
  }
  
  listCartHTML.innerHTML = "";
  let totalUniqueProducts = 0;

  carts.forEach((cart, index) => {
    totalUniqueProducts++;
    const product = listProducts.find(p => p.id == cart.product_id);
    if (!product) return;

    const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;
    const newCart = document.createElement("div");
    newCart.classList.add("item");
    newCart.innerHTML = `
      <div class="image"><img src="${firstImage}" alt="${product.name}"></div>
      <div class="name">${product.name}</div>
      <div class="price">$${product.price * cart.quantity}</div>
      <input type="number" value="${cart.quantity}" min="1" class="quantity" data-index="${index}">
      <i class="ri-delete-bin-6-fill cart-remove" data-index="${index}" style="cursor:pointer;"></i>
    `;
    listCartHTML.appendChild(newCart);
  });

  if (cartCount) {
    cartCount.innerText = totalUniqueProducts;
  }

  listCartHTML.querySelectorAll(".quantity").forEach(input => {
    input.addEventListener("change", event => {
      const index = event.target.dataset.index;
      let newQty = parseInt(event.target.value);
      if (isNaN(newQty) || newQty < 1) newQty = 1;
      carts[index].quantity = newQty;
      localStorage.setItem("cart", JSON.stringify(carts));
      addCartToHTML();
    });
  });

  listCartHTML.querySelectorAll(".cart-remove").forEach(button => {
    button.addEventListener("click", event => {
      const index = event.target.dataset.index;
      carts.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(carts));
      addCartToHTML();
    });
  });
};

const initCart = () => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      listProducts = data;
      const saved = localStorage.getItem("cart");
      if (saved) {
        carts = JSON.parse(saved);
      }
      addCartToHTML();
    });
};

initCart();
// Export in global scope for product.js
window.addToCart = addToCart;


// Modular activation based on current URL
// Handle tab clicks and toggle active class correctly
const navLinks = document.querySelectorAll(".navLink");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
  const href = link.getAttribute("href").split("/").pop();

  // First remove 'active' from all links
  link.classList.remove("active");

  // Then check for exact match and add active
  if (href && currentPage === href) {
    link.classList.add("active");
  }
});


//sidenav/accordion start here ===========
// ====== SIDENAV OPEN/CLOSE ======
const openNav = document.getElementById("openNav");
const closeNav = document.getElementById("closeNav");
const sideNav = document.getElementById("mySidenav");
const overlay2 = document.getElementById("overlay2");

openNav?.addEventListener("click", () => {
  sideNav.classList.add("active");
  overlay2.classList.add("active");
});

closeNav?.addEventListener("click", () => {
  sideNav.classList.remove("active");
  overlay2.classList.remove("active");
});

overlay2?.addEventListener("click", () => {
  sideNav.classList.remove("active");
  overlay2.classList.remove("active");
});

// ====== CLOSE SIDENAV FUNCTION ======
const closeSidenav = () => {
  sideNav?.classList.remove("active");
  overlay2?.classList.remove("active");
};

// ====== ACCORDION TOGGLE ======
const accordionToggles = document.querySelectorAll(".accordion-toggle");
accordionToggles.forEach(button => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    const isOpen = panel.style.maxHeight;

    // Close all others
    document.querySelectorAll(".accordion-panel").forEach(p => p.style.maxHeight = null);
    document.querySelectorAll(".accordion-toggle").forEach(btn => btn.classList.remove("active"));

    if (!isOpen) {
      panel.style.maxHeight = panel.scrollHeight + "px";
      button.classList.add("active");
    }
  });
});

// ====== LOAD ACCORDION LINKS WITH "ALL ITEMS" ======
const loadAccordionLinks = () => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      const categories = ["baby", "women", "men"];

      categories.forEach(category => {
        const panel = document.getElementById(`${category}Panel`);
        if (!panel) return;

        panel.innerHTML = ""; // clear before adding links

        // Count all items for the category
        const categoryProducts = data.filter(p => p.category === category);
        const allCount = categoryProducts.length;

        // Create "All Items" link first
        const allLink = document.createElement("a");
        allLink.href = "#";
        allLink.dataset.category = category;
        allLink.dataset.type = "all";
        allLink.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} All Items (${allCount})`;
        allLink.addEventListener("click", e => {
          e.preventDefault();
          if (window.location.pathname.includes("product.html") || window.location.pathname === "/") {
            filterProducts(category, "all");
            closeSidenav();
          } else {
            window.location.href = `product.html?category=${category}&type=all`;
          }
        });
        panel.appendChild(allLink);

        // create individual type links
        const types = Array.from(new Set(categoryProducts.map(p => p.type)));
        types.forEach(type => {
          const typeCount = categoryProducts.filter(p => p.type === type).length;
          const link = document.createElement("a");
          link.href = "#";
          link.dataset.category = category;
          link.dataset.type = type;
          link.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} (${typeCount})`;

          link.addEventListener("click", e => {
            e.preventDefault();
            if (window.location.pathname.includes("product.html") || window.location.pathname === "/") {
              filterProducts(category, type);
              closeSidenav();
            } else {
              window.location.href = `product.html?category=${category}&type=${type}`;
            }
          });
          panel.appendChild(link);
        });
      });
    });
};

// Filter Products 
const filterProducts = (category, type) => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      let filtered;
      if (type === "all") {
        filtered = data.filter(product => product.category === category);
      } else if (type === "other") {
        filtered = data.filter(product =>
          product.category === category &&
          !["shirt", "pant", "tshirt", "bodysuits", "leggings", "joggers", "frocks", "scarves", "pajama", "shoe"].includes(product.type)
        );
      } else {
        filtered = data.filter(product => product.category === category && product.type === type);
      }

      if (typeof addDataToHTML === 'function') {
        addDataToHTML(filtered);
      }
    });
};

//url pram filter on load 
const checkURLForFilters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const type = urlParams.get('type');

  if (category && type) {
    filterProducts(category, type);
  }
};


loadAccordionLinks();
if (window.location.pathname.includes("product.html") || window.location.pathname === "/") {
  checkURLForFilters();
}
// accordion section end here ============

// Hide & Show navbar on Scrolling 
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  const currentScrollPos = window.pageYOffset;
  const header = document.getElementsByClassName("headerShadow")[0];

  if (prevScrollpos > currentScrollPos) {
    // document.getElementsByClassName("headerShadow").style.top = "0";
    header.style.top = "0";
  } else {
    // document.getElementsByClassName("headerShadow").style.top = "-70px";
    header.style.top = "-70px";
  }
  prevScrollpos = currentScrollPos;
};


// handle the global search functionality
const handleGlobalSearch = () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.querySelector(".searchField");

  searchForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      // Redirect to the product page with a search query in the URL
      window.location.href = `product.html?q=${encodeURIComponent(query)}`;
    }
  });
};

// Call the search function
handleGlobalSearch();
