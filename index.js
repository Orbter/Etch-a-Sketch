const sketcher = document.getElementById("sketcher");
const erase = document.getElementById("erase");
let colorInput = document.getElementById("color-change");
const box = document.querySelector(".painter");
const rainbow = document.getElementById("rainbow");
const colorMode = document.getElementById("color-mode");
const sketcher_size = sketcher.offsetHeight;
let penOn = false;
let currentMode = "color";

CreatBox(16, 16);

rainbow.addEventListener("mousedown", function () {
  currentMode = "rainbow";
});
erase.addEventListener("mousedown", function () {
  currentMode = "erase";
});
colorMode.addEventListener("mousedown", function () {
  currentMode = "color";
});
function TogalMode() {
  switch (currentMode) {
    case "color":
      currentMode = "color";
      break;
    case "rainbow":
      currentMode = "rainbow";
      break;
    case "erase":
      currentMode = "erase";
  }
}

function ChangeColor() {
  switch (currentMode) {
    case "color":
      return colorInput.value;
    case "rainbow":
      return rainbowColor();
    case "erase":
      return "#a19f9f";
  }
}
function rainbowColor() {
  // Generate random values for red, green, and blue components
  const randomRed = Math.floor(Math.random() * 256);
  const randomGreen = Math.floor(Math.random() * 256);
  const randomBlue = Math.floor(Math.random() * 256);

  // Construct the color string in the format "rgb(r, g, b)"
  const randomColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;

  return randomColor;
}
function CreatBox(row, column) {
  for (let index = 0; index < row * column; index++) {
    let box = document.createElement("div");
    box.className = "painter";
    box.style.width = sketcher_size / row + "px";
    box.style.height = sketcher_size / column + "px";
    box.addEventListener("mousedown", function () {
      penOn = true;
      box.style.backgroundColor = ChangeColor();
    });
    box.addEventListener("mouseup", function () {
      penOn = false;
    });
    box.addEventListener("mousemove", function () {
      if (penOn) {
        box.style.backgroundColor = ChangeColor();
      }
    });

    sketcher.appendChild(box);
  }
}
