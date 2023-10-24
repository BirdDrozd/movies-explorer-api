const allowedCors = [
  'http://localhost:3001',
  'https://localhost:3001',
  'http://moviesearch.nomoredomainsrocks.ru',
  'https://moviesearch.nomoredomainsrocks.ru',
  'https://api.moviesearch.nomoredomainsrocks.ru',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers || {};
  const { method } = req;
  const requestHeaders = 'authorization, access-control-request-headers, Content-Type';
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (allowedCors.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.setHeader('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};