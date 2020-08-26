const express = require("express");
const BancoUtils = require("../helpers/bancoUtils");
const Orcamento = require("../models/orcamento");
const routers = express.Router();

routers.get("/", (req, res) => {
  BancoUtils.select(Orcamento.tabela, (r) => {
    res.json(r);
  });
});

routers.post("/", (req, res) => {
  const orcamento = new Orcamento(req.body);
  BancoUtils.insert(orcamento, Orcamento.tabela, (r) => {
    res.json(r);
  });
});

routers.put("/:id", (req, res) => {
  const orcamentoNew = new Orcamento(req.body);
  BancoUtils.put(
    orcamentoNew,
    Orcamento.tabela,
    { key: "id", value: req.params.id },
    (r) => {
      res.json(r);
    }
  );
});

routers.delete("/:id", (req, res) => {
  BancoUtils.delete(
    Orcamento.tabela,
    { key: "id", value: req.params.id },
    (r) => {
      res.json(r);
    }
  );
});

module.exports = routers;
