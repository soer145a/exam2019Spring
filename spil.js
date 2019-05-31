"use strict";
import TweenMax from "gsap/TweenMax";

const star = "imgs/001-star.png";
const planet = "imgs/004-planet.png";
const asteroid = "imgs/009-asteroid.png";
const alien = "imgs/046-alien.png";
const saturn = "imgs/049-saturn.png";
const mars = "imgs/050-mars.png";

//hjulene fra nummer et til fem - et er til venstre og fem er til højre
//hvert hjul indeholder et tomt array

let saldo = 10000;
let sats;

const wheel_1 = [];
const wheel_2 = [];
const wheel_3 = [];
const wheel_4 = [];
const wheel_5 = [];

//init kalder på funktion wheelArrayMaker

window.addEventListener("DOMContentLoaded", init);

function init() {
  document.querySelector("#startSpil").addEventListener("click", () => {
    console.log(saldo, sats);
    let satsInputValue = document.querySelector("#satsInput").value;
    sats = parseInt(satsInputValue, 10);
    saldo = saldo - sats;
    document.querySelector("#saldoText").textContent = `${saldo},-DKK`;
    document.querySelector("#gevinstText").textContent = "0,- DKK";

    wheelArrayMaker();
  });
  document.querySelector("#autoPlay").addEventListener("click", () => {
    console.log("autoplay START");
    loopTheLoop();
  });
}

function loopTheLoop() {
  setTimeout(loopTheLoop, 2000);
  wheelArrayMaker();
}

//wheelArrayMaker tager og selektere et hjul fra 1 til 5, og skaber 20 ramdomized værdier som bliver skubbet ind i hvert hjul

function wheelArrayMaker() {
  document.querySelector("#wheelArea").innerHTML = "";
  wheel_1.length = 0;
  wheel_2.length = 0;
  wheel_3.length = 0;
  wheel_4.length = 0;
  wheel_5.length = 0;
  arrayPositionArray.length = 0;
  let wheelCounter;

  //først tager den hjul nummer 1

  for (wheelCounter = 1; wheelCounter < 6; wheelCounter++) {
    let counter;

    //counter tæller op til 20

    for (counter = 1; counter < 21; counter++) {
      // imageValue tager og skaber et tal mellem 1 og 6

      let imageValue = Math.floor(Math.random() * 6) + 1;

      //roundedImageValue tager den random værdi (som f.eks. kunne være 4.5) og runder den enten op og ned til et heltal
      //dette gør vi fordi vores billeder har en værdi fra 1 - 6, så vi kan kun bruge heltal, for at "matche" dem

      let roundedImageValue = Math.round(imageValue);

      //wheelSelector er ligemeget eval, som tager en string og konventerer den til en variabel
      //eval tager en string ("wheel_") og sætter den sammen med tallet fra vores wheelCounter (som kommer til at være fra 1 til 5)
      //derfor kan den forstå, at den skal køre udfylde alle vores array (som er defineret i toppen)

      let wheelSelector = eval(`wheel_${wheelCounter}`);

      //roundedImageValue bliver skubbet ind i vores wheelSelector, således at vi får 20 variabler i hvert array

      wheelSelector.push(roundedImageValue);
    }
  }

  //en samling af alle vores arrays
  //den tager et array fra samlingen, og sender det videre til selectThree funktionen

  let arrayCollection = [wheel_1, wheel_2, wheel_3, wheel_4, wheel_5];
  arrayCollection.forEach(selectThree);
  divFactory(arrayCollection);
}

//under contruction

function divFactory(array) {
  let divFactoryCounter;
  for (divFactoryCounter = 1; divFactoryCounter < 6; divFactoryCounter++) {
    let wheelDiv = document.createElement("div");
    wheelDiv.setAttribute("id", `wheel${divFactoryCounter}`);
    wheelDiv.setAttribute("class", "wheel");

    document.getElementById("wheelArea").appendChild(wheelDiv);
  }

  let wheelCounterDiv = 0;

  array.forEach(wheel => {
    wheelCounterDiv++;
    let displayCaseCounter = 0;
    wheel.forEach(displayCase => {
      displayCaseCounter++;
      let displayCaseDiv = document.createElement("div");
      displayCaseDiv.setAttribute("value", displayCase);
      displayCaseDiv.setAttribute("id", `displayCase${displayCaseCounter}`);
      displayCaseDiv.setAttribute("class", "displayCaseDiv");
      document
        .querySelector(`#wheel${wheelCounterDiv}`)
        .appendChild(displayCaseDiv);
    });
  });
  paintWheelDivs();
}

