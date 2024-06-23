const Joi = require('joi');

//validando el como debe de llegar el tipo de dato
const id_amistad = Joi.number().integer();
const id_amigo1 = Joi.number().integer();
const id_amigo2 = Joi.number().integer();
const fecha_amistad = Joi.date();


const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createAmigoSchema = Joi.object({
  id_amigo1: id_amigo1.required(),
  id_amigo2: id_amigo2.required(),
  fecha_amistad: fecha_amistad.required(),
});

const updateAmigoSchema = Joi.object({
  id_amigo1: id_amigo1,
  id_amigo2, id_amigo2,
  fecha_amistad: fecha_amistad,
});

const getAmigoSchema = Joi.object({
  id_amistad: id_amistad.required(),
});

const getAmigo1Schema = Joi.object({
  id_amigo1: id_amigo1.required(),
});

const getAmigoDetail = Joi.object({
  id_amigo1: id_amigo1.required(),
  id_amigo2: id_amigo2.required(),
});


module.exports = { createAmigoSchema, updateAmigoSchema, getAmigoSchema, getAmigo1Schema, getAmigoDetail }

