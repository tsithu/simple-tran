/* eslint-disable security/detect-non-literal-require */
/* eslint-disable import/no-dynamic-require */

if (process.env.DB_NAME == null) {
  // eslint-disable-next-line global-require
  const dotenv = require('dotenv')
  dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })
}

const {
  env: {
    NODE_ENV = 'development',
    DB_HOSTNAME,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    APP_KEY,
    APP_SECRET,
    APP_SECRETS = 'KEteWS74wV^xgOr$PF%DySCt||a1rPU1B!9taf6A^!g^Nf||BP6CQTr1C@8yr*Igwfgq',
    HOST = 'localhost',
    PORT = 9090
  }
} = process

const config = require(`./${NODE_ENV}`)
const $config = Object.assign(config, {
  currentEnv: NODE_ENV,
  dbHostName: DB_HOSTNAME,
  dbPort: DB_PORT,
  dbName: DB_NAME,
  dbUser: DB_USER,
  dbPassword: DB_PASSWORD,
  appKey: APP_KEY,
  appSecret: APP_SECRET,
  appSecrets: APP_SECRETS.split('||'),
  host: HOST,
  port: PORT
})

module.exports = $config
