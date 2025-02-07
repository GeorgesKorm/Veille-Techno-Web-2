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
  level.style.color = "rgb(" + levelValue / 10 * 255 + ",0 ,0)";
  cursor.style.fill = "rgb(" + levelValue / 10 * 255 + ",0 ,0)";
  cursor.style.stroke = "rgb(" + (255 - levelValue / 10 * 255) + ",0 ,0)";

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
      if (newVal.toString() == 'NaN') { //Ça me semble absurde que newVal == NaN donne toujours false.
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
  mousePosX = Math.round(mousePosX / (smallUnit / 2)) * (smallUnit / 2);
  mousePosX = Math.max(0, Math.min(mousePosX, maxPosition));

  const cursor = document.getElementById("cursor");
  const level = document.getElementById("level");

  cursor.style.transform = "translate(" + mousePosX + "px, 0px)";

  let levelValue = (mousePosX / smallUnit) * 0.2;
  levelValue = Math.max(0, Math.min(levelValue, 10));

  level.value = formatDecimal(levelValue, 1);

  let colour = (levelValue / 10) * 255;
  level.style.color = "rgb(" + colour + ",0,0)";
  cursor.style.fill = "rgb(" + colour + ",0,0)";
  cursor.style.stroke = "rgb(" + (255 - colour) + ",0,0)";

}
function setPointerValue(value) {
  value = Math.max(0, Math.min(value, 9.9));

  const cursor = document.getElementById("cursor");
  const level = document.getElementById("level");

  let x = value * (smallUnit / 0.2);
  x = Math.round(x / (smallUnit / 2)) * (smallUnit / 2);
  x = Math.max(0, Math.min(x, maxPosition));

  cursor.style.transform = "translate(" + x + "px, 0px)";

  let colour = (value / 10) * 255;
  level.style.color = "rgb(" + colour + ",0,0)";
  cursor.style.fill = "rgb(" + colour + ",0,0)";
  cursor.style.stroke = "rgb(" + (255 - colour) + ",0,0)";

  level.value = formatDecimal(value, 1);

}

init_UI()