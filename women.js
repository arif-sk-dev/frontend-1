
const listProductHTML = document.querySelector(".listProduct");
const showMoreBtn = document.querySelector(".showMoreBtn");

let allProducts = []; // Store all products from the JSON file
let currentProducts = []; // Store the currently filtered products to display
let displayedProductsCount = 0;
const productsPerLoad = 8; // Number of products to load each time

// Function to display products
const addDataToHTML = (productsToDisplay, append = false) => {
    if (!append) {
        listProductHTML.innerHTML = ""; // Clear current content
        displayedProductsCount = 0;
    }

    const productsChunk = productsToDisplay.slice(displayedProductsCount, displayedProductsCount + productsPerLoad);

    productsChunk.forEach(product => {
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

    displayedProductsCount += productsChunk.length;

    // Hide/show the "Show More" button based on whether all products are displayed
    if (displayedProductsCount >= productsToDisplay.length) {
        showMoreBtn.style.display = "none";
    } else {
        showMoreBtn.style.display = "block";
    }

    // If no products found
    if (productsChunk.length === 0) {
        listProductHTML.innerHTML = `
          <div class="no-product">
            <p style="text-align: center; font-style: italic; color: #777; font-size:24px">No product found.</p>
          </div>
        `;
        return;
    }
};

// Add to cart via delegation
listProductHTML.addEventListener("click", (event) => {
    if (event.target.classList.contains("addCart")) {
        const product_id = event.target.closest(".item").dataset.id;
        window.addToCart(product_id); // Global cart function from header.html
    }
});

// Event listener for the "Show More" button
showMoreBtn.addEventListener("click", () => {
    addDataToHTML(currentProducts, true);
});

// Initialize and load women products only
const initApp = () => {
    fetch("products.json")
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            const womenProducts = allProducts.filter(product => product.category === "women");
            const reversedWomenProducts = [...womenProducts].reverse(); // Reverse for newest first
            currentProducts = reversedWomenProducts;
            addDataToHTML(reversedWomenProducts);
        });
};
initApp();

// Get women product all item count
fetch("products.json")
    .then(res => res.json())
    .then(data => {
        const womenProducts = data.filter(product => product.category === "women");
        const womenItemCount = womenProducts.length;
        const allItemElement = document.getElementById("allItem");
        if (allItemElement) {
             allItemElement.innerHTML = `Women all Product: ${womenItemCount} items`;
        }
        const womenAllItemsElement = document.getElementById("women-all-items");
        if (womenAllItemsElement) {
             womenAllItemsElement.innerHTML = `${womenItemCount}`;
        }
    });

// Count specific types within women products
fetch("products.json")
    .then(res => res.json())
    .then(data => {
        const womenProducts = data.filter(product => product.category === "women");

        const types = ["top", "bottom", "shari", "kaftan", "gown", "maxi", "bodycon", "scarves", "shoe"];

        types.forEach(type => {
            const count = womenProducts.filter(product => product.type === type).length;
            const countElement = document.getElementById(`${type}Count`);
            if (countElement) {
                countElement.innerHTML = `${count}`;
            }
        });

        const otherCount = womenProducts.filter(product => !types.includes(product.type)).length;
        const otherCountElement = document.getElementById("otherCount");
        if (otherCountElement) {
            otherCountElement.innerHTML = `${otherCount}`;
        }
    });

// Sidebar link's counted product show/execute
document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const selectedType = event.target.dataset.type;

        if (selectedType === "womenAllItems") {
            showAllWomenProducts();
        } else {
            filterWomenProductsByType(selectedType);
        }
    });
});

// Show all women products
const showAllWomenProducts = () => {
    const womenProducts = allProducts.filter(product => product.category === "women");
    const reversed = [...womenProducts].reverse();
    currentProducts = reversed;
    addDataToHTML(reversed);
};

// Filter women products by type
const filterWomenProductsByType = (type) => {
    const types = ["top", "bottom", "shari", "kaftan", "gown", "maxi", "bodycon", "scarves", "shoe"];
    
    const filteredProducts = allProducts.filter(product =>
        product.category === "women" && (
            type === "other"
                ? !types.includes(product.type)
                : product.type === type
        )
    );
    const reversed = [...filteredProducts].reverse();
    currentProducts = reversed;
    addDataToHTML(reversed);
};