const express = require('express');

const PublicacionService = require('../services/publicacion.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createPublicacionSchema, updatePublicacionSchema, getPublicacionSchema, queryPublicacionSchema } = require('../schemas/publicacion.schema');

const router = express.Router();
const service = new PublicacionService();

router.get('/',
  validatorHandler(queryPublicacionSchema, 'query'),
  async (req, res, next) => {
    try {
      const publicacion = await service.find(req.query);
      res.json(publicacion);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id_publicacion',
  validatorHandler(getPublicacionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_publicacion } = req.params;
      const publicacion = await service.findOne(id_publicacion);
      res.json(publicacion);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createPublicacionSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPublicacion = await service.create(body);
      res.status(201).json(newPublicacion);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id_publicacion',
  validatorHandler(getPublicacionSchema, 'params'),
  validatorHandler(updatePublicacionSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id_publicacion } = req.params;
      const body = req.body;
      const publicacion = await service.update(id_publicacion, body);
      res.json(publicacion);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id_publicacion',
  validatorHandler(getPublicacionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_publicacion } = req.params;
      const rta = await service.delete(id_publicacion);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
