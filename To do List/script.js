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
    contentFile.style.height = "60%";
    advanceDiv.classList.toggle("deactive");
  } else {
    contentFile.style.height = "72px";
  }
});
