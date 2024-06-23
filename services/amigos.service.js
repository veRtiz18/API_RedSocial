const { faker, th } = require('@faker-js/faker');

const { models } = require('../libs/sequalize');
const sequalize = require('../libs/sequalize');

const boom = require("@hapi/boom");
const { required } = require('joi');

class AmigosService {
  constructor() {
  }


  //muestra el detalle de notificacion (falta publicacion)
  async findOne(id_reaccion) {
    const rta = await models.Reaccion.findByPk(id_reaccion);
    if (!rta) {
      return { message: `No existe un registro con el id ${id_reaccion}` }
    }
    return rta;
  }


  //actualizar un registro
  async update(id_reaccion, body) {
    const reaccion_modificada = await this.findOne(id_reaccion);
    const rta = await reaccion_modificada.update(body);
    return rta;
  }

  async create(body) {
    const nuevaReaccion = await models.Reaccion.create(body);
    return nuevaReaccion;
  }


  async delete(id_reaccion) {
    const reaccion_eliminada = await this.findOne(id_reaccion);
    await reaccion_eliminada.destroy();
    return { "Registro eliminado": id_reaccion };
  }


}

module.exports = AmigosService;
