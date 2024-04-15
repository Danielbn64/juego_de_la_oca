"use strict";

//Clases que se van a utilizar en este controlador, No se han importado en forma de
//módulos para facilitar el despliegue y la revisión de la tarea:
class Player {
  constructor(playerId, playerCharacter, playerToken, playerNumberPreference) {
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

   //Declara ganador al jugador que haya pisado la casilla 60:
  static declareWinner(playerToken) {
    let matchReport = convertToArray();
    if (playerToken === 1) {
      matchReport[0][2] = true;
    } else if (playerToken === 2) {
      matchReport[1][2] = true;
    } else if (playerToken === 3) {
      matchReport[2][2] = true;
    } else {
      matchReport[3][2] = true;
    }
    localStorage.setItem("matchReport", matchReport);
  }

  //Método para declarar la partida iniciada: 
  static startMatch() {
    let matchState = localStorage.getItem("Match");
    let matchStateObject = JSON.parse(matchState);
    matchStateObject._matchState = "started";
    let matchStateString = JSON.stringify(matchStateObject);
    localStorage.setItem("Match", matchStateString);
  }

  //Método para reiniciar la partida:
  static restartMatch() {
    this.createMatchReport();
    window.location.reload();
  }

  //Muestra un numero aleatorio del 1 al 6:
  static rollDice() {
    const diceResult = Math.floor(Math.random() * 6) + 1;
    return diceResult;
  }

  //Controla el movimiento de cada ficha y establece que si
  //una ficha ya esta en la posición 60 ya no se puede mover mas:
  static moveToken(tokenPosition, diceResult) {
    let currentPosition = tokenPosition[1];
    let newPosition = currentPosition + diceResult;
    if (newPosition > 60 && !tokenPosition[2]) {
      let restOfPosition = 60 - currentPosition;
      let stepsToGoBack = diceResult - restOfPosition;
      newPosition = 60 - stepsToGoBack;
      tokenPosition[1] = newPosition;
      return tokenPosition;
    } else if (newPosition === 60) {
      {
        tokenPosition[1] = 60;
        let playerToken = tokenPosition[0];
        this.declareWinner(playerToken);
        return tokenPosition;
      }
    } else if (newPosition > 60 && tokenPosition[2]) {
      tokenPosition[1] = 61;
      return tokenPosition;
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

  //Establece el array llamado reporte de partida
  //donde se guardara el numero de la ficha la posición de cada ficha
  //o si la ficha ha llegado ya a la meta:
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

  //Modifica el array de reporte de partida cuando un jugador ha terminado su jugada:
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

  //Establece la posición de las fichas en su lugar después de una recarga de la página
  //para evitar la perdida del progreso en una partida iniciada: 
  static saveMatch(coordinates) {
    let matchReport = convertToArray();
    for (let i = 0; i < matchReport.length; i++) {
      for (let j = 0; j < coordinates.length; j++) {
        let positionString = matchReport[i][1].toString();
        if (positionString === coordinates[j][0] && matchReport[i][0] === 1) {
          let oneToken = document.querySelector("div.oneToken");
          let adjustLeft = coordinates[j][1];
          adjustLeft += 20;
          let adjustTop = coordinates[j][2];
          adjustTop += 20;
          oneToken.style.left = adjustLeft + "px";
          oneToken.style.top = adjustTop + "px";
        } else if (
          positionString === coordinates[j][0] &&
          matchReport[i][0] === 2
        ) {
          let secondToken = document.querySelector("div.secondToken");
          let adjustLeft = coordinates[j][1];
          adjustLeft += 24;
          let adjustTop = coordinates[j][2];
          adjustTop += 24;
          secondToken.style.left = adjustLeft + "px";
          secondToken.style.top = adjustTop + "px";
        } else if (
          positionString === coordinates[j][0] &&
          matchReport[i][0] === 3
        ) {
          let thirdToken = document.querySelector("div.thirdToken");
          let adjustLeft = coordinates[j][1];
          adjustLeft += 26;
          let adjustTop = coordinates[j][2];
          adjustTop += 26;
          thirdToken.style.left = adjustLeft + "px";
          thirdToken.style.top = adjustTop + "px";
        } else if (
          positionString === coordinates[j][0] &&
          matchReport[i][0] === 4
        ) {
          let fourthToken = document.querySelector("div.fourthToken");
          let adjustLeft = coordinates[j][1];
          adjustLeft += 17;
          let adjustTop = coordinates[j][2];
          adjustTop += 17;
          fourthToken.style.left = adjustLeft + "px";
          fourthToken.style.top = adjustTop + "px";
        }
      }
    }
  }

  //Establece la partida como finalizada cuando el penúltimo jugador haya llegado a la casilla 60:
  static endMatch(listWinners) {
    let playerPreferences = localStorage.getItem("playerPreferences");
    let playerPreferencesObject = JSON.parse(playerPreferences);
    let numberOfPlayer = playerPreferencesObject.playerNumberPreference;
    let matchString = localStorage.getItem("Match");
    let matchObject = JSON.parse(matchString);
    if (numberOfPlayer === 2 && listWinners.length === 1) {
      matchObject._matchState = "ended";
      let match = JSON.stringify(matchObject);
      localStorage.setItem("Match", match);
    } else if (numberOfPlayer === 3 && listWinners.length === 2) {
      matchObject._matchState = "ended";
      let match = JSON.stringify(matchObject);
      localStorage.setItem("Match", match);
    } else if (numberOfPlayer === 4 && listWinners.length === 3) {
      matchObject._matchState = "ended";
      let match = JSON.stringify(matchObject);
      localStorage.setItem("Match", match);
    }
  }

  //Lista los jugadores que han alcanzado la posición 60:
  static listWinners(listWinners) {
    let matchReport = convertToArray();
    let isInclude = false;
    for (let i = 0; i < matchReport.length; i++) {
      isInclude = listWinners.includes(matchReport[i][0]);
      if (matchReport[i][2] && !isInclude) {
        listWinners.push(matchReport[i][0]);
        break;
      }
    }
    this.endMatch(listWinners);
    return listWinners;
  }

  //Reinicia la partida:
  static restartMatch() {
    this.createMatchReport();
    window.location.reload();
  }
}

/*********************** MENU ************************/

//Establece un esquema de opciones para el menú principal:
const menuSchema = {
  characterSelect: ["pinguino", "gata", "gato", "perro", "pato"],
  playersNumber: ["twoPlayers", "threePlayers", "fourPlayers"],
};

//Variables necesarias para el funcionamiento del menú de inicio:
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

//Método auxiliar para comprobar si el jugador principal a sido creado
//y habilitar el botón de reiniciar preferencias:
function hasAllAttributes(object) {
  for (let key in object) {
    if (object[key] === undefined) {
      return false;
    }
  }
  return true;
}

//Convierte el id de las opciones de preferencia de numero de jugadores
//en un numero y así evitar usar id con valores numéricos:
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

//Guarda las preferencias de partida del usuario:
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

//Carga las preferencias de partida del usuario después de hacer una recarga de la página:
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

//Se activan los métodos encargados de borrar las preferencias de partida:
deletePreferencesButton.addEventListener("click", function () {
  localStorage.removeItem("playerPreferences");
  localStorage.removeItem("Match");
  location.reload();
});

//Controla el funcionamiento del menú principal:
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

//Controla el funcionamiento del botón para empezar el juego:
playButton.addEventListener("click", function () {
  Match.createMatchReport();
  let lastIndexOf = currentRoute.lastIndexOf("/");
  let baseRoute = currentRoute.substring(0, lastIndexOf);
  let boardRoute = baseRoute + "/board.html";
  window.location.href = boardRoute;
});

//Controla el funcionamiento para cerrar los menús desplegables cuando se haga click fuera de ellos:
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
