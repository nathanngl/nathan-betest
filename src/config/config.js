const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const pkg = require("../../package.json");

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    DB_HOST: Joi.string().required().description("Database host name"),
    DB_PORT: Joi.number().required().description("Database port"),
    DB_USER: Joi.string().required().description("Database user name"),
    DB_NAME: Joi.string().required().description("Database name"),
    DB_PASSWORD: Joi.string().required().description("Database password"),
    DB_LOGGING: Joi.string().required().description("Database logging"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(60)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which reset password token expires"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which verify email token expires"),
    MIDTRANS_URL: Joi.string().required().description("Midtrans URL"),
    MIDTRANS_CLIENT_KEY: Joi.string()
      .required()
      .description("Midtrans client key"),
    MIDTRANS_SERVER_KEY: Joi.string()
      .required()
      .description("Midtrans server key"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  name: pkg.name,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    port: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dbLogging: (process.env.DB_LOGGING || "").toLowerCase(),
  },
  logger: {
    driver: process.env.LOGGER_DRIVER || "console",
    papertrail: {
      host: process.env.PAPERTRAIL_HOST,
      port: process.env.PAPERTRAIL_PORT,
      level: process.env.PAPERTRAIL_LEVEL || "debug",
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  midtrans: {
    url: envVars.MIDTRANS_URL,
    clientKey: envVars.MIDTRANS_CLIENT_KEY,
    serverKey: envVars.MIDTRANS_SERVER_KEY,
  },
};
