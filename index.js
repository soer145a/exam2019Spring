"use strict";
const star = "imgs/001-star.png";
const planet = "imgs/004-planet.png";
const asteroid = "imgs/009-asteroid.png";
const alien = "imgs/046-alien.png";
const saturn = "imgs/049-saturn.png";
const mars = "imgs/050-mars.png";
window.addEventListener("DOMContentLoaded", init);
function init() {
  painter();
}

function painter() {
  let allDisplayAreas = document.querySelectorAll(".displayCase");

  allDisplayAreas.forEach(area => {
    let localCounter = Math.floor(Math.random() * 6) + 1;
    let roundedCounter = Math.round(localCounter);
    console.log(roundedCounter);
    if (roundedCounter == 1) {
      area.style.backgroundImage = `url("${star}")`;
      area.setAttribute("value", roundedCounter);
    }
    if (roundedCounter == 2) {
      area.style.backgroundImage = `url("${planet}")`;
      area.setAttribute("value", roundedCounter);
    }
    if (roundedCounter == 3) {
      area.style.backgroundImage = `url("${asteroid}")`;
      area.setAttribute("value", roundedCounter);
    }
    if (roundedCounter == 4) {
      area.style.backgroundImage = `url("${alien}")`;
      area.setAttribute("value", roundedCounter);
    }
    if (roundedCounter == 5) {
      area.style.backgroundImage = `url("${saturn}")`;
      area.setAttribute("value", roundedCounter);
    }
    if (roundedCounter == 6) {
      area.style.backgroundImage = `url("${mars}")`;
      area.setAttribute("value", roundedCounter);
    }
    area.style.backgroundPosition = "center";
    area.style.backgroundSize = "70%";
    area.style.backgroundRepeat = "no-repeat";
  });
}
