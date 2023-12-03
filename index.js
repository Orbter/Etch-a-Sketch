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
const settings = document.getElementById("settings");
const headline = document.getElementById("headline");
let sketcher_size = sketcher.offsetHeight;
let penOn = false;
let numberOfBoxex;
let currentMode = "color";
let light_dark = "light";
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

function buttonsColor(clickedButton) {
  // Remove 'custom-color' class from all buttons
  const allButtons = document.querySelectorAll(".button-settings");
  allButtons.forEach(function (button) {
    button.classList.remove("custom-color");
  });

  // Add 'custom-color' class to the clicked button
  clickedButton.classList.add("custom-color");
}

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
    box.style.backgroundColor = "#ffffff";
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
      return "#ffffff";
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
  sketcher_size = sketcher.offsetHeight;
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
function lightOrDark(element_button) {
  const buttons = document.querySelectorAll(".button-settings");

  if (light_dark === "dark") {
    // Light Mode
    document.body.style.backgroundColor = "rgb(238, 234, 230)";
    settings.style.backgroundColor = "rgb(222, 214, 206)";
    headline.style.color = "black";

    colorInput.style.backgroundColor = "rgb(222, 214, 206)";

    buttons.forEach(function (button) {
      button.style.backgroundColor = "rgb(222, 214, 206)";
      button.style.color = "black";
      button.style.borderColor = "black";
    });

    light_dark = "light";
  } else {
    // Dark Mode
    document.body.style.backgroundColor = "rgb(59, 66, 82)";
    settings.style.backgroundColor = "rgb(46, 52, 64)";
    headline.style.color = "white";

    colorInput.style.backgroundColor = "rgb(46, 52, 64)";

    buttons.forEach(function (button) {
      button.style.backgroundColor = "rgb(46, 52, 64)";
      button.style.color = "white";
      button.style.borderColor = "white";
    });

    light_dark = "dark";
  }

  if (element_button) {
    element_button.style.backgroundColor =
      light_dark === "light" ? "rgb(47, 45, 45)" : "rgb(21, 54, 219)";
    element_button.style.borderColor =
      light_dark === "light" ? "rgb(47, 45, 45)" : "rgb(21, 54, 219)";
  }
}
