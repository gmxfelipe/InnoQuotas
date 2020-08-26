class Planta {
  static get tabela() {
    return "plantas";
  }
  constructor(objPlanta) {
    this.qtdeFinal = "";
    this.qtdeInicial = "";
    Object.assign(this, objPlanta);
  }
}

module.exports = Planta;
