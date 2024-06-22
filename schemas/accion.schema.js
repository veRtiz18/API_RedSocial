const Joi = require('joi');

//validando el como debe de llegar el tipo de dato
const id = Joi.number().integer();
const nombre_accion = Joi.string();

const createAccionSchema = Joi.object({
  id: id,
  nombre_accion: nombre_accion.required()
});

const updateAccionSchema = Joi.object({
  id: id,
  nombre_accion: nombre_accion,

});

const getAccionSchema = Joi.object({
  id: id.required(),
});

module.exports = { createAccionSchema, updateAccionSchema, getAccionSchema }

