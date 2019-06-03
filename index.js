"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  document.querySelector(".spilNuKnap").addEventListener("click", klik);
  console.log("knappen er klikket");
}

function klik() {
  window.open("spil.html");
}
