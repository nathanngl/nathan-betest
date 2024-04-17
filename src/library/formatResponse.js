const httpStatus = require('http-status');

function isClientErrorCategory(code) {
  return code >= 400 && code <= 500;
}

function sendResponse(res, code, message, data, error) {
  const result = {
    message,
    success: true,
    code,
  };

  if (data) {
    result.data = data;
  }

  if (isClientErrorCategory(code)) {
    result.success = false;
  }

  if (error) {
    result.success = false;
    console.log(error);
  }

  res.status(code);
  res.json(result);
}

exports.prepareListResponse = function (page, total, array, limit) {
  const result = {
    page,
    count: array.length,
    limit,
    total,
    result: array,
  };
  return result;
};

exports.ok = function ({ res, message, data }) {
  sendResponse(res, httpStatus.OK, message, data);
};

exports.created = function ({ res, message, data }) {
  sendResponse(res, httpStatus.CREATED, message, data);
};

exports.accepted = function ({ res, message, data }) {
  sendResponse(res, httpStatus.ACCEPTED, message, data);
};

exports.badRequest = function ({ res, message, err }) {
  let code = httpStatus.BAD_REQUEST;
  let msg = message;

  if (err && err.message) {
    msg = err.message;
  }

  if (message.code) {
    code = message.code;
    msg = message.message;
  }

  sendResponse(res, code, msg, null, err);
};

exports.badRequestWithData = function ({ res, message, err }) {
  let code = httpStatus.BAD_REQUEST;
  let msg = message;

  if (err && err.message) {
    msg = err.message;
  }

  if (message.code) {
    code = message.code;
    msg = message.message;
  }

  sendResponse(res, code, msg, err);
};

exports.unauthorized = function ({ res, message, err }) {
  sendResponse(res, httpStatus.UNAUTHORIZED, message, null, err);
};

exports.notFound = function ({ res, message, err }) {
  sendResponse(res, httpStatus.NOT_FOUND, message, null, err);
};

exports.conflict = function ({ res, message, err }) {
  sendResponse(res, httpStatus.CONFLICT, message, null, err);
};

exports.internalError = function ({ res, message, err }) {
  sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, message, null, err);
};