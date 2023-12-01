const sketcher = document.getElementById("sketcher");
const sketcher_size = sketcher.offsetHeight;
let penOn = false;
const box = document.querySelector(".painter");

function ChangeColor() {
  if (c) {
  }
}

CreatBox(16, 16);
function CreatBox(row, column) {
  for (let index = 0; index < row * column; index++) {
    let box = document.createElement("div");
    box.className = "painter";
    box.style.width = sketcher_size / row + "px";
    box.style.height = sketcher_size / column + "px";
    box.addEventListener("mousedown", function () {
      penOn = true;
      box.style.backgroundColor = "blue";
    });

    sketcher.appendChild(box);
  }
}
