const sketcher = document.getElementById("sketcher");
const sketcher_size = sketcher.offsetHeight;
let colorInput = document.getElementById("color-change");
let penOn = false;
const box = document.querySelector(".painter");
const rainbow = document.getElementById("rainbow");
let currentMode = "color";
CreatBox(16, 16);
rainbow.addEventListener("click", function () {
  currentMode = "rainbow";
});

function TogalMode() {
  switch (currentMode) {
    case "color":
      currentMode = "color";
      break;
    case "rainbow":
      currentMode = "rainbow";
      break;
  }
}

function ChangeColor() {
  switch (currentMode) {
    case "color":
      return colorInput.value;
    case "rainbow":
      return rainbowColor();
  }
  console.log(colorInput.value);
  return colorInput.value;
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
