// // app.js
// const listProductHTML = document.querySelector(".listProduct");
// const newProductListHTML = document.querySelector(".newProductList");
// const showMoreBtn = document.querySelector(".showMoreBtn");

// let products = [];
// let displayedProductsCount = 0;
// const productsToShowInitially = 10;
// const productsPerLoad = 10;

// // Reusable render function
// const addDataToHTML = (productsToDisplay, append = false, targetContainer = listProductHTML) => {
//   if (!targetContainer) return;
//   if (!append) targetContainer.innerHTML = "";

//   productsToDisplay.forEach(product => {
//     const newProduct = document.createElement("div");
//     newProduct.classList.add("item");
//     newProduct.dataset.id = product.id;

//     const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;

//     newProduct.innerHTML = `
//       <a href="detail.html?id=${product.id}" style="text-decoration: none; color: black;">
//         <img src="${firstImage}" alt="${product.name}">
//         <h3>${product.name}</h3>
//         <div class="price">$${product.price}</div>
//       </a>
//       <button class="addCart">Add To Cart</button>
//     `;
//     targetContainer.appendChild(newProduct);
//   });
// };

// // Load more products for main section
// const loadMoreProducts = () => {
//   const productsToLoad = products.slice(displayedProductsCount, displayedProductsCount + productsPerLoad);
//   addDataToHTML(productsToLoad, true, listProductHTML);
//   displayedProductsCount += productsToLoad.length;

//   if (displayedProductsCount >= products.length && showMoreBtn) {
//     showMoreBtn.style.display = "none";
//   }
// };

// // Add to cart listener
// if (listProductHTML || newProductListHTML) {
//   document.addEventListener("click", (event) => {
//     if (event.target.classList.contains("addCart")) {
//       const product_id = event.target.closest(".item").dataset.id;
//       window.addToCart(product_id);
//     }
//   });
// }

// // Show more button listener
// if (showMoreBtn) {
//   showMoreBtn.addEventListener("click", loadMoreProducts);
// }

// // Search function
// const searchProducts = (query) => {
//   fetch("products.json")
//     .then(res => res.json())
//     .then(data => {
//       const lowerCaseQuery = query.toLowerCase();
//       const threshold = 1;

//       const filteredProducts = data.filter(product => {
//         const propertiesToCheck = [product.name, product.description, product.category, product.type];
//         return propertiesToCheck.some(prop => {
//           if (!prop) return false;
//           return levenshteinDistance(prop.toLowerCase(), lowerCaseQuery) <= threshold;
//         });
//       });

//       if (showMoreBtn) showMoreBtn.style.display = "none";
//       addDataToHTML(filteredProducts, false, listProductHTML);
//     });
// };

// // Init app
// const initApp = () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const searchQuery = urlParams.get('q');

//   fetch("products.json")
//     .then(res => res.json())
//     .then(data => {
//       products = data;

//       if (searchQuery) {
//         searchProducts(searchQuery);
//       } else {
//         const initialProducts = products.slice(0, productsToShowInitially);
//         addDataToHTML(initialProducts, false, listProductHTML);
//         displayedProductsCount = initialProducts.length;

//         if (showMoreBtn) {
//           showMoreBtn.style.display = displayedProductsCount >= products.length ? "none" : "block";
//         }
//       }

//       // Render last 15 products as new products
//       const lastProducts = products.slice(-15).reverse();
//       addDataToHTML(lastProducts, false, newProductListHTML);
//     });
// };

// initApp();

// // Levenshtein distance function
// const levenshteinDistance = (str1, str2) => {
//   const m = str1.length;
//   const n = str2.length;
//   const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(null));

//   for (let i = 0; i <= m; i++) dp[i][0] = i;
//   for (let j = 0; j <= n; j++) dp[0][j] = j;

//   for (let i = 1; i <= m; i++) {
//     for (let j = 1; j <= n; j++) {
//       const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
//       dp[i][j] = Math.min(
//         dp[i - 1][j] + 1,
//         dp[i][j - 1] + 1,
//         dp[i - 1][j - 1] + cost
//       );
//     }
//   }

//   return dp[m][n];
// };

// // New product animation
// document.addEventListener("DOMContentLoaded", () => {
//   const target = document.querySelector(".newProductList");
//   if (!target) return;

//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("visible");
//         observer.unobserve(entry.target);
//       }
//     });
//   }, {
//     threshold: 0.05
//   });

//   observer.observe(target);
// });

// // Leaflet animation
// document.addEventListener("DOMContentLoaded", () => {
//   const target = document.querySelector(".leaflets");
//   if (!target) return;

//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("visible");
//         observer.unobserve(entry.target);
//       }
//     });
//   }, {
//     threshold: 0.05
//   });

//   observer.observe(target);
// });

