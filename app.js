// app.js
const listProductHTML = document.querySelector(".listProduct");
const showMoreBtn = document.querySelector(".showMoreBtn");

let products = [];
let displayedProductsCount = 0;
const productsToShowInitially = 10;
const productsPerLoad = 10;

const addDataToHTML = (productsToDisplay, append = false) => {
    // Check if the listProductHTML element exists before trying to manipulate it
    if (!listProductHTML) {
        return;
    }

    if (!append) {
        listProductHTML.innerHTML = "";
    }

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
        listProductHTML.appendChild(newProduct);
    });
};

const loadMoreProducts = () => {
    const productsToLoad = products.slice(displayedProductsCount, displayedProductsCount + productsPerLoad);
    addDataToHTML(productsToLoad, true);
    displayedProductsCount += productsToLoad.length;

    if (displayedProductsCount >= products.length && showMoreBtn) {
        showMoreBtn.style.display = "none";
    }
};

if (listProductHTML) {
    listProductHTML.addEventListener("click", (event) => {
        if (event.target.classList.contains("addCart")) {
            const product_id = event.target.closest(".item").dataset.id;
            window.addToCart(product_id);
        }
    });
}

// Add an existence check for the showMoreBtn
if (showMoreBtn) {
    showMoreBtn.addEventListener("click", loadMoreProducts);
}

// Search button function start
const searchProducts = (query) => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      const lowerCaseQuery = query.toLowerCase();
      // Define a threshold for how many mistakes (edits) are allowed.
      // For short words, 1 is a good value.
      const threshold = 1; 

      const filteredProducts = data.filter(product => {
        // Create an array of properties to check
        const propertiesToCheck = [
          product.name,
          product.description,
          product.category,
          product.type
        ];

        // Check if any of the properties are a "fuzzy match"
        return propertiesToCheck.some(prop => {
          if (!prop) return false; // Skip if the property is undefined

          // Calculate the distance and see if it's within the threshold
          return levenshteinDistance(prop.toLowerCase(), lowerCaseQuery) <= threshold;
        });
      });

      // Hide the 'Show More' button if search results are displayed
      if (showMoreBtn) {
        showMoreBtn.style.display = "none";
      }

      addDataToHTML(filteredProducts);
    });
};


const initApp = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q'); //Search function added to initApp() section

    if (searchQuery) {
        searchProducts(searchQuery);
    } else {
        fetch("products.json")
            .then(res => res.json())
            .then(data => {
                products = data;
                const initialProducts = products.slice(0, productsToShowInitially);
                addDataToHTML(initialProducts);
                displayedProductsCount = initialProducts.length;

                if (showMoreBtn) {
                    if (displayedProductsCount >= products.length) {
                        showMoreBtn.style.display = "none";
                    } else {
                        showMoreBtn.style.display = "block";
                    }
                }
            });
    }
};

initApp();

// Function to calculate Levenshtein distance [search field's]
// If client wrong type in the searchbar then execute product smoothly
const levenshteinDistance = (str1, str2) => {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(null));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // Deletion character
        dp[i][j - 1] + 1,      // Insertion character
        dp[i - 1][j - 1] + cost // Substitution character as a word
      );
    }
  }

  return dp[m][n];
};


// for Leaflet section's opacity fade in - fade out animation set start here 
document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".leaflets");

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