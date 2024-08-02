const save_btn = document.querySelector("#save");
const text_input = document.querySelector("#text");
const file_input = document.querySelector("#file");
const clean_btn = document.querySelector("#clean-btn");
const mode_btn = document.querySelector("#mode-btn");
const eraser_btn = document.querySelector("#eraser-btn");

const color_options = document.querySelectorAll(".color-option");
const color = document.querySelector("#color");
const line_width = document.querySelector("#line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = line_width.value;
ctx.lineCap = "round";
// ctx.lineWidth = 2;
// canvas... coordinate system
// fillRect / short cut function
/////////////////////////////////////////////////
// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// ctx.strokeRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 20);
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100);
// ctx.lineTo(450, 200);
// ctx.lineTo(200, 200);
// ctx.fill();
/////////////////////////////////////////////////
// ctx.fillRect(210, 200, 15, 100);
// ctx.fillRect(350, 200, 15, 100);
// ctx.fillRect(260, 200, 60, 200);
// ctx.arc(290, 150, 35, 0, 2 * Math.PI);
// ctx.fill();
// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(270, 140, 6, Math.PI, 2 * Math.PI);
// ctx.arc(300, 140, 6, Math.PI, 2 * Math.PI);
// ctx.fill();
/////////////////////////////////////////////////
// const colors = [
//   "#ff3838",
//   "#ffb8b8",
//   "#c56cf0",
//   "#ff9f1a",
//   "#fff200",
//   "#32ff7e",
//   "#7efff5",
// ];
// // let x_ = 0;
// // let y_ = 0;
// function on_click(event) {
//   x_ = event.offsetX;
//   y_ = event.offsetY;
//   //   ctx.beginPath();
//   ctx.arc(x_, y_, 5, 0, 2 * Math.PI);
//   //   ctx.fillStyle = "black";
//   ctx.fill();
// }
// function on_move(event) {
//   ctx.beginPath();
//   ctx.moveTo(x_, y_);
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   ctx.strokeStyle = color;
//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();
// }
// canvas.addEventListener("mousemove", on_move);
// canvas.addEventListener("click", on_click);
/////////////////////////////////////////////////
// ctx.moveTo(200, 200);
// ctx.lineTo(400, 400);
// ctx.stroke();
let is_painting = false;
let is_filling = false;
function on_move(event) {
  //   ctx.moveTo(event.offsetX, event.offsetY);
  if (is_painting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
function on_mouse(event) {
  is_painting = true;
}
function off_mouse(event) {
  is_painting = false;
}
function on_line_width_change(event) {
  ctx.lineWidth = event.target.value;
}
function on_color_change(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
function on_color_click(event) {
  const color_value = event.target.dataset.color;
  ctx.strokeStyle = color_value;
  ctx.fillStyle = color_value;
  color.value = color_value;
}
function on_mode_click(event) {
  if (is_filling) {
    is_filling = false;
    mode_btn.innerText = "click to Fill";
  } else {
    is_filling = true;
    mode_btn.innerText = "click to Draw";
  }
}
function on_canvas_click(event) {
  if (is_filling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function on_clean_click(event) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function on_eraser_click(event) {
  ctx.strokeStyle = "white";
  is_filling = false;
  mode_btn.innerText = "click to Fill";
}

function on_file_change(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    file_input.value = null;
  };
}
function on_double_click(event) {
  const text = text_input.value;
  console.log(event.offsetX, event.offsetY);
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "30px sans-serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function on_save_click() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "my_drawing.png";
  a.click();
}
// canvas.on_mouse_move = on_move;
canvas.addEventListener("dblclick", on_double_click);
canvas.addEventListener("mousemove", on_move);
canvas.addEventListener("mousedown", on_mouse);
document.addEventListener("mouseup", off_mouse);
canvas.addEventListener("mouseleave", off_mouse);
canvas.addEventListener("click", on_canvas_click);
line_width.addEventListener("change", on_line_width_change);
color.addEventListener("change", on_color_change);
color_options.forEach((color) =>
  color.addEventListener("click", on_color_click)
);
mode_btn.addEventListener("click", on_mode_click);
clean_btn.addEventListener("click", on_clean_click);
eraser_btn.addEventListener("click", on_eraser_click);
file_input.addEventListener("change", on_file_change);
save_btn.addEventListener("click", on_save_click);
