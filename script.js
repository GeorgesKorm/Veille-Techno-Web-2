const svgns = "http://www.w3.org/2000/svg";
let cursorOrigin = 36;
let cursorWidth = 68;
let cursorOffset = cursorOrigin + cursorWidth / 2;
let maxPosition = 1417;
let smallUnit = maxPosition / 50;

function extractViewBoxWidth(svg) {
  return parseInt(svg.getAttribute("viewBox").split(" ")[2]);
}
function formatDecimal(value, decimals) {
  return value.toFixed(decimals);
}

function init_UI() {
  const level = document.getElementById("level")
  const cursor = document.getElementById("cursor");
  const trackBar = document.getElementById("trackbar");

  let viewportWidth = extractViewBoxWidth(trackBar);
  let containerWidth = document.getElementById("trackbar").getBoundingClientRect().width
  let containerX = document.getElementById("trackbar").getBoundingClientRect().y
  let screenToViewport = containerWidth / viewportWidth
  let coordinatesViewportX = containerX / screenToViewport

  coordinatesViewportX = Math.round(coordinatesViewportX / (smallUnit / 2)) * (smallUnit / 2)
  cursor.style.transform = "translate(" + coordinatesViewportX + 'px, 0px)';


  let levelValue = coordinatesViewportX / smallUnit * 0.2;
  level.value = formatDecimal(levelValue, 1);
  updateColour(level.value,level)

  let mouseIsDown = false;

  trackBar.addEventListener("pointerdown", function (e) {
    e.target.setPointerCapture(e.pointerId);
    updatePointerAndLevel(e.offsetX);
    mouseIsDown = true;
  });

  trackBar.addEventListener("pointermove", function (e) {
    if (mouseIsDown) {
      updatePointerAndLevel(e.offsetX)
    }
  });

  trackBar.addEventListener("pointerup", function (e) {
    e.target.releasePointerCapture(e.pointerId);
    mouseIsDown = false;
  });

  level.addEventListener("change", function (e) {
    if (!mouseIsDown) {
      let newVal = parseFloat(level.value);
      console.log(newVal)
      if (isNaN(newVal)) {
        newVal = 0;
      }
      if (newVal < 0) {
        newVal = 0;
      }
      if (newVal > 10) {
        newVal = 10;
      }
      setPointerValue(newVal);
    }
  });
}

function updatePointerAndLevel(mousePosX) {
  mousePosX = Math.round(mousePosX / (smallUnit / 2)) * (smallUnit / 2); // fait les bonds de .5 quand on bouge le curseur
  mousePosX = Math.max(0, Math.min(mousePosX, maxPosition)); //empêche de sortir "out of bounds"

  const cursor = document.getElementById("cursor");
  const level = document.getElementById("level");

  cursor.style.transform = "translate(" + mousePosX + "px, 0px)";

  let levelValue = (mousePosX / smallUnit) * 0.2;
  level.value = formatDecimal(levelValue, 1);
  updateColour(level.value,level)
}
function setPointerValue(value) {
  const cursor = document.getElementById("cursor");
  const level = document.getElementById("level");

  let x = value * (smallUnit / 0.2);
  x = Math.round(x / (smallUnit / 2)) * (smallUnit / 2); //s'assure que ça va bien pointer le 3 si on écrit 2.95 comme niveau

  cursor.style.transform = "translate(" + value + "px, 0px)";

  updateColour(value,level)

  level.value = formatDecimal(value, 1);
}

function updateColour(value, level){
  let colour = (value / 10) * 255;
  level.style.color = "rgb(" + colour + ",0,0)";
  cursor.style.fill = "rgb(" + colour + ",0,0)";
  cursor.style.stroke = "rgb(" + (255 - colour) + ",0,0)";
}

init_UI()