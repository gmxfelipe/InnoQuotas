class Orcamento {
  static get tabela() {
    return "orcamentos";
  }
  constructor(objOrcamento) {
    this.data = "";
    this.email = "";
    this.mpTotal = "";
    this.mpDescricao = "";
    this.svTotal = "";
    this.svDescricao = "";
    Object.assign(this, objOrcamento);
  }
}

module.exports = Orcamento;