function paintWheelDivs() {
  let allDisplayCases = document.querySelectorAll(".displayCaseDiv");
  allDisplayCases.forEach(div => {
    if (div.getAttribute("value") == 1) {
      div.style.backgroundImage = `url("${star}")`;
    }
    if (div.getAttribute("value") == 2) {
      div.style.backgroundImage = `url("${planet}")`;
    }
    if (div.getAttribute("value") == 3) {
      div.style.backgroundImage = `url("${asteroid}")`;
    }
    if (div.getAttribute("value") == 4) {
      div.style.backgroundImage = `url("${alien}")`;
    }
    if (div.getAttribute("value") == 5) {
      div.style.backgroundImage = `url("${saturn}")`;
    }
    if (div.getAttribute("value") == 6) {
      div.style.backgroundImage = `url("${mars}")`;
    }
    div.style.backgroundPosition = "center";
    div.style.backgroundSize = "70%";
    div.style.backgroundRepeat = "no-repeat";
  });

  animateWheels();
}
function animateWheels() {
  let allWheels = document.querySelectorAll(".wheel");

  let localCounter = -1;
  let tweenDelayCounter = -0.5;
  allWheels.forEach(wheel => {
    localCounter++;
    tweenDelayCounter = tweenDelayCounter + 0.5;
    console.log(tweenDelayCounter);
    let tweenDistance = arrayPositionArray[localCounter] * 14.01;
    TweenMax.to(wheel, 0.5, {
      y: `-${tweenDistance}vw`,
      delay: `${tweenDelayCounter}`
    });
  });
  setTimeout(checkVictory, 2500);
}
function checkVictory() {
  console.log(resultsArray);
  if (
    resultsArray[0] == resultsArray[3] &&
    resultsArray[3] == resultsArray[6] &&
    resultsArray[6] == resultsArray[9] &&
    resultsArray[9] == resultsArray[12]
  ) {
    console.log("TOP LINE IS VALID");
    saldo = saldo + sats * 5;
    document.querySelector("#saldoText").textContent = `${saldo},- DKK`;
    document.querySelector("#gevinstText").textContent = `${sats * 5},- DKK`;
  } else {
    console.log("TOP LINE IS INVALID");
  }
  if (
    resultsArray[1] == resultsArray[4] &&
    resultsArray[4] == resultsArray[7] &&
    resultsArray[7] == resultsArray[10] &&
    resultsArray[10] == resultsArray[13]
  ) {
    console.log("MIDDLE LINE IS VALID");
    saldo = saldo + sats * 5;
    document.querySelector("#saldoText").textContent = `${saldo},- DKK`;
    document.querySelector("#gevinstText").textContent = `${sats * 5},- DKK`;
  } else {
    console.log("MIDDLELINE IS INVALID");
  }
  if (
    resultsArray[2] == resultsArray[5] &&
    resultsArray[5] == resultsArray[8] &&
    resultsArray[8] == resultsArray[11] &&
    resultsArray[11] == resultsArray[14]
  ) {
    console.log("BOTTOM LINE IS VALID");
    saldo = saldo + sats * 5;
    document.querySelector("#saldoText").textContent = `${saldo},- DKK`;
    document.querySelector("#gevinstText").textContent = `${sats * 5},- DKK`;
  } else {
    console.log("BOTTOM LINE IS INVALID");
  }
  if (
    resultsArray[0] == resultsArray[1] &&
    resultsArray[1] == resultsArray[2]
  ) {
    console.log("COLUMN 1 IS VALID");
    saldo = saldo + sats * 3;
    document.querySelector("#saldoText").textContent = `${saldo},- DKK`;
    document.querySelector("#gevinstText").textContent = `${sats * 3},- DKK`;
  } else {
    console.log("COLUMN 1 IS INVALID");
  }
  if (
    resultsArray[3] == resultsArray[4] &&
    resultsArray[4] == resultsArray[5]
  ) {
    console.log("COLUMN 2 IS VALID");
    saldo = saldo + sats * 3;
    document.querySelector("#saldoText").textContent = `${saldo},- DKK`;
    document.querySelector("#gevinstText").textContent = `${sats * 3},- DKK`;
  } else {
    console.log("COLUMN 2 IS INVALID");
  }
  if (
    resultsArray[6] == resultsArray[7] &&
    resultsArray[7] == resultsArray[8]
  ) {
    console.log("COLUMN 3 IS VALID");
    saldo = saldo + sats * 3;
    document.querySelector("#saldoText").textContent = `${saldo},- DKK`;
    document.querySelector("#gevinstText").textContent = `${sats * 3},- DKK`;
  } else {
    console.log("COLUMN 3 IS INVALID");
  }
  if (
    resultsArray[9] == resultsArray[10] &&
    resultsArray[10] == resultsArray[11]
  ) {
    console.log("COLUMN 4 IS VALID");
    saldo = saldo + sats * 3;
    document.querySelector("#saldoText").textContent = `${saldo},- DKK`;
    document.querySelector("#gevinstText").textContent = `${sats * 3},- DKK`;
  } else {
    console.log("COLUMN 4 IS INVALID");
  }
  if (
    resultsArray[12] == resultsArray[13] &&
    resultsArray[13] == resultsArray[14]
  ) {
    console.log("COLUMN 3 IS VALID");
    saldo = saldo + sats * 3;
    document.querySelector("#saldoText").textContent = `${saldo},- DKK`;
    document.querySelector("#gevinstText").textContent = `${sats * 3},- DKK`;
  } else {
    console.log("COLUMN 3 IS INVALID");
  }
  resultsArray.length = 0;
}
// den får et array som parameter, og vælger hvilket tre af billedværdierne som skal vises til sidst
let resultsArray = [];
let arrayPositionArray = [];

function selectThree(array) {
  let arrayPosition = Math.floor(Math.random() * 17) + 1;

  //arrayPosition tager en tilfældig tal op til 18
  //imageVariable_1 bliver sat til at være lige med array, med et tilfældigt tal
  //de to næste er tallet plus 1 og tallet plus 2
  //da det random tal maks kan være 18, vil den aldrig kunne gå over 20 - vi har kun 20 tal i vores array, så koden ville knække, hvis vi overskred 20

  //det random tal kunne være 5, så positionerne ville være henholdsvist 5, 6, 7

  let imageVariable_1 = array[arrayPosition];
  let imageVariable_2 = array[arrayPosition + 1];
  let imageVariable_3 = array[arrayPosition + 2];

  console.log(imageVariable_1, imageVariable_2, imageVariable_3);

  arrayPositionArray.push(arrayPosition);
  resultsArray.push(imageVariable_1, imageVariable_2, imageVariable_3);
}
