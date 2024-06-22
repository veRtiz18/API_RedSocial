const { ValidationError } = require('sequelize');
const { stack } = require('../routes/notificaciones.router');


function logErrors(err, req, res, next) {
  console.log('Aqui entra el logError');
  console.log(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log('Aqui entra el errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(
      output.payload
    );
  } else {
    next(err);
  }
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      message: err.name,
      errors: err.errors
    });
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