//   // Show popup when homepage loads
//   window.addEventListener('load', () => {
//     const popup = 
//     document.getElementById('overlayOffer').style.display = 'flex';
//   });

//   // Close popup and remove overlay
//   function closePopupOffer() {
//     document.getElementById('overlayOffer').style.display = 'none';
//   }

//================================================================
// app.js
// const listProductHTML = document.querySelector(".listProduct");
// const newProductListHTML = document.querySelector(".newProductList");
// const showMoreBtn = document.querySelector(".showMoreBtn");

// let products = [];
// let displayedProductsCount = 0;
// const productsToShowInitially = 10;
// const productsPerLoad = 10;

// // Reusable render function
// const addDataToHTML = (productsToDisplay, append = false, targetContainer = listProductHTML) => {
//   if (!targetContainer) return;
//   if (!append) targetContainer.innerHTML = "";

//   // Reverse the product list before rendering
//   const reversedProducts = [...productsToDisplay].reverse();

//   reversedProducts.forEach(product => {
//     const newProduct = document.createElement("div");
//     newProduct.classList.add("item");
//     newProduct.dataset.id = product.id;

//     const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;

//     newProduct.innerHTML = `
//       <a href="detail.html?id=${product.id}" style="text-decoration: none; color: black;">
//         <img src="${firstImage}" alt="${product.name}">
//         <h3>${product.name}</h3>
//         <div class="price">$${product.price}</div>
//       </a>
//       <button class="addCart">Add To Cart</button>
//     `;
//     targetContainer.appendChild(newProduct);
//   });
// };

// // Load more products for main section
// const loadMoreProducts = () => {
//   const productsToLoad = products.slice(displayedProductsCount, displayedProductsCount + productsPerLoad);
//   addDataToHTML(productsToLoad, true, listProductHTML);
//   displayedProductsCount += productsToLoad.length;

//   if (displayedProductsCount >= products.length && showMoreBtn) {
//     showMoreBtn.style.display = "none";
//   }
// };

// // Add to cart listener
// if (listProductHTML || newProductListHTML) {
//   document.addEventListener("click", (event) => {
//     if (event.target.classList.contains("addCart")) {
//       const product_id = event.target.closest(".item").dataset.id;
//       window.addToCart(product_id);
//     }
//   });
// }

// // Show more button listener
// if (showMoreBtn) {
//   showMoreBtn.addEventListener("click", loadMoreProducts);
// }

// // Search function
// const searchProducts = (query) => {
//   fetch("products.json")
//     .then(res => res.json())
//     .then(data => {
//       const lowerCaseQuery = query.toLowerCase();
//       const threshold = 1;

//       const filteredProducts = data.filter(product => {
//         const propertiesToCheck = [product.name, product.description, product.category, product.type];
//         return propertiesToCheck.some(prop => {
//           if (!prop) return false;
//           return levenshteinDistance(prop.toLowerCase(), lowerCaseQuery) <= threshold;
//         });
//       });

//       if (showMoreBtn) showMoreBtn.style.display = "none";
//       addDataToHTML(filteredProducts, false, listProductHTML);
//     });
// };

// // Init app
// const initApp = () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const searchQuery = urlParams.get('q');

//   fetch("products.json")
//     .then(res => res.json())
//     .then(data => {
//       products = data;

//       if (searchQuery) {
//         searchProducts(searchQuery);
//       } else {
//         const initialProducts = products.slice(0, productsToShowInitially);
//         addDataToHTML(initialProducts, false, listProductHTML);
//         displayedProductsCount = initialProducts.length;

//         if (showMoreBtn) {
//           showMoreBtn.style.display = displayedProductsCount >= products.length ? "none" : "block";
//         }
//       }

//       // Render last 15 products as new products (already reversed)
//       const lastProducts = products.slice(-15);
//       addDataToHTML(lastProducts, false, newProductListHTML);
//     });
// };

// initApp();

// // Levenshtein distance function
// const levenshteinDistance = (str1, str2) => {
//   const m = str1.length;
//   const n = str2.length;
//   const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(null));

//   for (let i = 0; i <= m; i++) dp[i][0] = i;
//   for (let j = 0; j <= n; j++) dp[0][j] = j;

//   for (let i = 1; i <= m; i++) {
//     for (let j = 1; j <= n; j++) {
//       const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
//       dp[i][j] = Math.min(
//         dp[i - 1][j] + 1,
//         dp[i][j - 1] + 1,
//         dp[i - 1][j - 1] + cost
//       );
//     }
//   }

//   return dp[m][n];
// };

// // New product animation
// document.addEventListener("DOMContentLoaded", () => {
//   const target = document.querySelector(".newProductList");
//   if (!target) return;

//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("visible");
//         observer.unobserve(entry.target);
//       }
//     });
//   }, {
//     threshold: 0.05
//   });

