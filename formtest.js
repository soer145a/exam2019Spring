"use strict";

import { Ease } from "gsap";

window.addEventListener("DOMContentLoaded", init);
let userArray = [];
const front = document.querySelector("#formLogin");
const userData = document.querySelector("#formUserBlock");
const userInfo = document.querySelector("#formUserInfo");
const nemId = document.querySelector("#nemID");

function init() {
  fetchMyJson();
  console.log("init");
}
function fetchMyJson() {
  fetch(
    "https://examusers-4b00.restdb.io/rest/databaseuser?key=22631469345172666884",
    {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-apikey": "5cdbfbb9f66d7b1062cb34b7"
      }
    }
  )
    .then(res => res.json())
    .then(data => {
      userArray = data;
      console.log(userArray);
      document
        .querySelector("#formUserButton")
        .addEventListener("click", displayFirstForm);
      document
        .querySelector("#formLoginButton")
        .addEventListener("click", () => {
          checkLoginStatus();
        });
    });
}
function checkLoginStatus() {
  console.log("CHECK LOGIN");
  let formUserName = document.querySelector("#formUsername").value;
  let formPassword = document.querySelector("#formPassword").value;
  console.log(formUserName);
  userArray.forEach(user => {
    if (formUserName == user.username) {
      if (user.password == formPassword) {
        document.querySelector("body").style.backgroundColor = "blue";
      }
    }
  });
}
function displayFirstForm() {
  front.style.display = "none";
  userData.style.display = "block";

  const dataObject = {
    username: "-placeholder-",
    password: "-placeholder-",
    email: "-placeholder-",
    telefoneNr: "-placeholder-",
    fornavn: "-placeholder-",
    efternavn: "-placeholder-",
    adresse: "-placeholder-",
    userID: "-placeholder-",
    city: "-placeholder-",
    CPRnr: "-placeholder-"
  };

  document
    .querySelector("#formUserBlockFormButton")
    .addEventListener("click", () => {
      console.log("CLIKED BUTTON");
      saveFirstSetOfData(dataObject);
    });
}
function saveFirstSetOfData(obj) {
  console.log("SAVE FIRST SET OF DATA");

  let userCounter = 0;
  userArray.forEach(user => {
    console.log(user.username, obj.username);
    if (user.username == obj.username) {
      alert("OPTAGET BRUGERNAVN");
    } else {
      let usernameForm = document.querySelector("#formUsername");
      console.log(usernameForm.checkValidity());
      if (usernameForm.checkValidity() != true) {
        alert("Indtast gyldigt brugernavn");
      } else {
        obj.username = usernameForm.value;

        if (
          document.querySelector("#userPassword").value ==
          document.querySelector("#userPasswordConfirm").value
        ) {
          obj.password = document.querySelector("#userPassword").value;
          if (user.email == obj.email) {
            alert("OPTAGET EMAIL");
          } else {
            let emailForm = document.querySelector("#userEmail");
            if (emailForm.checkValidity() != true) {
              alert("Indtast gyldig email");
            } else {
              obj.email = emailForm.value;

              if (obj.telefoneNr == user.telefoneNr) {
                alert("OPTAGET TELEFONNR");
              } else {
                obj.telefoneNr = document.querySelector("#userTlf").value;
                userCounter++;
                obj.userID = Math.random()
                  .toString(36)
                  .substr(2, 9);
              }
            }
          }
        } else {
          alert("Password1 og password 2 er ikke ens");
        }
      }
    }
  });
  if (userCounter == userArray.length) {
    console.log("CORRECT");
    displaySecondForm(obj);
  } else {
    alert("Something Was Wrong");
  }
}
function displaySecondForm(obj) {
  console.log("DISPLAY2");
  userData.style.display = "none";
  userInfo.style.display = "block";
  document
    .querySelector("#formUserInfoButton")
    .addEventListener("click", () => {
      saveSecondSetOfData(obj);
    });
}
function saveSecondSetOfData(obj) {
  obj.fornavn = document.querySelector("#userFirstName").value;
  obj.efternavn = document.querySelector("#userLastName").value;
  obj.adresse = document.querySelector("#userAdress").value;
  obj.city = document.querySelector("#userCity").value;
  userArray.forEach(user => {
    if (user.CPRnr == obj.CPRnr) {
      alert("Dette CPR nummer brugt før");
    } else {
      obj.CPRnr = document.querySelector("#userCpr").value;

      sendInfoToRest(obj);
    }
  });
}

function sendInfoToRest(obj) {
  nemId.style.display = "block";
  userInfo.style.display = "none";
  const postData = JSON.stringify(obj);
  fetch(
    "https://examusers-4b00.restdb.io/rest/databaseuser?key=22631469345172666884",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5cdbfbb9f66d7b1062cb34b7",
        "cache-control": "no-cache"
      },
      body: postData
    }
  );
}
