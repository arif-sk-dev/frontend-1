// product.js
const listProductHTML = document.querySelector(".listProduct");

const addDataToHTML = (products) => {
  listProductHTML.innerHTML = "";
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

listProductHTML.addEventListener("click", (event) => {
  if (event.target.classList.contains("addCart")) {
    const product_id = event.target.closest(".item").dataset.id;
    window.addToCart(product_id);
  }
});

const initApp = () => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      addDataToHTML(data);
    });
};

initApp();


//   // ============Slide Show/Banner section start here ===========
// const slides = document.querySelectorAll(".slide");
// const dots = document.querySelectorAll(".dot");
// let currentIndex = 0;
// let intervalId;

// function showSlide(index) {
//   slides.forEach(slide => slide.classList.remove("active"));
//   dots.forEach(dot => dot.classList.remove("active"));
    
//   slides[index].classList.add("active");
//   dots[index].classList.add("active");
// }

// function nextSlide() {
//   currentIndex = (currentIndex + 1) % slides.length;
//   showSlide(currentIndex);
// }

// function startSlideshow() {
//   intervalId = setInterval(nextSlide, 4000); // Change every 3 seconds
// }

// function stopSlideshow() {
//   clearInterval(intervalId);
// }

// function setSlide(index) {
//   stopSlideshow(); // Stop auto-play when manually selected
//   currentIndex = index;
//   showSlide(index);
//   startSlideshow();
// }

// // Start slideshow on page load
// startSlideshow();

// //Url link to all slide individually
//     const slideshowContainer = document.querySelector(".slideshow-container");
//     slideshowContainer.addEventListener('click', () => {
//                 // Get the currently active slide (the one with the 'active' class)
//       const activeSlide = document.querySelector('.slide.active');
//       if (activeSlide) {
//         const url = activeSlide.getAttribute('data-url');
//         if (url) {
//           window.location.href = url; // Navigate to the URL
//         }
//       }
//     });

// // ✅ Show the first slide immediately on page load
// showSlide(currentIndex);
// startSlideshow();

// // Pause on hover
// document.querySelector(".slideshow-container").addEventListener("mouseover", stopSlideshow);
// document.querySelector(".slideshow-container").addEventListener("mouseleave", startSlideshow);
// //==============Slide Show/Banner section end here================
