const express = require('express');
const ReaccionesService = require('./../services/reacciones.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createReaccionSchema, updateReaccionSchema, getReaccionSchema, getCountPublicaciones,
  queryReaccionByUserSchema
} = require('./../schemas/reaccion.schema');

const router = express.Router();
const service = new ReaccionesService();


router.get('/', async (req, res, next) => {
  try {
    const get_reacciones = await service.find();
    res.json(get_reacciones);
  } catch (error) {
    next(error);
  }
});

//se usa para ver que usuarios reaccionaron a una publicación
router.get('/reacciones_detail/',
  validatorHandler(queryReaccionByUserSchema, 'query'),
  async (req, res, next) => {
    try {
      const get_notificaciones = await service.findByReaccion(req.query);
      res.json(get_notificaciones);
    } catch (error) {
      next(error);
    }
  });


router.get('/:id_reaccion',
  validatorHandler(getReaccionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_reaccion } = req.params;
      const get_acciones = await service.findOne(id_reaccion);
      res.json(get_acciones);
    } catch (error) {
      next(error);
    }
  })

//para recuperar el número total de reacciones por publicación
router.get('/reacciones_publicacion/:id_publicacion',
  validatorHandler(getCountPublicaciones, 'params'),
  async (req, res, next) => {
    try {
      const get_reacciones = await service.countReaccion(req.params);
      res.json(get_reacciones);
    } catch (error) {
      next(error);
    }
  })

router.post('/',
  validatorHandler(createReaccionSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newReaccion = await service.create(body);
      res.status(201).json(newReaccion);
    } catch (error) {
      next(error);
    }
  });

//borrar registro de reaccion
router.delete('/:id_reaccion', async (req, res) => {
  const { id_reaccion } = req.params;
  const respuesta = await service.delete(id_reaccion);
  res.json({ message: "Registro eliminado exitosamente", respuesta });
})

module.exports = router;
