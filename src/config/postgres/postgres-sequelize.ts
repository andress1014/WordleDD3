import { Sequelize } from 'sequelize';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_SCHEMA,
}: any = process.env;
/**
 * Configuracion de ORM
 */
export const connection = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  dialect: 'postgres',
  port: POSTGRES_PORT,
  logging: false,
  schema: POSTGRES_SCHEMA,
  sync: { force: true },
});
/**
 * Configuración de conección a Postgres
 */
export const DBPostgres = async () => {
  //await connection.sync();
  try {
    await connection.authenticate();
    log.info('[DatabasePostgres]: Connection has been established successfully.');
  } catch (error) {
    let message = '[DatabasePostgres]:Unable to connect to the database:';
    log.error(message);
    throw new Error(message);
  }
};
