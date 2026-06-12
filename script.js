const generateButton = document.getElementById('generate-btn');
const palleteContainer = document.querySelector(".palette-container");

generatePallete();

generateButton.addEventListener("click", generatePallete);
palleteContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy-btn")) {
    const hexValue = e.target.previousElementSibling.textContent;

    navigator.clipboard.writeText(hexValue).catch((err) => console.log(err))
  }
})

function generatePallete() {
  const colors = []

  for (let i = 0; i<5; i++) {
    colors.push(generateRandomColor())
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