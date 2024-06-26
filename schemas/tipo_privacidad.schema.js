const Joi = require('joi');

const id_tipo_privacidad = Joi.number().integer();
const nombre_tipo_privacidad = Joi.string().min(10);

const createTipoPrivacidadSchema = Joi.object({
  nombre_tipo_privacidad: nombre_tipo_privacidad.required(),
});

const updateTipoPrivacidadSchema = Joi.object({
  nombre_tipo_privacidad: nombre_tipo_privacidad
});

const getTipoPrivacidadSchema = Joi.object({
  id_tipo_privacidad: id_tipo_privacidad.required(),
});

module.exports = { createTipoPrivacidadSchema, updateTipoPrivacidadSchema, getTipoPrivacidadSchema }
