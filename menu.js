"use strict";

class Player {
  constructor(
    playerId,
    playerCharacter,
    playerToken,
    playerNumberPreference
  ) {
    this._playerId = playerId;
    this._playerCharacter = playerCharacter;
    this._playerToken = playerToken;
    this.playerNumberPreference = playerNumberPreference;
  }

  getplayerId() {
    return this._playerId;
  }

  setplayerId(newPlayerId) {
    this._playerId = newPlayerId;
  }

  getplayerCharacter() {
    return this._playerCharacter;
  }

  setplayerCharacter(newPlayerCharacter) {
    this._playerCharacter = newPlayerCharacter;
  }

  getplayerToken() {
    return this._playerToken;
  }

  setplayerToken(newPlayerToken) {
    this._playerToken = newPlayerToken;
  }

  setPlayerNumberPreference(newPlayerNumberPreference) {
    this.playerNumberPreference = newPlayerNumberPreference;
  }

  getPlayerNumberPreference() {
    return this.playerNumberPreference;
  }

  getplayerWin() {
    return this._playerPosition;
  }

  setplayerWin(win) {
    this._win = win;
  }

  // declareWin(playerToken){
  //   if (playerToken === 1){
  //     let playerOne = localStorage.getItem("playerPreferences");
  //     let playerOneObject = JSON.parse(playerOne);
  //     playerOneObject.
  //   }else if (playerToken === 2){

  //   }else if (playerToken === 3){

  //   }else{

  //   }
  // }

  static startMatch() {
    let matchState = localStorage.getItem("Match");
    let matchStateObject = JSON.parse(matchState);
    matchStateObject._matchState = "started";
    let matchStateString = JSON.stringify(matchStateObject);
    localStorage.setItem("Match", matchStateString);
  }

  restartMatch() {
    console.log(`El jugador ${this._playerId} ha reiniciado el partido.`);
  }

  static rollDice() {
    const diceResult = Math.floor(Math.random() * 6) + 1;
    return diceResult;
  }

  static moveToken(tokenPosition, diceResult) {
    //Sumar la posición del token con el resultado del dado:
    let currentPosition = tokenPosition[1];
    let newPosition = currentPosition + diceResult;
    if (newPosition > 60) {
      let restOfPosition = 60 - currentPosition;
      let stepsToGoBack = diceResult - restOfPosition;
      newPosition = 60 - stepsToGoBack;
      tokenPosition[1] = newPosition;
      return tokenPosition;
    } else if (newPosition === 60) {
      {
        tokenPosition[1] = 60;
      }
    } else {
      tokenPosition[1] = newPosition;
      return tokenPosition;
    }
  }
}

class Match {
  constructor(numberOfPlayers, matchState) {
    this._numberOfPlayers = numberOfPlayers;
    this._matchState = matchState;
  }

  getnumberOfPlayers() {
    return this._numberOfPlayers;
  }

  setnumberOfPlayers(newNumberOfPlayers) {
    this._numberOfPlayers = newNumberOfPlayers;
  }

  getmatchState() {
    return this._matchState;
  }

  setmatchState(newMatchState) {
    this._matchState = newMatchState;
  }

  listNumberPlayers(numberOfPlayers) {
    let players = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      players[i];
    }
    return players;
  }

  static createMatchReport() {
    let playerPreferences = localStorage.getItem("playerPreferences");
    let playerPreferencesObject = JSON.parse(playerPreferences);
    let numberOfPlayer = playerPreferencesObject.playerNumberPreference;
    let matchReportArray = [];
    for (let i = 1; i < numberOfPlayer + 1; i++) {
      let playerInfo = [i, 0, false];
      matchReportArray.push(playerInfo);
    }
    localStorage.setItem("matchReport", matchReportArray);
  }

  static updateMatchReport(newTokenPosition) {
    let playerPreferences = localStorage.getItem("playerPreferences");
    let playerPreferencesObject = JSON.parse(playerPreferences);
    let numberOfPlayer = playerPreferencesObject.playerNumberPreference;
    let newMatchReportArray = [];
    for (let i = 1; i < numberOfPlayer + 1; i++) {
      if (i === newTokenPosition[0]) {
        let newplayerInfo = [i, newTokenPosition[1]];
        newMatchReportArray.push(newplayerInfo);
      }
      let playerInfo = [i, 0];
      newMatchReportArray.push(playerInfo);
    }
    localStorage.setItem("matchReport", newMatchReportArray);
  }
}

/*********************** MENU ************************/

const menuSchema = {
  characterSelect: ["pinguino", "gata", "gato", "perro", "pato"],
  playersNumber: ["twoPlayers", "threePlayers", "fourPlayers"],
};

