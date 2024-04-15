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
