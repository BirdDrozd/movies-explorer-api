const allowedCors = [
  'http://localhost:3001',
  'https://localhost:3001',
  'http://interactiveservice.nomoredomainsrocks.ru',
  'https://interactiveservice.nomoredomainsrocks.ru',
  'https://api.interactiveservice.nomoredomainsrocks.ru'
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = 'authorization, access-control-request-headers, Content-Type';
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
