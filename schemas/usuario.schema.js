const Joi = require('joi');

const id_usuario = Joi.number().integer();
const nombre_usuario = Joi.string();
const ap1 = Joi.string();
const ap2 = Joi.string();
const correo_electronico = Joi.string().email();
const contrasenia = Joi.string().min(8);
const fecha_nacimiento = Joi.date();
const foto_perfil = Joi.string().uri();

const createUsuarioSchema = Joi.object({
  nombre_usuario: nombre_usuario.required(),
  ap1: ap1.required(),
  ap2: ap2.required(),
  correo_electronico: correo_electronico.required(),
  contrasenia: contrasenia.required(),
  fecha_nacimiento: fecha_nacimiento.required(),
  foto_perfil: foto_perfil.required()
});

const updateUsuarioSchema = Joi.object({
  nombre_usuario: nombre_usuario,
  ap1: ap1,
  ap2: ap2,
  correo_electronico: correo_electronico,
  contrasenia: contrasenia,
  fecha_nacimiento: fecha_nacimiento,
  foto_perfil: foto_perfil
});

const getUsuarioSchema = Joi.object({
  id_usuario: id_usuario.required(),
});

module.exports = { createUsuarioSchema, updateUsuarioSchema, getUsuarioSchema }
