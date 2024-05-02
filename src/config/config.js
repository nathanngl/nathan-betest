const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    APP_DOMAIN: Joi.string().required(),
    PORT: Joi.number().default(3000),
    DB_URI: Joi.string().required().description("Mongo DB url"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which reset password token expires"),
    REDIS_HOST: Joi.string().required().description("Redis host"),
    REDIS_PORT: Joi.number().default(6379).description("Redis port"),
    KAFKA_CLIENT_ID: Joi.string().required().description("Kafka client id"),
    KAFKA_BROKERS_URI: Joi.string().required().description("Kafka brokers uri"),
    KAFKA_TOPIC_TEST: Joi.string().required().description("Kafka topic test"),
    KAFKA_GROUP_TEST: Joi.string().required().description("Kafka group test"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  appDomain: envVars.APP_DOMAIN,
  db: {
    url: envVars.DB_URI,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
  },
  kafka: {
    clientId: envVars.KAFKA_CLIENT_ID,
    brokers: [envVars.KAFKA_BROKERS_URI],
    topicTest: envVars.KAFKA_TOPIC_TEST,
    groupTest: envVars.KAFKA_GROUP_TEST,
  },
};
