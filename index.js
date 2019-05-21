"use strict";
const star = "imgs/001-star.png";
const planet = "imgs/004-planet.png";
const asteroid = "imgs/009-asteroid.png";
const alien = "imgs/046-alien.png";
const saturn = "imgs/049-saturn.png";
const mars = "imgs/050-mars.png";

const wheelArray1 = [];
const wheelArray2 = [];
const wheelArray3 = [];
const wheelArray4 = [];
const wheelArray5 = [];

window.addEventListener("DOMContentLoaded", init);
function init() {
  wheelArrayMaker();
}
function wheelArrayMaker() {
  let wheelCounter;
  for (wheelCounter = 1; wheelCounter < 6; wheelCounter++) {
    let counter;
    for (counter = 1; counter < 21; counter++) {
      let localCounter = Math.floor(Math.random() * 6) + 1;
      let roundedCounter = Math.round(localCounter);
      let wheelSelector = eval(`wheelArray${wheelCounter}`);

      wheelSelector.push(roundedCounter);
    }
  }
  let arrayArray = [
    wheelArray1,
    wheelArray2,
    wheelArray3,
    wheelArray4,
    wheelArray5
  ];
  arrayArray.forEach(selectThree);
}
let globalCounter = 0;
function selectThree(array) {
  globalCounter++;
  let arrayCounter = Math.floor(Math.random() * 17) + 1;

  let variable1 = array[arrayCounter];
  let variable2 = array[arrayCounter + 1];
  let variable3 = array[arrayCounter + 2];

  painter(variable1, variable2, variable3);
}
function painter(value1, value2, value3) {
  console.log(value1, value2, value3);
  let parentElement = document.querySelector(`#hjul${globalCounter}`);

  let div1 = parentElement.childNodes[1];
  div1.setAttribute("wheel", value1);
  let div2 = parentElement.childNodes[3];
  div2.setAttribute("wheel", value1);
  let div3 = parentElement.childNodes[5];
  div3.setAttribute("wheel", value3);
  let paintArray = [div1, div2, div3];
  console.log(paintArray);
  paintArray.forEach(div => {
    console.log(div);
    if (div.getAttribute("wheel") == 1) {
      div.style.backgroundImage = `url("${star}")`;
    }
    if (div.getAttribute("wheel") == 2) {
      div.style.backgroundImage = `url("${planet}")`;
    }
    if (div.getAttribute("wheel") == 3) {
      div.style.backgroundImage = `url("${asteroid}")`;
    }
    if (div.getAttribute("wheel") == 4) {
      div.style.backgroundImage = `url("${alien}")`;
    }
    if (div.getAttribute("wheel") == 5) {
      div.style.backgroundImage = `url("${saturn}")`;
    }
    if (div.getAttribute("wheel") == 6) {
      div.style.backgroundImage = `url("${mars}")`;
    }
    div.style.backgroundPosition = "center";
    div.style.backgroundSize = "70%";
    div.style.backgroundRepeat = "no-repeat";
  });
}
