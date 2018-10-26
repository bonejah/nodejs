const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");
const logger = require("./logger");

// conectar ao banco de dados utilizando os parametros
// informados atr´ves do módulo de configurações
mongoose.connect(
  config.DATABASE,
  { useNewUrlParser: true }
);

// configurar o mongoose para utilizar Promises nativas
mongoose.Promise = global.Promise;

// configurar o evento de conexão e exibir uma mensagem de sucesso
mongoose.connection.on("connected", () => {
  logger.info("MongoDB connected!");
});

// configurar o exevnto de desconexão
// caso o banco de dados seja desconectado, exibir um aviso e encerrar a aplicação
mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected!");
  process.exit(1);
});

// configurar o evento de erro
// caso ocorra algum erro no banco de dados, exibir um erro e encerrar o aplicação
mongoose.connection.on("error", err => {
  logger.error("MongoDB Error!", err.message);
  process.exit(1);
});

app.listen(config.PORT, () => {
  logger.info("Hello Winston");
  logger.info("Hello Dotenv");
  logger.info("Hello MongoDB");
  logger.info(`NODE_ENV: ${config.NODE_ENV}`);
  logger.info(`DATABASE: ${config.DATABASE}`);
  logger.info(`PORT: ${config.PORT}`);
});
