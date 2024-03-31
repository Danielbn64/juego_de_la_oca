"use strinct";

class Player {
  constructor(
    playerId,
    playerCharacter,
    playerToken,
    win,
    playerNumberPreference
  ) {
    this._playerId = playerId;
    this._playerCharacter = playerCharacter;
    this._playerToken = playerToken;
    this.playerNumberPreference = playerNumberPreference;
    this._win = win;
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

  // Método para generar un informe del partido
  static createMatchReport() {
    let playerPreferences = localStorage.getItem("playerPreferences");
    let playerPreferencesObject = JSON.parse(playerPreferences);
    let numberOfPlayer = playerPreferencesObject.playerNumberPreference;
    let matchReportArray = [];
    for (let i = 1; i < numberOfPlayer + 1; i++) {
      let playerInfo = [i, 0];
      matchReportArray.push(playerInfo);
    }
    localStorage.setItem("matchReport", matchReportArray);
  }

  static updateMatchReport(newTokenPosition) {
    let tokenPosition = [];
    let matchReport = convertToArray();
    for (let i = 0; i < matchReport.length; i++) {
      if (i === newTokenPosition[0] - 1) {
        matchReport[i][1] = newTokenPosition[1];
        tokenPosition.push(matchReport[i]);
        break;
      }
    }
    localStorage.setItem("matchReport", matchReport);
  }

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

  restartMatch(){
    this.createMatchReport();
    window.location.reload();
  }

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
}

class Board {
  constructor() {
    this._boxes = [];
    this._boxPosition = [];
  }

  getboxes() {
    return this._boxes;
  }

  setboxes(newBoxes) {
    this._boxes = newBoxes;
  }

  getboxPosition() {
    return this._boxPosition;
  }

  setboxPosition(newBoxPosition) {
    this._boxPosition = newBoxPosition;
  }

