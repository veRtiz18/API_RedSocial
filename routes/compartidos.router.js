const express = require('express');
const CompartidosService = require('./../services/compartidos.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCompartirSchema, getCompartirSchema, getCountPublicaciones,
  queryCompartirByUserSchema
} = require('./../schemas/compartido.schema');

const router = express.Router();
const service = new CompartidosService();


router.get('/', async (req, res, next) => {
  try {
    const get_reacciones = await service.find();
    res.json(get_reacciones);
  } catch (error) {
    next(error);
  }
});

// //se usa para ver que usuarios reaccionaron a una publicación
// router.get('/reacciones_detail/',
//   validatorHandler(queryReaccionByUserSchema, 'query'),
//   async (req, res, next) => {
//     try {
//       const get_notificaciones = await service.findByReaccion(req.query);
//       res.json(get_notificaciones);
//     } catch (error) {
//       next(error);
//     }
//   });

router.get('/find_by_user/',
  validatorHandler(queryCompartirByUserSchema, 'query'),
  async (req, res, next) => {
    try {
      const get_compartidas = await service.findSharesByUser(req.query);
      res.json(get_compartidas);
    } catch (error) {
      next(error);
    }
  });

router.get('/:id_compartir',
  validatorHandler(getCompartirSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_compartir } = req.params;
      const get_compartir = await service.findOne(id_compartir);
      res.json(get_compartir);
    } catch (error) {
      next(error);
    }
  });

router.post('/', validatorHandler(createCompartirSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const nuevoCompartir = await service.create(body);
    res.status(201).json(nuevoCompartir);
  });

//para recuperar el número total de reacciones por publicación
router.get('/compartidas_publicacion/:id_publicacion',
  validatorHandler(getCountPublicaciones, 'params'),
  async (req, res, next) => {
    try {
      const get_compartidas = await service.countCompartido(req.params);
      res.json(get_compartidas);
    } catch (error) {
      next(error);
    }
  })



// //borrar registro de reaccion
// router.delete('/:id_reaccion', async (req, res) => {
//   const { id_reaccion } = req.params;
//   const respuesta = await service.delete(id_reaccion);
//   res.json({ message: "Registro eliminado exitosamente", respuesta });
// })

module.exports = router;
