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


//sidenav start here ===========
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
//SideNav end here ==========


// accordion section start here ============
// Function to close the side navigation menu
const closeSidenav = () => {
  const sideNav = document.getElementById("mySidenav");
  const overlay2 = document.getElementById("overlay2");

  if (sideNav && overlay2) {
    sideNav?.classList.remove("active");
    overlay2?.classList.remove("active");
  }
};

// FIXED: Add a check for the existence of elements before adding event listeners
const accordionToggles = document.querySelectorAll(".accordion-toggle");
if (accordionToggles.length > 0) {
    accordionToggles.forEach(button => {
        button.addEventListener("click", () => {
            const panel = button.nextElementSibling;
            const isOpen = panel.style.maxHeight;

            // Close all other panels and remove 'active' class
            document.querySelectorAll(".accordion-panel").forEach(p => p.style.maxHeight = null);
            document.querySelectorAll(".accordion-toggle").forEach(btn => btn.classList.remove("active"));

            // Toggle current panel
            if (!isOpen) {
                panel.style.maxHeight = panel.scrollHeight + "px";
                button.classList.add("active");
            }
        });
    });
}


// Render accordion links dynamically
const loadAccordionLinks = () => {
    fetch("products.json")
        .then(res => res.json())
        .then(data => {
            const categories = ["baby", "women", "men"];

            categories.forEach(category => {
                const panel = document.getElementById(`${category}Panel`);
                // FIXED: Check if the panel exists before adding links
                if (!panel) return; 
                
                const types = Array.from(new Set(data
                    .filter(p => p.category === category)
                    .map(p => p.type)));

                types.forEach(type => {
                    const link = document.createElement("a");
                    link.href = "#";
                    link.dataset.category = category;
                    link.dataset.type = type;
                    link.textContent = type.charAt(0).toUpperCase() + type.slice(1);
                    link.addEventListener("click", e => {
                        e.preventDefault();
                        const isHomePage = window.location.pathname === '/' || window.location.pathname.includes('product.html');
                        if (isHomePage) {
                            filterProducts(category, type);
                            // Add this line to close the side menu after filtering
                            closeSidenav();
                        } else {
                            // Redirect to home page with parameters
                            window.location.href = `product.html?category=${category}&type=${type}`;
                        }
                    });
                    panel.appendChild(link);
                });
            });
        });
};

// Filter products from accordion clicks
const filterProducts = (category, type) => {
    fetch("products.json")
        .then(res => res.json())
        .then(data => {
            const filtered = data.filter(product =>
                product.category === category && (
                    type === "other"
                        ? !["babyAllItems", "shirt", "pant", "tshirt", "bodysuits", "leggings", "joggers", "frocks", "scarves", "pajama", "shoe"].includes(product.type)
                        : product.type === type
                )
            );
            // Assuming this function exists on index.html
            if (typeof addDataToHTML === 'function') {
                addDataToHTML(filtered);
            }
        });
};

// Check for URL parameters on page load and filter products
const checkURLForFilters = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const type = urlParams.get('type');

    if (category && type) {
        filterProducts(category, type);
    }
};

loadAccordionLinks();
// On product.html, call the function to check for URL parameters
if (window.location.pathname === '/' || window.location.pathname.includes('product.html')) {
    checkURLForFilters();
}
// accordion section end here ============