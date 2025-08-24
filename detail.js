// Detail.js
//Popup section start here 
document.addEventListener("DOMContentLoaded", () => {
  const openPopup = document.getElementById("openSizeGuide");
  const popup = document.querySelector(".popup-content");
  const closePopup = document.getElementById("closeSizeGuide");
  const overlay = document.querySelector("#popupOverlay");


  openPopup.addEventListener('click', () => {
    popup.classList.add("active");
    overlay.classList.add("active");
  });

  closePopup.addEventListener('click', () => {
    popup.classList.remove("active");
    // console.log("hide");
    overlay.classList.remove("active");
  });

  overlay.addEventListener('click', ()=> {
    popup.classList.remove("active");
    overlay.classList.remove("active");
  });
});
//Popup section end here 


function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

document.addEventListener("DOMContentLoaded", () => {
  const productId = getProductIdFromURL();

  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id == productId);
      if (!product) return;

      // Main product detail
      document.getElementById("main-img").src = Array.isArray(product.image) ? product.image[0] : product.image;
      document.getElementById("product-name").innerText = product.name;
      document.querySelector(".price").innerText = `$${product.price}`;
      document.getElementById("product-desc").innerText = product.description || "No description available.";

      // Thumbnails
      const thumbnails = document.querySelector(".thumbnails");
      thumbnails.innerHTML = "";
      if (Array.isArray(product.image)) {
        product.image.forEach(img => {
          const thumb = document.createElement("img");
          thumb.src = img;
          thumb.classList.add("small-img");
          thumb.onclick = () => {
            document.getElementById("main-img").src = img;
          };
          thumbnails.appendChild(thumb);
        });
      }

      // ✅ Similar products rendering
      showSimilarProducts(product, products);
    });

  // Add to cart button logic
  const addToCartBtn = document.getElementById("addToCartBtn");
  const quantityInput = document.querySelector("input[type='number']");

  addToCartBtn.addEventListener("click", () => {
    const qty = parseInt(quantityInput.value);
    if (isNaN(qty) || qty < 1) return;

    const product = listProducts.find(p => p.id == productId);
    if (!product) return;

    const existing = carts.find(cart => cart.product_id == productId);
    if (existing) {
      alert("This product is already added in your cart!");
    } else {
      carts.push({ product_id: productId, quantity: qty });
      localStorage.setItem("cart", JSON.stringify(carts));
      addCartToHTML();
    }
  });
});

// 🧠 Similar Product Logic
const similarListHTML = document.querySelector(".similar-list");

const showSimilarProducts = (currentProduct, products) => {
  const similarProducts = products.filter(p =>
    p.id != currentProduct.id &&
    p.category === currentProduct.category &&
    p.type === currentProduct.type
  );

  similarListHTML.innerHTML = ""; //clear previous content

  similarProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("item");
    card.dataset.id = product.id;

    const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;

    card.innerHTML = `
      <a href="detail.html?id=${product.id}" style="text-decoration: none; color: black;">
        <img src="${firstImage}" alt="${product.name}">
        <h4>${product.name}</h4>
        <div class="price">$${product.price}</div>
      </a>
      <button class="addCart">Add To Cart</button>
    `;
    similarListHTML.appendChild(card);
  });

  // if any similar product not found then return text
  if (similarProducts.length === 0) {
    similarListHTML.innerHTML = `
      <div class="no-similar">
        <p style="text-align: center; font-style: italic; color: #777; font-size:20px">No similar product found.</p>
      </div>
    `;
    return;
  }
}; 
// Optional: Enable Add to Cart for similar section
document.querySelector(".similar-products").addEventListener("click", (event) => {
  if (event.target.classList.contains("addCart")) {
    const productId = event.target.closest(".item").dataset.id;
    window.addToCart(productId);
  }
});
// ✅ similar product rendering end here ========

// for similar-list section's opacity fade in - fade out animation set start here 
document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".similar-list");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Optional: stop observing after animation
      }
    });
  }, {
    threshold: 0.05 // Adjust based on how much of the element should be visible
    // rootMargin: "0px 0px -100px 0px"
  });

  observer.observe(target);
});
// for similar-list section's opacity fade in - fade out animation set end here 

// Full Screen Image section start here ===========
function openFullscreen(imgElement) {
  const viewer = document.getElementById("fullscreenViewer");
  const fullImg = document.getElementById("fullscreenImage");
  fullImg.src = imgElement.src;
  viewer.style.display = "flex";
}

function closeFullscreen() {
  document.getElementById("fullscreenViewer").style.display = "none";
}
document.getElementById("main-img").addEventListener("click", function () {
  openFullscreen(this);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeFullscreen();
  }
});
// Full Screen Image section end here ============