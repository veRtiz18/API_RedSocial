const express = require('express');
const AmigosService = require('./../services/amigos.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createAmigoSchema, updateAmigoSchema, getAmigoSchema, getAmigo1Schema, getAmigoDetail } = require('./../schemas/amigo.schema');

const router = express.Router();
const service = new AmigosService();


router.get('/', async (req, res, next) => {
  try {
    const get_amigo = await service.find();
    res.json(get_amigo);
  } catch (error) {
    next(error);
  }
});

router.get('/amistad/:id_amigo1',
  validatorHandler(getAmigo1Schema, 'params'),
  async (req, res, next) => {
    try {
      const { id_amigo1 } = req.params;
      const get_id_amigo1 = await service.findByIdAmigo1(id_amigo1);
      res.json(get_id_amigo1);
    } catch (error) {
      next(error);
    }
  });

  router.get('/detalle_amistad/:id_amigo1/:id_amigo2',
    validatorHandler(getAmigoDetail, 'params'),
    async (req, res, next) => {
      try {
        const { id_amigo1, id_amigo2 } = req.params;
        const get_id_amigo1 = await service.find_amistad_detail(id_amigo1, id_amigo2);
        res.json(get_id_amigo1);
      } catch (error) {
        next(error);
      }
    });



router.get('/:id_amigo1',
  validatorHandler(getAmigo1Schema, 'params'),
  async (req, res, next) => {
    try {
      const { id_amigo1 } = req.params;
      const get_id_amigo1 = await service.findOne(id_amigo1);
      res.json(get_id_amigo1);
    } catch (error) {
      next(error);
    }
  });



// //para recuperar el número total de reacciones por publicación
// router.get('/reacciones_publicacion/:id_publicacion',
//   validatorHandler(getCountPublicaciones, 'params'),
//   async (req, res, next) => {
//     try {
//       const get_reacciones = await service.countReaccion(req.params);
//       res.json(get_reacciones);
//     } catch (error) {
//       next(error);
//     }
//   })

// //borrar registro de reaccion
// router.delete('/:id_reaccion', async (req, res) => {
//   const { id_reaccion } = req.params;
//   const respuesta = await service.delete(id_reaccion);
//   res.json({ message: "Registro eliminado exitosamente", respuesta });
// })

module.exports = router;
