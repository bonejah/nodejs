const config = require("./config");
const logger = require("./logger");

logger.info("Hello Winston");
logger.info("Hello Dotenv");
logger.info(`NODE_ENV: ${config.NODE_ENV}`);