//   observer.observe(target);
// });

// // Leaflet animation
// document.addEventListener("DOMContentLoaded", () => {
//   const target = document.querySelector(".leaflets");
//   if (!target) return;

//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("visible");
//         observer.unobserve(entry.target);
//       }
//     });
//   }, {
//     threshold: 0.05
//   });

//   observer.observe(target);
// });

// // Show popup when homepage loads
// window.addEventListener('load', () => {
//   document.getElementById('overlayOffer').style.display = 'flex';
// });

// // Close popup and remove overlay
// function closePopupOffer() {
//   document.getElementById('overlayOffer').style.display = 'none';
// }


///==========================================================

// // app.js
// const listProductHTML = document.querySelector(".listProduct");
// const newProductListHTML = document.querySelector(".newProductList");
// const showMoreBtn = document.querySelector(".showMoreBtn");

// let products = [];
// let displayedProductsCount = 0;
// const productsToShowInitially = 10;
// const productsPerLoad = 10;

// // Reusable render function
// const addDataToHTML = (productsToDisplay, append = false, targetContainer = listProductHTML) => {
//   if (!targetContainer) return;
//   if (!append) targetContainer.innerHTML = "";

//   // Reverse before rendering
//   const reversedProducts = [...productsToDisplay].reverse();

//   reversedProducts.forEach(product => {
//     const newProduct = document.createElement("div");
//     newProduct.classList.add("item");
//     newProduct.dataset.id = product.id;

//     const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;

//     newProduct.innerHTML = `
//       <a href="detail.html?id=${product.id}" style="text-decoration: none; color: black;">
//         <img src="${firstImage}" alt="${product.name}">
//         <h3>${product.name}</h3>
//         <div class="price">$${product.price}</div>
//       </a>
//       <button class="addCart">Add To Cart</button>
//     `;
//     targetContainer.appendChild(newProduct);
//   });
// };

// // Load more products for main section
// const loadMoreProducts = () => {
//   const reversedAllProducts = [...products].reverse();
//   const productsToLoad = reversedAllProducts.slice(displayedProductsCount, displayedProductsCount + productsPerLoad);
//   addDataToHTML(productsToLoad, true, listProductHTML);
//   displayedProductsCount += productsToLoad.length;

//   if (displayedProductsCount >= products.length && showMoreBtn) {
//     showMoreBtn.style.display = "none";
//   }
// };

// // Add to cart listener
// if (listProductHTML || newProductListHTML) {
//   document.addEventListener("click", (event) => {
//     if (event.target.classList.contains("addCart")) {
//       const product_id = event.target.closest(".item").dataset.id;
//       window.addToCart(product_id);
//     }
//   });
// }

// // Show more button listener
// if (showMoreBtn) {
//   showMoreBtn.addEventListener("click", loadMoreProducts);
// }

// // Search function
// const searchProducts = (query) => {
//   fetch("products.json")
//     .then(res => res.json())
//     .then(data => {
//       const lowerCaseQuery = query.toLowerCase();
//       const threshold = 1;

//       const filteredProducts = data.filter(product => {
//         const propertiesToCheck = [product.name, product.description, product.category, product.type];
//         return propertiesToCheck.some(prop => {
//           if (!prop) return false;
//           return levenshteinDistance(prop.toLowerCase(), lowerCaseQuery) <= threshold;
//         });
//       });

//       if (showMoreBtn) showMoreBtn.style.display = "none";
//       addDataToHTML(filteredProducts, false, listProductHTML);
//     });
// };

// // Init app
// const initApp = () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const searchQuery = urlParams.get('q');

//   fetch("products.json")
//     .then(res => res.json())
//     .then(data => {
//       products = data;

//       if (searchQuery) {
//         searchProducts(searchQuery);
//       } else {
//         const reversedAllProducts = [...products].reverse();
//         const initialProducts = reversedAllProducts.slice(0, productsToShowInitially);
//         addDataToHTML(initialProducts, false, listProductHTML);
//         displayedProductsCount = initialProducts.length;

//         if (showMoreBtn) {
//           showMoreBtn.style.display = displayedProductsCount >= products.length ? "none" : "block";
//         }
//       }

//       // Render last 15 products as new products (already reversed)
//       const lastProducts = products.slice(-15).reverse();
//       addDataToHTML(lastProducts, false, newProductListHTML);
//     });
// };

// initApp();

// // Levenshtein distance function
// const levenshteinDistance = (str1, str2) => {
//   const m = str1.length;
//   const n = str2.length;
//   const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(null));

//   for (let i = 0; i <= m; i++) dp[i][0] = i;
//   for (let j = 0; j <= n; j++) dp[0][j] = j;

