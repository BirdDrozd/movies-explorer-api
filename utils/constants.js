const OK_CODE = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;

const SALT_ROUNDS = 10;
const urlPattern = /^((http|https):\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,6})+[a-zA-Z0-9-._~:\/?#[\]%@!$&'()*+,;=]*$/;

module.exports = {
  OK_CODE,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  SALT_ROUNDS,
  urlPattern,
};
