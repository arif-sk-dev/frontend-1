// contact us page's message submit welcome message 
const form = document.getElementById("form2");
const successMessage =  document.getElementById("success-message");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  if (form.checkValidity()) {
    form.style.display= "none";
    successMessage.style.display = "block";
  }
});