const express = require('express');

const NotificacionesService = require('./../services/notificaciones.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createNotificacionSchema,
  updateNotificacionSchema,
  getNotificacionSchema,
  getNotificacionesByStatus,
  changeStatusNotification,
  queryNotificacionSchema, queryNotificacionByUserSchema
} = require('./../schemas/notificacion.schema')


//implementacion de middlewares y validacion de datos
//const {createNotificacionSchema, updateNotificacionSchema, getNotificacionSchema } = require('./../schemas/notificaciones.schema');
const router = express.Router();
const service = new NotificacionesService();

router.get('/',
  validatorHandler(queryNotificacionSchema, 'query'),
  async (req, res, next) => {
    try {
      const get_notificaciones = await service.find(req.query);
      res.json(get_notificaciones);
    } catch (error) {
      next(error);
    }
  });


router.get('/find_by_user/',
  validatorHandler(queryNotificacionByUserSchema, 'query'),
  async (req, res, next) => {
    try {
      const get_notificaciones = await service.findByUser(req.query);
      res.json(get_notificaciones);
    } catch (error) {
      next(error);
    }
  });


router.get('/:id',
  validatorHandler(getNotificacionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const get_notificaciones = await service.findOne(id);
      res.json(get_notificaciones);
    } catch (error) {
      next(error);
    }
  })

//para recuperar el número de notificaciones por leídas y no leídas
router.get('/notification_active/:id_usuario',
  validatorHandler(getNotificacionesByStatus, 'params'),
  async (req, res, next) => {
    try {
      const get_notificaciones = await service.countStatusNotification(req.params);
      res.json(get_notificaciones);
    } catch (error) {
      next(error);
    }
  })


router.patch('/:id',
  validatorHandler(getNotificacionSchema, 'params'),
  validatorHandler(updateNotificacionSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const notificacion = await service.update(id, body);
      res.json(notificacion);
    } catch (error) {
      next(error);

    }
  }
)

router.post('/', validatorHandler(createNotificacionSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const nuevaNotificacion = await service.create(body);
    res.status(200).json(nuevaNotificacion);
  });

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const respuesta = await service.delete(id);
  res.json(respuesta);
})
module.exports = router;