//   for (let i = 1; i <= m; i++) {
//     for (let j = 1; j <= n; j++) {
//       const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
//       dp[i][j] = Math.min(
//         dp[i - 1][j] + 1,
//         dp[i][j - 1] + 1,
//         dp[i - 1][j - 1] + cost
//       );
//     }
//   }

//   return dp[m][n];
// };

// // New product animation
// document.addEventListener("DOMContentLoaded", () => {
//   const target = document.querySelector(".newProductList");
//   if (!target) return;

//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("visible");
//         observer.unobserve(entry.target);
//       }
//     });
//   }, {
//     threshold: 0.05
//   });

//   observer.observe(target);
// });

// // Leaflet animation
// document.addEventListener("DOMContentLoaded", () => {
//   const target = document.querySelector(".leaflets");
//   if (!target) return;

//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("visible");
//         observer.unobserve(entry.target);
//       }
//     });
//   }, {
//     threshold: 0.05
//   });

//   observer.observe(target);
// });

// // Show popup when homepage loads
// window.addEventListener('load', () => {
//   document.getElementById('overlayOffer').style.display = 'flex';
// });

// // Close popup and remove overlay
// function closePopupOffer() {
//   document.getElementById('overlayOffer').style.display = 'none';
// }


//=============================================================================
// app.js
const listProductHTML = document.querySelector(".listProduct");
const newProductListHTML = document.querySelector(".newProductList");
const showMoreBtn = document.querySelector(".showMoreBtn");

let products = [];
let displayedProductsCount = 0;
const productsToShowInitially = 10;
const productsPerLoad = 10;

// Reusable render function
const addDataToHTML = (productsToDisplay, append = false, targetContainer = listProductHTML) => {
  if (!targetContainer) return;
  if (!append) targetContainer.innerHTML = "";

  productsToDisplay.forEach(product => {
    const newProduct = document.createElement("div");
    newProduct.classList.add("item");
    newProduct.dataset.id = product.id;

    const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;

    newProduct.innerHTML = `
      <a href="detail.html?id=${product.id}" style="text-decoration: none; color: black;">
        <img src="${firstImage}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price">$${product.price}</div>
      </a>
      <button class="addCart">Add To Cart</button>
    `;
    targetContainer.appendChild(newProduct);
  });
};

// Load more products for main section
const loadMoreProducts = () => {
  const reversedProducts = [...products].reverse();
  const productsToLoad = reversedProducts.slice(displayedProductsCount, displayedProductsCount + productsPerLoad);
  addDataToHTML(productsToLoad, true, listProductHTML);
  displayedProductsCount += productsToLoad.length;

  if (displayedProductsCount >= products.length && showMoreBtn) {
    showMoreBtn.style.display = "none";
  }
};

// Add to cart listener
if (listProductHTML || newProductListHTML) {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("addCart")) {
      const product_id = event.target.closest(".item").dataset.id;
      window.addToCart(product_id);
    }
  });
}

// Show more button listener
if (showMoreBtn) {
  showMoreBtn.addEventListener("click", loadMoreProducts);
}

// Search function
const searchProducts = (query) => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      const lowerCaseQuery = query.toLowerCase();
      const threshold = 1;

      const filteredProducts = data.filter(product => {
        const propertiesToCheck = [product.name, product.description, product.category, product.type];
        return propertiesToCheck.some(prop => {
          if (!prop) return false;
          return levenshteinDistance(prop.toLowerCase(), lowerCaseQuery) <= threshold;
        });
      });

      if (showMoreBtn) showMoreBtn.style.display = "none";
      addDataToHTML(filteredProducts.reverse(), false, listProductHTML); // Reverse search results
    });
};

// Init app
const initApp = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q');

  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      products = data;

      const reversedProducts = [...products].reverse();

      if (searchQuery) {
        searchProducts(searchQuery);
      } else {
        const initialProducts = reversedProducts.slice(0, productsToShowInitially);
        addDataToHTML(initialProducts, false, listProductHTML);
        displayedProductsCount = initialProducts.length;

        if (showMoreBtn) {
          showMoreBtn.style.display = displayedProductsCount >= products.length ? "none" : "block";
        }
      }

      // Render last 15 products as new products
      const lastProducts = products.slice(-15).reverse();
      addDataToHTML(lastProducts, false, newProductListHTML);
    });
};

initApp();

// Levenshtein distance function
const levenshteinDistance = (str1, str2) => {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(null));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[m][n];
};

// New product animation
document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".newProductList");
  if (!target) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05
  });

  observer.observe(target);
});

// Leaflet animation
document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".leaflets");
  if (!target) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05
  });

  observer.observe(target);
});

// Show popup when homepage loads
window.addEventListener('load', () => {
  document.getElementById('overlayOffer').style.display = 'flex';
});

// Close popup and remove overlay
function closePopupOffer() {
  document.getElementById('overlayOffer').style.display = 'none';
}

