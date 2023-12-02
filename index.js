const sketcher = document.getElementById("sketcher");
const erase = document.getElementById("erase");
let colorInput = document.getElementById("color-change");
const box = document.querySelector(".painter");
const rainbow = document.getElementById("rainbow");
const colorMode = document.getElementById("color-mode");
const clear = document.getElementById("clear");
const scrollbar = document.getElementById("scrollbar");
const sizeChange = document.getElementById("size-change");
const numberChange = document.getElementById("scrollbar-number");
const errorMessge = document.getElementById("error-message");
const sketcher_size = sketcher.offsetHeight;
let penOn = false;
let numberOfBoxex;
let currentMode = "color";
// Check if numberOfBoxex is NaN
if (isNaN(numberOfBoxex)) {
  numberOfBoxex = 16; // Set a default value
}

numberChange.addEventListener("input", function () {
  numberChange.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      const inputValue = Number(numberChange.value);
      if (inputValue >= 2 && inputValue <= 64) {
        numberOfBoxex = inputValue;
        creatBox(numberOfBoxex, numberOfBoxex);
        sizeChange.textContent = inputValue;
        errorMessge.textContent = "";
        scrollbar.value = inputValue;
      } else {
        errorMessge.textContent = "Type a number between 2 and 64";
      }
    }
  });
});

scrollbar.addEventListener("input", function () {
  sizeChange.textContent = scrollbar.value;
  numberOfBoxex = Number(scrollbar.value);
  creatBox(numberOfBoxex, numberOfBoxex);
});

rainbow.addEventListener("mousedown", function () {
  currentMode = "rainbow";
});
erase.addEventListener("mousedown", function () {
  currentMode = "erase";
});
colorMode.addEventListener("mousedown", function () {
  currentMode = "color";
});

clear.addEventListener("mousedown", function () {
  // Loop through all boxes and set their background color to the default color
  document.querySelectorAll(".painter").forEach(function (box) {
    box.style.backgroundColor = "#a19f9f";
  });
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

creatBox(numberOfBoxex, numberOfBoxex);
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
function clearSketcher() {
  while (sketcher.firstChild) {
    sketcher.removeChild(sketcher.firstChild);
  }
}

function creatBox(row, column) {
  clearSketcher();

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
