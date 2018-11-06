const express = require("express");
const bodyParser = require("body-parser");
const port = 3001;

const server = express();

let logado = false;
const COLLABS = [
  {
    nick: "bonejah",
    qtd: 70
  },
  {
    nick: "let",
    qtd: 77
  }
];

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use((req, res, next) => {
  console.log("URL: ", req.url);
  if (logado) {
    next();
  } else {
    res.send("<h1>Você não está logado!</h1>");
  }
});

server.get("/collabs", (req, res) => {
  res.send(COLLABS);
});

server.post("/collabs", (req, res) => {
  const collab = req.body;
  COLLABS.push({ id: COLLABS.length + 1, ...collab });
  res.send(COLLABS);
});

server.use((req, res) => {
  res.send({ msg: "Esta rota nao tem funcionalidade!!" });
});

server.listen(port, () => {
  console.log(`Servidor iniciado em: http://localhost:${port}`);
});
