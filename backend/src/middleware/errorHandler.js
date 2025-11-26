const ApiError = require('../utils/ApiError');

const notFound = (req, _res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(statusCode).json({
    message: err.message || 'Something went wrong',
    ...(err.details ? { details: err.details } : {}),
  });
};

module.exports = {
  notFound,
  errorHandler,
};