  static MapBoardSkeleton() {
    let boardSkeleton = document.querySelectorAll("div.box");
    let coordinates = [];
    boardSkeleton.forEach(function (box) {
      let boxCoordinates = box.getBoundingClientRect();
      let boxNumber = box.innerHTML;
      let boxInfo = [boxNumber, boxCoordinates.left, boxCoordinates.top];
      coordinates.push(boxInfo);
    });
    return coordinates;
  }
}

//array de personajes que el usuario puede elegir:
const mainPlayer = document.getElementById("mainPlayer");
const secondPlayer = document.getElementById("secondPlayer");
const thirdPlayer = document.getElementById("thirdPlayer");
const fourthPlayer = document.getElementById("fourthPlayer");

const mainPlayerControl = document.getElementById("mainPlayerControl");
const secondPlayerControl = document.getElementById("secondPlayerControl");
const thirdPlayerControl = document.getElementById("thirdPlayerControl");
const fourthPlayerControl = document.getElementById("fourthPlayerControl");

const coordinates = Board.MapBoardSkeleton();

//Array de ganandores
let listWinners = [];

//Escoge un personaje aleatorio dentro del array de personajes:
function ChoseRamdomCharacter(charactersArray) {
  let randomCharacterNumber = Math.floor(
    Math.random() * charactersArray.length
  );
  let randomCharacter = charactersArray[randomCharacterNumber];
  return randomCharacter;
}

function filterSelectedCharacter(charactersArray, character) {
  charactersArray = charactersArray.filter((element) => element !== character);
  return charactersArray;
}

function createMainPlayerMenu() {
  let playerPreferences = localStorage.getItem("playerPreferences");
  let playerPreferencesObject = JSON.parse(playerPreferences);
  let playerCharacter = playerPreferencesObject._playerCharacter;
  mainPlayer.innerHTML = `
  <img class="p-1" src="images/${playerCharacter}.jpg" width="100px" height="100px" alt="imagen-jugador"/>
  <div class="player-info d-flex flex-column">
  <h4>Personaje:</h4>
      <p>${playerCharacter}</p>
      <h4>Ficha:</h4>
      <p>Azul</p>
  </div>`;
  mainPlayerControl.classList.remove("hide");
}

function createMainPlayerToken() {
  let playerPreferences = localStorage.getItem("playerPreferences");
  let playerPreferencesObject = JSON.parse(playerPreferences);
  let playerId = playerPreferencesObject._playerId;
  let playerToken = document.getElementById(playerId);
  playerToken.classList.remove("hide");
  let playerCharacter = playerPreferencesObject._playerCharacter;
  playerToken.innerHTML = `
  <img class="token-img align-self" src="images/${playerCharacter}.jpg" width="50px" height="50px" alt="imagen-jugador"/>
  `;
}

function createPlayerToken(player) {
  playerIdString = player.getplayerId().toString();
  let playerToken = document.getElementById(playerIdString);
  playerToken.classList.remove("hide");
  let playerCharacter = player.getplayerCharacter();
  playerToken.innerHTML = `
  <img class="token-img align-self" src="images/${playerCharacter}.jpg" width="50px" height="50px" alt="imagen-jugador"/>
  `;
}

function createSecondaryPlayersBench(player) {
  let playerId = player.getplayerId();
  //Crear el menú de los jugadores secundarios
  if (playerId === 2) {
    let playerCharacter = player.getplayerCharacter();
    secondPlayer.classList.remove("hide");
    secondPlayer.innerHTML = `
    <img class="p-1" src="images/${playerCharacter}.jpg" width="100px" height="100px" alt="imagen-jugador"/>
    <div class="player-info d-flex flex-column">
    <h4>Personaje:</h4>
        <p>${playerCharacter}</p>
        <h4>Ficha:</h4>
        <p>Roja</p>
    </div>`;
    secondPlayerControl.classList.remove("hide");
  } else if (playerId === 3) {
    let playerCharacter = player.getplayerCharacter();
    thirdPlayer.classList.remove("hide");
    thirdPlayer.innerHTML = `
    <img class="p-1" src="images/${playerCharacter}.jpg" width="100px" height="100px" alt="imagen-jugador"/>
    <div class="player-info d-flex flex-column">
    <h4>Personaje:</h4>
        <p>${playerCharacter}</p>
        <h4>Ficha:</h4>
        <p>Verde</p>
    </div>`;
    thirdPlayerControl.classList.remove("hide");
  } else {
    let playerCharacter = player.getplayerCharacter();
    fourthPlayer.classList.remove("hide");
    fourthPlayer.innerHTML = `
    <img class="p-1" src="images/${playerCharacter}.jpg" width="100px" height="100px" alt="imagen-jugador"/>
    <div class="player-info d-flex flex-column">
    <h4>Personaje:</h4>
        <p>${playerCharacter}</p>
        <h4>Ficha:</h4>
        <p>Amarilla</p>
    </div>`;
    fourthPlayerControl.classList.remove("hide");
  }
}

function createSecondaryPlayers() {
  var playerPreferences = localStorage.getItem("playerPreferences");
  if (playerPreferences !== null) {
    let playerPreferencesObject = JSON.parse(playerPreferences);
    let playerNumberPreference = playerPreferencesObject.playerNumberPreference;
    let mainPlayerCharacterSelected = playerPreferencesObject._playerCharacter;
    var charactersArray = ["gata", "gato", "perro", "pato", "pinguino"];
    charactersArray = filterSelectedCharacter(
      charactersArray,
      mainPlayerCharacterSelected
    );
    for (let i = 2; i < playerNumberPreference + 1; i++) {
      const player = new Player();
      player.setPlayerNumberPreference(0);
      let playerCharacter = ChoseRamdomCharacter(charactersArray);

      player.setplayerCharacter(playerCharacter);
      charactersArray = filterSelectedCharacter(
        charactersArray,
        playerCharacter
      );
      player.setplayerId(i);
      player.setplayerToken(i);
      player.setplayerWin(false);
      let playerString = JSON.stringify(player);
      let secondaryPlayer = "secondaryPlayer" + i.toString();
      localStorage.setItem(secondaryPlayer, playerString);
      createSecondaryPlayersBench(player);
      createPlayerToken(player);
    }
  }
}

function changePlayerTurn() {
  let rollDiceButtons = document.querySelectorAll("button.roll-dice-btn");
  let playerPreferences = localStorage.getItem("playerPreferences");
  let playerPreferencesObject = JSON.parse(playerPreferences);
  let numberOfPlayers = playerPreferencesObject.playerNumberPreference;
  for (const button of rollDiceButtons) {
    if (!button.classList.contains("hide") && !button.disabled) {
      if (button.id === "rollDiceOne") {
        button.disabled = true;
        let rollDiceTwo = document.getElementById("rollDiceTwo");
        rollDiceTwo.disabled = false;
        break;
      } else if (button.id === "rollDiceTwo") {
        button.disabled = true;
        let rollDiceThree = document.getElementById("rollDiceThree");
        if (numberOfPlayers === 2) {
          rollDiceOne.disabled = false;
        } else {
          rollDiceThree.disabled = false;
        }
        break;
      } else if (button.id === "rollDiceThree") {
        button.disabled = true;
        let rollDiceFour = document.getElementById("rollDiceFour");
        if (numberOfPlayers === 3) {
          rollDiceOne.disabled = false;
        } else {
          rollDiceFour.disabled = false;
        }
        break;
      } else {
        button.disabled = true;
        let rollDiceOne = document.getElementById("rollDiceOne");
        rollDiceOne.disabled = false;
        break;
      }
    }
  }
}

function RenderRollDiceResult(button, rollDiceResult) {
  if (button.id === "rollDiceOne") {
    resultFourthPlayer = document.getElementById("diceNumberFour");
    resultFirstPlayer = document.getElementById("diceNumberOne");
    rollDiceResultString = rollDiceResult.toString();
    resultFirstPlayer.innerHTML = rollDiceResultString;
    resultFourthPlayer.innerHTML = "0";
  } else if (button.id === "rollDiceTwo") {
    resultSecondPlayer = document.getElementById("diceNumberTwo");
    rollDiceResultString = rollDiceResult.toString();
    resultSecondPlayer.innerHTML = rollDiceResultString;
    resultFirstPlayer.innerHTML = "0";
  } else if (button.id === "rollDiceThree") {
    resultThirdPlayer = document.getElementById("diceNumberThree");
    rollDiceResultString = rollDiceResult.toString();
    resultThirdPlayer.innerHTML = rollDiceResultString;
    resultSecondPlayer.innerHTML = "0";
  } else {
    rollDiceResultString = rollDiceResult.toString();
    resultFourthPlayer.innerHTML = rollDiceResultString;
    resultThirdPlayer.innerHTML = "0";
  }
}

function selectPlayerToken(button) {
  if (button.id === "rollDiceOne") {
    const firstPlayer = localStorage.getItem("playerPreferences");
    const firstPlayerObject = JSON.parse(firstPlayer);
    const firstPlayerToken = firstPlayerObject._playerToken;
    return firstPlayerToken;
  } else if (button.id === "rollDiceTwo") {
    const secondPlayer = localStorage.getItem("secondaryPlayer2");
    const secondPlayerObject = JSON.parse(secondPlayer);
    const secondPlayerToken = secondPlayerObject._playerToken;
    return secondPlayerToken;
  } else if (button.id === "rollDiceThree") {
    let thirdPlayer = localStorage.getItem("secondaryPlayer3");
    let thirdPlayerObject = JSON.parse(thirdPlayer);
    let thirdPlayerToken = thirdPlayerObject._playerToken;
    return thirdPlayerToken;
  } else {
    let fourthPlayer = localStorage.getItem("secondaryPlayer4");
    let fourthPlayerObject = JSON.parse(fourthPlayer);
    let fourthplayerToken = fourthPlayerObject._playerToken;
    return fourthplayerToken;
  }
}

function convertToArray() {
  let matchReportString = localStorage.getItem("matchReport");
  matchReportSplited = matchReportString.split(",");
  let matchReportArray = [];
  for (let i = 0; i < matchReportSplited.length; i += 3) {
    var firstElement = parseInt(matchReportSplited[i]);
    var secondElement = parseInt(matchReportSplited[i + 1]);
    var thirdElement = matchReportSplited[i + 2] === "true";
    matchReportArray.push([firstElement, secondElement, thirdElement]);
  }
  return matchReportArray;
}

function catchPlayertokenPosition(playerToken) {
  let tokenPositionArray = [];
  let matchReport = convertToArray();
  for (let i = 0; i < matchReport.length; i++) {
    if (playerToken === matchReport[i][0]) {
      let tokenPosition = matchReport[i][1];
      let playerWin = matchReport[i][2];
      tokenPositionArray = [playerToken, tokenPosition, playerWin];
      return tokenPositionArray;
    }
  }
}

function DrawNewTokenPosition(newTokenPosition, coordinates) {
  let newPositionString = newTokenPosition[1].toString();
  for (let i = 0; i < coordinates.length; i++) {
    if (coordinates[i][0] === newPositionString) {
      let token = newTokenPosition[0];
      if (token === 1) {
        let oneToken = document.querySelector("div.oneToken");
        let adjustLeft = coordinates[i][1];
        adjustLeft += 20;
        let adjustTop = coordinates[i][2];
        adjustTop += 20;
        oneToken.style.left = adjustLeft + "px";
        oneToken.style.top = adjustTop + "px";
      } else if (token === 2) {
        let secondToken = document.querySelector("div.secondToken");
        let adjustLeft = coordinates[i][1];
        adjustLeft += 24;
        let adjustTop = coordinates[i][2];
        adjustTop += 24;
        secondToken.style.left = adjustLeft + "px";
        secondToken.style.top = adjustTop + "px";
      } else if (token === 3) {
        let thirdToken = document.querySelector("div.thirdToken");
        let adjustLeft = coordinates[i][1];
        adjustLeft += 26;
        let adjustTop = coordinates[i][2];
        adjustTop += 26;
        thirdToken.style.left = adjustLeft + "px";
        thirdToken.style.top = adjustTop + "px";
      } else {
        let fourthToken = document.querySelector("div.fourthToken");
        let adjustLeft = coordinates[i][1];
        adjustLeft += 17;
        let adjustTop = coordinates[i][2];
        adjustTop += 17;
        fourthToken.style.left = adjustLeft + "px";
        fourthToken.style.top = adjustTop + "px";
      }
    }
  }
}

function DrawListWinners(winners) {
  let listColumns = document.querySelectorAll("td.first-column");
  let tokens = document.querySelectorAll("div.token");
  listColumns.forEach((column) => {
    for (let i = 0; i < winners.length; i++) {
      if (column.id === "firstPlace" && winners[0] === 1) {
        tokens.forEach((token) => {
          let tokenNumber = winners[0];
          let tokenString = tokenNumber.toString();
          if (token.id === tokenString) {
            let imgCharacter = token.childNodes[1];
            let playerCharacter = imgCharacter.src;
            column.innerHTML = `<img class="p-1" src="${playerCharacter}" width="150px" height="150px" alt="imagen-jugador"/><p>ficha azul</p>`;
          }
        });
      } else if (column.id === "secondPlace" && winners[0] === 2) {
        tokens.forEach((token) => {
          let tokenNumber = winners[0];
          let tokenString = tokenNumber.toString();
          if (token.id === tokenString) {
            let imgCharacter = token.childNodes[1];
            let playerCharacter = imgCharacter.src;
            column.innerHTML = `<img class="p-1" src="${playerCharacter}" width="150px" height="150px" alt="imagen-jugador"/><p>ficha roja</p>`;
          }
        });
      } else if (column.id === "thirdPlace" && winners[0] === 3) {
        tokens.forEach((token) => {
          let tokenNumber = winners[0];
          let tokenString = tokenNumber.toString();
          if (token.id === tokenString) {
            let imgCharacter = token.childNodes[1];
            let playerCharacter = imgCharacter.src;
            column.innerHTML = `<img class="p-1" src="${playerCharacter}" width="150px" height="150px" alt="imagen-jugador"/><p>ficha Verde</p>`;
          }
        });
      }
      // if (column.id === "FourthPlace" && i === 4) {
      //   tokens.forEach((token) => {
      //     if (token.id === i[0]) {
      //       playerCharacter = token.childNodes;
      //       console.log(playerCharacter);
      //     }
      //   });
      // }
    }
    let matchState = localStorage.getItem("Match");
    let matchStateObject = JSON.parse(matchState);
    if(matchStateObject._matchState === "ended"){
      let modalBackground = document.getElementById("modalBackground");
      modalBackground.classList.remove("hide");
      let listModal = document.getElementById("listModal");
      listModal.classList.remove("hide");
    };
  });
}

function rollDiceButtonClick(button) {
  let rollDiceResult = Player.rollDice();
  RenderRollDiceResult(button, rollDiceResult);
  changePlayerTurn();
  let playerToken = selectPlayerToken(button);
  let tokenPosition = catchPlayertokenPosition(playerToken);
  let newTokenPosition = Player.moveToken(tokenPosition, rollDiceResult);
  DrawNewTokenPosition(newTokenPosition, coordinates);
  Match.updateMatchReport(newTokenPosition);
  let winners = Match.listWinners(listWinners);
  DrawListWinners(winners);
}

document.addEventListener("DOMContentLoaded", function () {
  createSecondaryPlayers();
  createMainPlayerMenu();
  createMainPlayerToken();
  Player.startMatch();
  Match.saveMatch(coordinates);
});

document.getElementById("playAudio").addEventListener("mouseover", function () {
  var audio = document.getElementById("menu-theme");
  audio.play();
});
