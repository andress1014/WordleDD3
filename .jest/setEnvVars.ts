import logger from '../src/config/logger/logger';

const variableTest = () => {
  global.log = logger;
  /**
   * Manejo de variables para test unitarios
   */
  process.env.JWT_SECRET = 'wordle';
  process.env.POSTGRES_HOST = 'localhost';
  process.env.POSTGRES_USER = 'sdf';
  process.env.POSTGRES_PASSWORD = 'dsgfsdfdsfsdf';
  process.env.POSTGRES_PORT = '5432';
  process.env.POSTGRES_DB = 'dfsf-core';
  process.env.POSTGRES_SCHEMA = 'sdfsfewe';
};
module.exports = variableTest;
