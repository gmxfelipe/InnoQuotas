const express = require("express");
const jwt = require("jsonwebtoken");
const BancoUtils = require("../helpers/bancoUtils");
const Usuario = require("../models/usuario");
const UsuarioDAO = require("../models/usuarioDAO");
const Utils = require("../helpers/utils");
const segredo = "AluninhoFeliz";
const routers = express.Router();

routers.post("/auth", (req, res) => {
  const usuario = new Usuario(req.body);
  usuario.setarSenha(req.body.senha);
  new UsuarioDAO().buscarPorUsuarioESenha(usuario, (resposta) => {
    if (resposta.length > 0) {
      const token = jwt.sign(
        {
          id: Utils.criptografa("" + resposta[0].id),
          nome: resposta[0].nome,
        },
        segredo,
        {
          expiresIn: "1h",
        }
      );
      res.cookie("token", token);
      res.json(token);
    } else {
      res.status(301);
    }
  });
});

routers.get("/", (req, res) => {
  BancoUtils.select(Usuario.tabela, (usuarios) => {
    res.json(usuarios);
  });
});

routers.post("/", (req, res) => {
  const usuario = new Usuario(req.body);
  usuario.setarSenha(usuario.senha);
  BancoUtils.insert(usuario, Usuario.tabela, (r) => {
    res.json(r);
  });
});

routers.put("/:id", (req, res) => {
  const usuario = new Usuario(req.body);
  usuario.setarSenha(usuario.senha);
  BancoUtils.put(
    usuario,
    Usuario.tabela,
    {
      key: "id",
      value: req.params.id,
    },
    (r) => {
      res.json(r);
    }
  );
});

routers.delete("/:id", (req, res) => {
  BancoUtils.delete(
    Usuario.tabela,
    {
      key: "id",
      value: req.params.id,
    },
    (r) => {
      res.json(r);
    }
  );
});

module.exports = routers;
