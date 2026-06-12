const generateButton = document.getElementById('generate-btn');
const palleteContainer = document.querySelector(".palette-container");

let lockedArray = new Array(5).fill(false);
let colors = new Array(5).fill('');

generatePallete();

generateButton.addEventListener("click", generatePallete);
palleteContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy-btn")) {
    const hexValue = e.target.previousElementSibling.textContent;

    navigator.clipboard.writeText(hexValue)
    .then(() => showCopySuccess(e.target))
    .catch((err) => console.log(err))
  } else if (e.target.classList.contains("color")) {
    const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;

    navigator.clipboard.writeText(hexValue)
    .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
    .catch((err) => console.log(err))
  } else if (e.target.classList.contains("lock-btn")) {
    lockColor(e.target);
  }
})

function lockColor(element) {
  clickedBox = element.closest(".color-box");
  allBoxes = document.querySelectorAll(".color-box");

  allBoxesArray = Array.from(allBoxes);

  let index = allBoxesArray.indexOf(clickedBox);
  if (element.classList.contains("fa-lock-open")) {
    element.classList.remove("fas", "fa-lock-open");
    element.classList.add("fas", "fa-lock")
    element.title = "Unlock"

    lockedArray[index] = true;
  } else if (element.classList.contains("fa-lock")) {
    element.classList.remove("fas", "fa-lock")
    element.classList.add("fas", "fa-lock-open");
    element.title = "Lock"

    lockedArray[index] = false;
  } else {
    console.log("Error")
  }
}

function showCopySuccess(element) {
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");

  element.style.color = "#48bb78"

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "";
  }, 2000);
}

function generatePallete() {
  for (let i = 0; i<5; i++) {
    if (lockedArray[i] === true) {
      continue;
    } else {
      colors[i] = generateRandomColor();
    }
  }

  updatePalleteDisplay(colors);
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#"

  for (let i = 0; i<6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function updatePalleteDisplay(colors) {
  const colorBoxes = document.querySelectorAll(".color-box");

  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-value");

    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;
  });
}