const Joi = require("joi");

const create = function () {
  return Joi.object({
    userName: Joi.string().required(),
    accountNumber: Joi.string().required(),
    emailAddress: Joi.string().required(),
    identityNumber: Joi.string().required(),
  });
};

const update = function () {
  return Joi.object({
    userName: Joi.string(),
    accountNumber: Joi.string(),
    emailAddress: Joi.string(),
    identityNumber: Joi.string(),
  });
};

module.exports = {
  create,
  update,
};
