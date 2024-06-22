const { faker, th } = require('@faker-js/faker');

const { models } = require('./../libs/sequalize');
const sequalize = require('./../libs/sequalize');

const boom = require("@hapi/boom");

class AccionesService {
  constructor() {
  }


  async find() {
    const rta = await models.Accion.findAll();
    return rta;
  }

  async findOne(id) {
    const accion_buscada = await models.Accion.findByPk(
      id,
      {include: ['notificaciones']})
      ;

    if (!accion_buscada) {
      throw boom.notFound('accion no encontrada');
    }

    return accion_buscada;
  }

  async create(body) {
    const newAccion = await models.Accion.create(body);
    return newAccion;
  }

  async update(id, body) {
    const accion_modificada = await this.findOne(id);
    const rta = await accion_modificada.update(body);

    return rta;
  }

  async delete(id) {
    const accion_eliminada = await this.findOne(id);
    await accion_eliminada.destroy();
    return { id };
  }
}

module.exports = AccionesService;
