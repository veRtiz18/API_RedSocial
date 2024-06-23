const Joi = require('joi');

//validando el como debe de llegar el tipo de dato
const id_comentario = Joi.number().integer();
const id_publicacion = Joi.number().integer();
const id_usuario = Joi.number().integer();
const comentario_data = Joi.string();
const fecha_comentario = Joi.date();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createComentarioSchema = Joi.object({
  id_publicacion: id_publicacion.required(),
  id_usuario: id_usuario.required(),
  comentario_data: comentario_data.required(),
  fecha_comentario: fecha_comentario.required()
});

const updateComentarioSchema = Joi.object({
  id_publicacion: id_publicacion,
  id_usuario, id_usuario,
  comentario_data: comentario_data,
  fecha_comentario: fecha_comentario
});

const getComentarioSchema = Joi.object({
  id_comentario: id_comentario.required(),
});

const getCountComentario = Joi.object({
  id_publicacion: id_publicacion.required(),
});

const queryComentarioByUserSchema = Joi.object({
  limit: limit,
  offset: offset,
  id_publicacion: id_publicacion,
  id_usuario: id_usuario
});

module.exports = { queryComentarioByUserSchema, createComentarioSchema, updateComentarioSchema, getComentarioSchema, getCountComentario, }

