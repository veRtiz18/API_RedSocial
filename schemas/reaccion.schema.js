const Joi = require('joi');

//validando el como debe de llegar el tipo de dato
const id_reaccion = Joi.number().integer();
const id_publicacion = Joi.number().integer();
const id_usuario = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createReaccionSchema = Joi.object({
  id_publicacion: id_publicacion.required(),
  id_usuario: id_usuario.required()
});

const updateReaccionSchema = Joi.object({
  id_publicacion: id_publicacion,
  id_usuario, id_usuario
});

const getReaccionSchema = Joi.object({
  id_reaccion: id_reaccion.required(),
});

const getCountPublicaciones = Joi.object({
  id_publicacion: id_publicacion.required(),
});

const queryReaccionByUserSchema = Joi.object({
  limit: limit,
  offset: offset,
  id_publicacion: id_publicacion,
  id_usuario:id_usuario
});

module.exports = { createReaccionSchema, updateReaccionSchema, getReaccionSchema, getCountPublicaciones, queryReaccionByUserSchema }

