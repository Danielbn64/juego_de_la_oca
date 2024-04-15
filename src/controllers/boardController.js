"use strinct";

//Clases que se van a utilizar en este controlador, No se han importado en forma de
//módulos para facilitar el despliegue y la revisión de la tarea:
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

class Board {
  //Obtiene todas las coordenadas de las casillas del tablero:
  static mapBoardSkeleton() {
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

//Imagen de cada jugador:
const mainPlayer = document.getElementById("mainPlayer");
const secondPlayer = document.getElementById("secondPlayer");
const thirdPlayer = document.getElementById("thirdPlayer");
const fourthPlayer = document.getElementById("fourthPlayer");

//Botones de dado de cada jugador:
const mainPlayerControl = document.getElementById("mainPlayerControl");
const secondPlayerControl = document.getElementById("secondPlayerControl");
const thirdPlayerControl = document.getElementById("thirdPlayerControl");
const fourthPlayerControl = document.getElementById("fourthPlayerControl");

//Etiqueta de reproductor de audio:
const playMusic = document.getElementById("playMusic");
const mute = document.getElementById("Mute");

//Array de coordenadas del tablero:
const coordinates = Board.mapBoardSkeleton();

//Array de ganadores:
let listWinners = [];

//Elige un personaje aleatorio para los jugadores secundarios:
function ChoseRamdomCharacter(charactersArray) {
  let randomCharacterNumber = Math.floor(
    Math.random() * charactersArray.length
  );
  let randomCharacter = charactersArray[randomCharacterNumber];
  return randomCharacter;
}

//Evita que se repitan personajes a la hora de crear a los jugadores:
function filterSelectedCharacter(charactersArray, character) {
  charactersArray = charactersArray.filter((element) => element !== character);
  return charactersArray;
}

//Dibuja en el html el botón del dado del jugador principal:
function createMainPlayerMenu() {
  let playerPreferences = localStorage.getItem("playerPreferences");
  let playerPreferencesObject = JSON.parse(playerPreferences);
  let playerCharacter = playerPreferencesObject._playerCharacter;
  mainPlayer.innerHTML = `
  <img class="p-1" src="../assets/images/${playerCharacter}.jpg" width="100px" height="100px" alt="imagen-jugador"/>
  <div class="player-info d-flex flex-column">
  <h4>Personaje:</h4>
      <p>${playerCharacter}</p>
      <h4>Ficha:</h4>
      <p>Azul</p>
  </div>`;
  mainPlayerControl.classList.remove("hide");
}

//Dibuja la ficha del jugador principal:
function createMainPlayerToken() {
  let playerPreferences = localStorage.getItem("playerPreferences");
  let playerPreferencesObject = JSON.parse(playerPreferences);
  let playerId = playerPreferencesObject._playerId;
  let playerToken = document.getElementById(playerId);
  playerToken.classList.remove("hide");
  let playerCharacter = playerPreferencesObject._playerCharacter;
  playerToken.innerHTML = `
  <img class="token-img align-self" src="../assets/images/${playerCharacter}.jpg" width="50px" height="50px" alt="imagen-jugador"/>
  `;
}

//Dibuja la ficha del resto de jugadores:
function createPlayerToken(player) {
  playerIdString = player.getplayerId().toString();
  let playerToken = document.getElementById(playerIdString);
  playerToken.classList.remove("hide");
  let playerCharacter = player.getplayerCharacter();
  playerToken.innerHTML = `
  <img class="token-img align-self" src="../assets/images/${playerCharacter}.jpg" width="50px" height="50px" alt="imagen-jugador"/>
  `;
}

//Controla la cantidad de jugadores que se ve en la pantalla, 
//para que solo se vea la cantidad de jugadores:
function createSecondaryPlayersBench(player) {
  let playerId = player.getplayerId();
  if (playerId === 2) {
    let playerCharacter = player.getplayerCharacter();
    secondPlayer.classList.remove("hide");
    secondPlayer.innerHTML = `
    <img class="p-1" src="../assets/images/${playerCharacter}.jpg" width="100px" height="100px" alt="imagen-jugador"/>
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
    <img class="p-1" src="../assets/images/${playerCharacter}.jpg" width="100px" height="100px" alt="imagen-jugador"/>
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
    <img class="p-1" src="../assets/images/${playerCharacter}.jpg" width="100px" height="100px" alt="imagen-jugador"/>
    <div class="player-info d-flex flex-column">
    <h4>Personaje:</h4>
        <p>${playerCharacter}</p>
        <h4>Ficha:</h4>
        <p>Amarilla</p>
    </div>`;
    fourthPlayerControl.classList.remove("hide");
  }
}

//Crea los jugadores secundarios de forma aleatoria:
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

//Habilita el botón de tirar dados para el jugador que le toque el turno:
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

//Muestra el resultado de tirar el dado de cada jugador:
function renderRollDiceResult(button, rollDiceResult) {
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

//Obtiene la ficha de cada jugador:
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

//Este es un método auxiliar que transforma la información del reporte de partida que se
//guarda en el localStorage y lo devuelve como un array:
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

//Busca la ficha y la posición del jugador al que le toca su turno:
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

function drawNewTokenPosition(newTokenPosition, coordinates) {
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

//Muestra la lista de ganandores:
function showListWinners() {
  let matchState = localStorage.getItem("Match");
  let matchStateObject = JSON.parse(matchState);
  if (matchStateObject._matchState === "ended") {
    let modalBackground = document.getElementById("modalBackground");
    modalBackground.classList.remove("hide");
    let listModal = document.getElementById("listModal");
    listModal.classList.remove("hide");
  }
}

//Dibuja la lista de ganandores:
function drawListWinners(winners) {
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
      }else{
        
      }
    }
  });
}

//Activa el evento de tirar los dados:
function rollDiceButtonClick(button) {
  let rollDiceResult = Player.rollDice();
  renderRollDiceResult(button, rollDiceResult);
  changePlayerTurn();
  let playerToken = selectPlayerToken(button);
  let tokenPosition = catchPlayertokenPosition(playerToken);
  let newTokenPosition = Player.moveToken(tokenPosition, rollDiceResult);
  drawNewTokenPosition(newTokenPosition, coordinates);
  Match.updateMatchReport(newTokenPosition);
  let winners = Match.listWinners(listWinners);
  drawListWinners(winners);
  showListWinners();
}

//Realiza funciones al cargar la página:
document.addEventListener("DOMContentLoaded", function () {
  createSecondaryPlayers();
  createMainPlayerMenu();
  createMainPlayerToken();
  Player.startMatch();
  Match.saveMatch(coordinates);
});

//Otorga funcionamiento al botón de reiniciar partida:
resetMatch.addEventListener("click", function () {
  Match.restartMatch();
});

//Reproduce música:
playMusic.addEventListener("click", function () {
  let audio = document.getElementById("boardTheme");
  audio.play();
});

//Silencia música:
Mute.addEventListener("click", function () {
  let audio = document.getElementById("boardTheme");
  audio.muted = !audio.muted;
});
