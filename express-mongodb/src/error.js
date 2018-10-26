// importa o modulo de registro de aplicações
const logger = require("./logger");

// definir a função que fará o tratamento do erro 404
module.exports.notFound = (req, res, next) => {
  // registrar o erro no log
  logger.warn("Não encontrado");

  // criar o erro personalizado
  const error = new Error("Not Found");
  error.status = 404;

  // passar o objeto error para o proximo middleware
  next(error);
};

// definir a função que fará o tratamento do erro 500
module.exports.catchAll = (err, req, res, next) => {
  // verificar se é um erro conhecido ou um erro inesperado
  const status = err.status || 500;
  const message = err.message || "Something broke!";

  // registrar o log de erro
  logger.error(message);

  // retornar o erro na resposta
  res.status(status).json({ error: { status, message } });
};
