
// Get the product list container
const listProductHTML = document.querySelector(".listProduct");

// Define a function to display products in HTML
const addDataToHTML = (products) => {
  listProductHTML.innerHTML = ""; // Clear current content

  products.forEach(product => {
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

// Enable Add To Cart logic by delegating click event
listProductHTML.addEventListener("click", (event) => {
  if (event.target.classList.contains("addCart")) {
    const product_id = event.target.closest(".item").dataset.id;
    window.addToCart(product_id); // Global cart logic from header.html
  }
});

// Initialize and load women products only
const initApp = () => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      const womenProducts = data.filter(product => product.category === "women");
      addDataToHTML(womenProducts);
    });
};
initApp();

// Get women product all item count
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const womenProducts = data.filter(product => product.category === "women");
    const womenItemCount = womenProducts.length;
    document.getElementById("allItem").innerHTML = `Women all Product: ${womenItemCount} items`;
    document.getElementById("women-all-items").innerHTML = `${womenItemCount}`; // for first sidebar
  });

// Count specific types within women products
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    const womenProducts = data.filter(product => product.category === "women");

    const topCount = womenProducts.filter(product => product.type === "top").length;
    const bottomCount = womenProducts.filter(product => product.type === "bottom").length;
    const shariCount = womenProducts.filter(product => product.type === "shari").length;
    const kaftanCount = womenProducts.filter(product => product.type === "kaftan").length;
    const gownCount = womenProducts.filter(product => product.type === "gown").length;
    const maxiCount = womenProducts.filter(product => product.type === "maxi").length;
    const bodyconCount = womenProducts.filter(product => product.type === "bodycon").length;
    const scarvesCount = womenProducts.filter(product => product.type === "scarves").length;
    const shoeCount = womenProducts.filter(product => product.type === "shoe").length;

    const otherCount = womenProducts.filter(product =>
      !["top", "bottom", "shari", "kaftan", "gown", "maxi", "bodycon", "scarves", "shoe"].includes(product.type)
    ).length;

    document.getElementById("topCount").innerHTML = `${topCount}`;
    document.getElementById("bottomCount").innerHTML = `${bottomCount}`;
    document.getElementById("shariCount").innerHTML = `${shariCount}`;
    document.getElementById("kaftanCount").innerHTML = `${kaftanCount}`;
    document.getElementById("gownCount").innerHTML = `${gownCount}`;
    document.getElementById("maxiCount").innerHTML = `${maxiCount}`;
    document.getElementById("bodyconCount").innerHTML = `${bodyconCount}`;
    document.getElementById("scarvesCount").innerHTML = `${scarvesCount}`;
    document.getElementById("shoeCount").innerHTML = `${shoeCount}`;
    document.getElementById("otherCount").innerHTML = `${otherCount}`;
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
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      const womenProducts = data.filter(product => product.category === "women");
      addDataToHTML(womenProducts);
    });
};

// Filter women products by type
const filterWomenProductsByType = (type) => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      const filteredProducts = data.filter(product =>
        product.category === "women" && (
          type === "other"
            ? !["top", "bottom", "shari", "kaftan", "gown", "maxi", "bodycon", "scarves", "shoe"].includes(product.type)
            : product.type === type
        )
      );
      addDataToHTML(filteredProducts);
    });
};
