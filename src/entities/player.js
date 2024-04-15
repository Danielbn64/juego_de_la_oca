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
