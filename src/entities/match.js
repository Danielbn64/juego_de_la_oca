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
  //O si la ficha ha llegado ya a la meta:
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

  //Establece la posición de las fichas en su lugar despues de una recarga de la página
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

  //Establece la partida como finalizada cuando el penultimo jugador haya llegado a la casilla 60:
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

  //Lista los jugadores que han alcanzado la posicion 60:
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
