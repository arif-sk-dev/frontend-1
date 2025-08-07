// Form input validation start here 
document.getElementById('order-form').addEventListener('submit', function(e) {
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;

    const mobileValid = /^\d{11}$/;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!mobileValid.test(mobile)) {
      alert('Invalid mobile number! Please enter 11 digits only.');
      e.preventDefault();
    }

    if (!emailValid.test(email)) {
      alert('Invalid email format!');
      e.preventDefault();
    }
  });
// Form input validation end here ========

//checkout.js
const checkoutContainer = document.getElementById("checkout-items");
const totalAmount = document.getElementById("total-amount");

const renderCheckout = () => {
  checkoutContainer.innerHTML = "";
  let total = 0;

  carts.forEach(cart => {
    const product = listProducts.find(p => p.id == cart.product_id);
    if (!product) return;

    const itemTotal = product.price * cart.quantity;
    total += itemTotal;

    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
      <div>${product.name} x ${cart.quantity}</div>
      <div>$${itemTotal.toFixed(2)}</div>
    `;
    checkoutContainer.appendChild(item);
  });

  totalAmount.innerText = total.toFixed(2);
};

document.getElementById("order-form").addEventListener("submit", e => {
  e.preventDefault();
  alert("✅ Order submitted successfully!");
  carts = [];
  localStorage.setItem("cart", JSON.stringify(carts));
  renderCheckout();
});

// Wait for global cart to load 
setTimeout(() => {
  renderCheckout();
}, 450);
