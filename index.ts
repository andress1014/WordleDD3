import { Request, Response } from "express";

//**************** Configuración ******************************//
import app from "./src/config/app";
import logger from "./src/config/logger/logger"
import { DBPostgres, connection } from './src/config/postgres/postgres-sequelize';
import { HandlerException } from "./src/config/handlerException/handlerException";
import { Logger } from "winston";

const port = process.env.PORT;

//declare global logs use
declare global {
  var log: Logger;
}
global.log = logger;

//Handler de excepciones
app.use(HandlerException);


DBPostgres();


app.listen(port, () => {
  log.info(`[Server]: is running on port http://localhost:${port}`);
});
