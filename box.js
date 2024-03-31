class Box {
    constructor(boxStart, boxEnd, boxNumber) {
        this._boxStart = boxStart;
        this._boxEnd = boxEnd;
        this._boxNumber = boxNumber;
    }

    getboxStart() {
        return this._boxStart;
    }

    setboxStart(newBoxStart) {
        this._boxStart = newBoxStart;
    }

    getboxEnd() {
        return this._boxEnd;
    }

    setboxEnd(newBoxEnd) {
        this._boxEnd = newBoxEnd;
    }

    getboxNumber() {
        return this._boxNumber;
    }

    setboxNumber(newBoxNumber) {
        this._boxNumber = newBoxNumber;
    }

    returnPlayer() {
        console.log(`Retornando jugador en la casilla ${this._boxNumber}`);
    }
}

export default Box;