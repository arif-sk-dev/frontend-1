// // product.js
// const listProductHTML = document.querySelector(".listProduct");

// const addDataToHTML = (products) => {
//   listProductHTML.innerHTML = "";
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

// listProductHTML.addEventListener("click", (event) => {
//   if (event.target.classList.contains("addCart")) {
//     const product_id = event.target.closest(".item").dataset.id;
//     window.addToCart(product_id);
//   }
// });

// const initApp = () => {
//   fetch("products.json")
//     .then(res => res.json())
//     .then(data => {
//       addDataToHTML(data);
//     });
// };

// initApp();


// add show more button code with previous code
const listProductHTML = document.querySelector(".listProduct");
const showMoreBtn = document.querySelector(".showMoreBtn");

let products = [];
let displayedProductsCount = 0;
const productsToShowInitially = 10; 
const productsPerLoad = 8; 

const addDataToHTML = (productsToDisplay, append = false) => {
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

    if (displayedProductsCount >= products.length) {
        showMoreBtn.style.display = "none";
    }
};

listProductHTML.addEventListener("click", (event) => {
    if (event.target.classList.contains("addCart")) {
        const product_id = event.target.closest(".item").dataset.id;
        window.addToCart(product_id);
    }
});

showMoreBtn.addEventListener("click", loadMoreProducts);

const initApp = () => {
    fetch("products.json")
        .then(res => res.json())
        .then(data => {
            products = data; 
            const initialProducts = products.slice(0, productsToShowInitially);
            addDataToHTML(initialProducts);
            displayedProductsCount = initialProducts.length;
            
            if (displayedProductsCount >= products.length) {
                showMoreBtn.style.display = "none";
            }
        });
};

initApp();