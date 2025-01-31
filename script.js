function extractViewBoxWidth(svg) {
  return parseInt(svg.getAttribute("viewBox").split(" ")[2]);
}

let cursorOrigin = 36;
let cursorWidth = 68;
let cursorOffset = cursorOrigin + cursorWidth / 2;
let maxPosition = 1417;
let smallUnit = maxPosition / 50;

Écran_À_viewport = largeurConteneur / largeurViewport;

CoordonnéesViewport_X = Coordonnées_Écran_X / Écran_À_viewport;

CoordonéesViewport_X =
  Math.round(CoordonéesViewport_X / (smallUnit / 2)) * (smallUnit / 2);

cursor = document.getElementById("cursor");
cursor.style.transform = "translate(" + viewportPositionX + "px, 0px)";

let levelValue = (positionx / smallUnit) * 0.2;
level.value = formatDecimal(levelValue, 1);
level.style.color = "rgb(" + (levelValue / 10) * 255 + ",0 ,0)";
cursor.style.fill = "rgb(" + (levelValue / 10) * 255 + ",0 ,0)";
cursor.style.stroke = "rgb(" + (255 - (levelValue / 10) * 255) + ",0 ,0)";

let trackbar = document.getElementById("trackbar");
trackbar.addEventListener("pointerdown", function (e) {
  e.target.setPointerCapture(e.pointerId);
  // ...
  mouseIsDown = true;
});

trackbar.addEventListener("pointermove", function (e) {
  if (mouseIsDown) {
    //  ...
  }
});

trackbar.addEventListener("pointerup", function (e) {
  e.target.releasePointerCapture(e.pointerId);
  mouseIsDown = false;
});

level = document.getElementById("level");
level.addEventListener("change", function (e) {
  if (!mouseIsDown) {
    // ...
  }
});
