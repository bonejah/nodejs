// importa o dotenv e carrega as configuracoes do arquivo .env
require("dotenv").config();

// definir as variaveis de ambiente obrigatórios
const environment = ["NODE_ENV"];

// percorrer as variaveis de ambiente obrigatórios
// e disparar um erro caso alguma delas não seja informada
environment.forEach(name => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

// exporta um objeto com as configurações
module.exports = {
  NODE_ENV: process.env.NODE_ENV
};
