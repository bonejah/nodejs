const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("@robertoachar/express-cors");
const express = require("express");
const helmet = require("helmet");
const { catchAll, notFound } = require("./error");

const app = express();
const router = require("./router"); // importa  rota principal

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/", (req, res) => res.json({ message: "Hello Express" }));
// app.get("/hello", (req, res) => res.json({ message: "Hello Express" }));

app.use("/", router); // integrar a rota principal

// Tratamento de erros deve ser configurado após todas as rotas serem declaradas
// Primeiro deve ser feito o tratamento para o erro 404 e por último o tratamento para o erro 500
// http://expressjs.com/pt-br/guide/error-handling.html
app.use(notFound); // 404
app.use(catchAll); // 500

module.exports = app;
