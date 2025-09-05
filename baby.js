// baby.js
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

// Load baby products initially
const initApp = () => {
    fetch("products.json")
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            const babyProducts = allProducts.filter(product => product.category === "baby");
            const reversedBabyProducts = [...babyProducts].reverse(); // Reverse for newest first
            currentProducts = reversedBabyProducts;
            addDataToHTML(reversedBabyProducts);
        });
};
initApp();

// ====== Baby product counts ======
fetch("products.json")
    .then(res => res.json())
    .then(data => {
        const babyProducts = data.filter(product => product.category === "baby");

        // Total baby product count
        const babyItemCount = babyProducts.length;
        document.getElementById("allItem").innerHTML = `Baby all Product: ${babyItemCount} items`;
        const babyAllItemsElement = document.getElementById("baby-all-items");
        if (babyAllItemsElement) {
            babyAllItemsElement.innerHTML = babyItemCount;
        }

        // Types to count
        const types = [
            "shirt", "pant", "tshirt", "bodysuits", "leggings",
            "frocks", "scarves", "pajama", "shoe"
        ];

        // Count each type dynamically
        types.forEach(type => {
            const count = babyProducts.filter(product => product.type === type).length;
            const countElement = document.getElementById(`${type}Count`);
            if (countElement) {
                countElement.innerHTML = count;
            }
        });

        // Count "other" types
        const otherCount = babyProducts.filter(product => !types.includes(product.type)).length;
        const otherCountElement = document.getElementById("otherCount");
        if (otherCountElement) {
            otherCountElement.innerHTML = otherCount;
        }
    });

// ====== Sidebar category filtering ======
document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const selectedType = event.target.dataset.type;

        if (selectedType === "babyAllItems") {
            showAllBabyProducts();
        } else {
            filterBabyProductsByType(selectedType);
        }
    });
});

// Show all baby products
const showAllBabyProducts = () => {
    const babyProducts = allProducts.filter(product => product.category === "baby");
    const reversed = [...babyProducts].reverse();
    currentProducts = reversed;
    addDataToHTML(reversed);
};

// Filter baby products by type
const filterBabyProductsByType = (type) => {
    const types = [
        "shirt", "pant", "tshirt", "bodysuits", "leggings", "frocks", "scarves", "pajama", "shoe"
    ];

    const filteredProducts = allProducts.filter(product =>
        product.category === "baby" &&
        (type === "other" ? !types.includes(product.type) : product.type === type)
    );

    const reversed = [...filteredProducts].reverse();
    currentProducts = reversed;
    addDataToHTML(reversed);
};