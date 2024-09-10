document.addEventListener("DOMContentLoaded", () => {
  const closeBtns = document.querySelectorAll(".close-btn");
  const submitBtns = document.querySelectorAll(".submit-btn");

  // Close button functionality
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".Main").style.display = "none";
    });
  });

  // Submit button animation
  submitBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.style.transform = "scale(0.95)";
      setTimeout(() => {
        btn.style.transform = "scale(1)";
      }, 100);
    });
  });

  // Simple form validation
  const inputs = document.querySelectorAll(".input-field");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim() === "") {
        input.style.boxShadow = "0 0 5px red";
      } else {
        input.style.boxShadow = "0 0 5px green";
      }
    });
  });
});
