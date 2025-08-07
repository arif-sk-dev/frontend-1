  const acc = document.getElementsByClassName("accordion");

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      // First, close all other panels
      for (let j = 0; j < acc.length; j++) {
        const panel = acc[j].nextElementSibling;
        if (acc[j] !== this) {
          acc[j].classList.remove("active");
          panel.style.display = "none";
        }
      }

      // Then toggle the clicked panel
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