var menu = document.querySelectorAll("nav.menu div");
var characterSelected = document.getElementById("characterSelected");
var numberOfPlayerSelected = document.getElementById("numberOfPlayerSelected");
var number = numberOfPlayerSelected.querySelector("span");
const deletePreferencesButton = document.getElementById(
  "deletePreferencesButton"
);
const playButton = document.getElementById("playButton");
var currentRoute = window.location.href;
const player = new Player();

function hasAllAttributes(object) {
  for (let key in object) {
    if (object[key] === undefined) {
      return false;
    }
  }
  return true;
}

function convertToNumber(itemId) {
  let numberOfPlayers = 0;
  switch (itemId) {
    case "twoPlayers":
      numberOfPlayers = 2;
      break;
    case "threePlayers":
      numberOfPlayers = 3;
      break;
    case "fourPlayers":
      numberOfPlayers = 4;
      break;
  }
  return numberOfPlayers;
}

function saveItemSelected(itemId, hasAllAttributes) {
  let playerPreferences = localStorage.getItem("playerPreferences");
  if (playerPreferences === null) {
    player.setplayerId(1);
    player.setplayerToken(1);
    const itemSelected = menuSchema.characterSelect.includes(itemId);
    if (!itemSelected) {
      const numberOfPlayersSelected = menuSchema.playersNumber.includes(itemId);
      if (numberOfPlayersSelected) {
        let numberOfPlayer = convertToNumber(itemId);
        number.innerHTML = numberOfPlayer;
        player.setPlayerNumberPreference(numberOfPlayer);
      }
    } else {
      characterSelected.innerHTML = itemId;
      const stringItemId = String(itemId);
      player.setplayerCharacter(stringItemId);
    }

    let playerCreated = hasAllAttributes(player);
    if (playerCreated) {
      const playerString = JSON.stringify(player);
      localStorage.setItem("playerPreferences", playerString);
      const matchNumberOfPlayer = player.getPlayerNumberPreference();
      const match = new Match();
      match.setnumberOfPlayers(matchNumberOfPlayer);
      match.setmatchState("not started");
      const matchString = JSON.stringify(match);
      localStorage.setItem("Match", matchString);
      deletePreferencesButton.disabled = false;
      playButton.disabled = false;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let preferencesSelected = localStorage.getItem("playerPreferences");
  if (preferencesSelected) {
    let preferensSelectedObject = JSON.parse(preferencesSelected);
    let playerNumberPreferenceSelected =
      preferensSelectedObject.playerNumberPreference;
    let characterPreferenceSelected = preferensSelectedObject._playerCharacter;
    characterSelected.innerHTML = characterPreferenceSelected;
    number.innerHTML = playerNumberPreferenceSelected;
    deletePreferencesButton.disabled = false;
    playButton.disabled = false;
  }
});

deletePreferencesButton.addEventListener("click", function () {
  localStorage.removeItem("playerPreferences");
  localStorage.removeItem("Match");
  location.reload();
});

menu.forEach((option) => {
  let childrenOptions = option.querySelectorAll("ul");
  option.addEventListener("click", function () {
    childrenOptions.forEach((childrenOption) => {
      childrenOption.classList.toggle("deploy");
      let childrenOptionOfDropdown = childrenOption.querySelectorAll("li");
      childrenOptionOfDropdown.forEach(function (item) {
        item.addEventListener("click", function () {
          let itemId = item.id;
          saveItemSelected(itemId, hasAllAttributes);
        });
      });
    });
  });
});

playButton.addEventListener("click", function () {
  Match.createMatchReport();
  let lastIndexOf = currentRoute.lastIndexOf("/");
  let baseRoute = currentRoute.substring(0, lastIndexOf);
  let boardRoute = baseRoute + "/board.html";
  window.location.href = boardRoute;
});

document.addEventListener("click", function (event) {
  let isMenuClicked = event.target.closest(".menu");
  if (!isMenuClicked) {
    menu.forEach((option) => {
      let childrenOptions = option.querySelectorAll("ul");
      childrenOptions.forEach((childrenOption) => {
        childrenOption.classList.remove("deploy");
      });
    });
  } else {
    let clickedOption = event.target.closest(".option");
    if (clickedOption) {
      menu.forEach((option) => {
        if (option !== clickedOption) {
          let childrenOptions = option.querySelectorAll("ul");
          childrenOptions.forEach((childrenOption) => {
            childrenOption.classList.remove("deploy");
          });
        }
      });
    }
  }
});

document.getElementById("playAudio").addEventListener("mouseover", function () {
  var audio = document.getElementById("menu-theme");
  audio.play();
});
