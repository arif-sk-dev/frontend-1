// // ====== Get the product list container ======
// const listProductHTML = document.querySelector(".listProduct");

// // ====== Function to display products in HTML ======
// const addDataToHTML = (products) => {
//   listProductHTML.innerHTML = ""; // Clear existing content

//   products.forEach(product => {
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
//     listProductHTML.appendChild(newProduct);
//   });
// };

// // ====== Enable Add To Cart logic ======
// listProductHTML.addEventListener("click", (event) => {
//   if (event.target.classList.contains("addCart")) {
//     const product_id = event.target.closest(".item").dataset.id;
//     window.addToCart(product_id); // Global cart logic from header.html
//   }
// });

// // ====== Types to track ======
// const menTypes = [
//   "shirt", "pant", "tshirt", "polo", "hoodie",
//   "joggers", "blazer", "tie", "trousers", "jacket",
//   "overcoat", "raincoat", "shoe"
// ];

// // ====== Load all men products initially ======
// const initApp = () => {
//   fetch("products.json")
//     .then(res => res.json())
//     .then(data => {
//       const menProducts = data.filter(product => product.category === "men");
//       addDataToHTML(menProducts);
//     });
// };
// initApp();

// // ====== Count and display men products ======
// fetch("products.json")
//   .then(res => res.json())
//   .then(data => {
//     const menProducts = data.filter(product => product.category === "men");

//     // All men product count
//     const menItemCount = menProducts.length;
//     document.getElementById("allItem").innerHTML = `Men all Product: ${menItemCount} items`;
//     document.getElementById("men-all-items").innerHTML = menItemCount;

//     // Count each defined type
//     menTypes.forEach(type => {
//       const count = menProducts.filter(product => product.type === type).length;
//       document.getElementById(`${type}Count`).innerHTML = count;
//     });

//     // Count 'other' products
//     const otherCount = menProducts.filter(product => !menTypes.includes(product.type)).length;
//     document.getElementById("otherCount").innerHTML = otherCount;
//   });

// // ====== Sidebar category filtering ======
// document.querySelectorAll('.sidebar-link').forEach(link => {
//   link.addEventListener('click', (event) => {
//     event.preventDefault();
//     const selectedType = event.target.dataset.type;

//     if (selectedType === "menAllItems") {
//       showAllMenProducts();
//     } else {
//       filterMenProductsByType(selectedType);
//     }
//   });
// });

// // Show all men products
// const showAllMenProducts = () => {
//   fetch("products.json")
//     .then(res => res.json())
//     .then(data => {
//       const menProducts = data.filter(product => product.category === "men");
//       addDataToHTML(menProducts);
//     });
// };

// // Filter men products by type
// const filterMenProductsByType = (type) => {
//   fetch("products.json")
//     .then(res => res.json())
//     .then(data => {
//       const filteredProducts = data.filter(product =>
//         product.category === "men" &&
//         (type === "other" ? !menTypes.includes(product.type) : product.type === type)
//       );
//       addDataToHTML(filteredProducts);
//     });
// };

// After show more button added change that code below
// ====== Get the product list container and the show more button ======
const listProductHTML = document.querySelector(".listProduct");
const showMoreBtn = document.querySelector(".showMoreBtn");

let allProducts = []; // Store all products from the JSON file
let currentProducts = []; // Store the currently filtered men's products
let displayedProductsCount = 0;
const productsPerLoad = 8; // Number of products to load each time

// ====== Function to display products in HTML ======
const addDataToHTML = (productsToDisplay, append = false) => {
    if (!append) {
        listProductHTML.innerHTML = ""; // Clear existing content
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
};

// ====== Enable Add To Cart logic ======
listProductHTML.addEventListener("click", (event) => {
    if (event.target.classList.contains("addCart")) {
        const product_id = event.target.closest(".item").dataset.id;
        window.addToCart(product_id); // Global cart logic from header.html
    }
});

// ====== Event listener for the "Show More" button ======
showMoreBtn.addEventListener("click", () => {
    addDataToHTML(currentProducts, true);
});

// ====== Types to track ======
const menTypes = [
    "shirt", "pant", "tshirt", "polo", "hoodie",
    "joggers", "blazer", "tie", "trousers", "jacket",
    "overcoat", "raincoat", "shoe"
];

// ====== Load all men products initially ======
const initApp = () => {
    fetch("products.json")
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            const menProducts = allProducts.filter(product => product.category === "men");
            currentProducts = menProducts;
            addDataToHTML(menProducts);
        });
};
initApp();

// ====== Count and display men products ======
fetch("products.json")
    .then(res => res.json())
    .then(data => {
        const menProducts = data.filter(product => product.category === "men");
        
        const menItemCount = menProducts.length;
        document.getElementById("allItem").innerHTML = `Men all Product: ${menItemCount} items`;
        document.getElementById("men-all-items").innerHTML = menItemCount;

        menTypes.forEach(type => {
            const count = menProducts.filter(product => product.type === type).length;
            const countElement = document.getElementById(`${type}Count`);
            if (countElement) {
                 countElement.innerHTML = count;
            }
        });

        const otherCount = menProducts.filter(product => !menTypes.includes(product.type)).length;
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

        if (selectedType === "menAllItems") {
            showAllMenProducts();
        } else {
            filterMenProductsByType(selectedType);
        }
    });
});

// Show all men products
const showAllMenProducts = () => {
    const menProducts = allProducts.filter(product => product.category === "men");
    currentProducts = menProducts;
    addDataToHTML(menProducts);
};

// Filter men products by type
const filterMenProductsByType = (type) => {
    const filteredProducts = allProducts.filter(product =>
        product.category === "men" &&
        (type === "other" ? !menTypes.includes(product.type) : product.type === type)
    );
    currentProducts = filteredProducts;
    addDataToHTML(filteredProducts);
};