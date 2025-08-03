const deleteButtons = document.querySelectorAll(".delete");
const advanceDiv = document.querySelector(".advance-container");
const contentFile = document.querySelector(".file");

// Delete buttons
deleteButtons.forEach((button) => {
  button.addEventListener("click", function () {
    this.closest(".file").remove();
  });
});

// Advance div
contentFile.addEventListener("click", function () {
  this.classList.toggle("active");
  advanceDiv.classList.toggle("active");

  if (advanceDiv.classList.contains("active")) {
    advanceDiv.style.display = "flex";
  } else {
    advanceDiv.style.display = "none";
  }
});
