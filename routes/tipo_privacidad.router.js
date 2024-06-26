const express = require('express');
const router = express.Router();
const TipoPrivacidadService = require('../services/tipo_privacidad.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createTipoPrivacidadSchema, updateTipoPrivacidadSchema, getTipoPrivacidadSchema } = require('../schemas/tipo_privacidad.schema');

const service = new TipoPrivacidadService();

router.get('/', async (req, res, next) => {
  try {
    const privacidad = await service.find();
    res.json(privacidad);
  } catch (error) {
    next(error);
  }
});

router.get('/:id_tipo_privacidad',
  validatorHandler(getTipoPrivacidadSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_tipo_privacidad } = req.params;
      const privacidad = await service.findOne(id_tipo_privacidad);
      res.json(privacidad);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createTipoPrivacidadSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPrivacidad = await service.create(body);
      res.status(201).json(newPrivacidad);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id_tipo_privacidad',
  validatorHandler(getTipoPrivacidadSchema, 'params'),
  validatorHandler(updateTipoPrivacidadSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id_tipo_privacidad } = req.params;
      const body = req.body;
      const privacidad = await service.update(id_tipo_privacidad, body);
      res.json(privacidad);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id_tipo_privacidad',
  validatorHandler(getTipoPrivacidadSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id_tipo_privacidad } = req.params;
      const result = await service.delete(id_tipo_privacidad);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
