const express = require('express');

const notificacionesRouter = require('./notificaciones.router');
const accionesRouter = require('./acciones.router');
const reaccionesRouter = require('./reacciones.router');
const amigosRouter = require('./amigos.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/notificaciones', notificacionesRouter);
  router.use('/acciones', accionesRouter);
  router.use('/reacciones', reaccionesRouter);
  router.use('/amigos', amigosRouter);
}

module.exports = routerApi;
