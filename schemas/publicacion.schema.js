const Joi = require('joi');

const id_publicacion = Joi.number().integer();
const id_usuario = Joi.number().integer();
const publicacion_data = Joi.string();
const publicacion_imagen = Joi.string().uri();
const fecha_publicacion = Joi.date();
const id_tipo_privacidad = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createPublicacionSchema = Joi.object({
  id_usuario: id_usuario.required(),
  publicacion_data: publicacion_data.required(),
  publicacion_imagen: publicacion_imagen,
  fecha_publicacion: fecha_publicacion.required(),
  id_tipo_privacidad: id_tipo_privacidad.required(),
});

const updatePublicacionSchema = Joi.object({
  publicacion_data: publicacion_data,
  publicacion_imagen: publicacion_imagen,
  fecha_publicacion: fecha_publicacion,
  id_tipo_privacidad: id_tipo_privacidad,
});

const getPublicacionSchema = Joi.object({
  id_publicacion: id_publicacion.required(),
});

const queryPublicacionSchema = Joi.object({
  limit,
  offset
});

const queryPostsByUserSchema = Joi.object({
  limit: limit,
  offset: offset,
  id_usuario: id_usuario.required()
})

module.exports = { createPublicacionSchema, updatePublicacionSchema, getPublicacionSchema, queryPublicacionSchema, queryPostsByUserSchema };
