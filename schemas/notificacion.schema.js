const Joi = require('joi');

//validando el como debe de llegar el tipo de dato
const id_notificacion = Joi.number().integer();
const id_usuario = Joi.number().integer();
const id_usuario_origin = Joi.number().integer();
const id_accion = Joi.number().integer();
const fecha_notificacion = Joi.date();
const id_estado_notificacion = Joi.number().integer();
const estatus_notificacion = Joi.boolean();

const limit = Joi.number().integer();
const offset = Joi.number().integer();


const createNotificacionSchema = Joi.object({
  id_notificacion: id_notificacion,
  id_usuario: id_usuario.required(),
  id_usuario_origin: id_usuario_origin.required(),
  fecha_notificacion: fecha_notificacion,
  id_estado_notificacion: id_estado_notificacion.required(),
  id_accion: id_accion.required(),
  estatus_notificacion: estatus_notificacion.required()
});

const updateNotificacionSchema = Joi.object({

  id_usuario: id_usuario,
  id_usuario_origin: id_usuario_origin,
  fecha_notificacion: fecha_notificacion,
  id_estado_notificacion: id_estado_notificacion,
  id_accion: id_accion,
  estatus_notificacion: estatus_notificacion
});



const getNotificacionSchema = Joi.object({
  id_notificacion: id_notificacion.required(),
});


const getNotificacionesByStatus = Joi.object({
  id_usuario: id_usuario,

})

const queryNotificacionByUserSchema = Joi.object({
  limit: limit,
  offset: offset,
  id_usuario: id_usuario.required(),
});

const queryNotificacionSchema = Joi.object({
  limit: limit,
  offset: offset,
});



module.exports = {
  getNotificacionesByStatus,
  createNotificacionSchema,
  updateNotificacionSchema,
  getNotificacionSchema,
  getNotificacionesByStatus,
  queryNotificacionSchema,
  queryNotificacionByUserSchema
}

