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
            const filteredProducts = data.filter(product => {
                const lowerCaseQuery = query.toLowerCase();
                
                // Add checks for each property to ensure it's not undefined
                const nameMatch = product.name?.toLowerCase().includes(lowerCaseQuery) || false;
                const descriptionMatch = product.description?.toLowerCase().includes(lowerCaseQuery) || false;
                const categoryMatch = product.category?.toLowerCase().includes(lowerCaseQuery) || false;
                const typeMatch = product.type?.toLowerCase().includes(lowerCaseQuery) || false;

                return nameMatch || descriptionMatch || categoryMatch || typeMatch;
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