const boom = require('@hapi/boom');
const { models } = require('./../libs/sequalize');

class TipoPrivacidadService {
  constructor() {

  }

  async create(data) {
    const newTipoPrivacidad = await models.TipoPrivacidad.create(data);
    return newTipoPrivacidad;
  }

  async find() {
    const rta = await models.TipoPrivacidad.findAll({
      include: ['publicaciones']
    });
    return rta;
  }

  async findOne(id) {
    const tipoprivacidad = await models.TipoPrivacidad.findByPk(id, {
      include: ['publicaciones']
    });
    if (!tipoprivacidad) {
      throw boom.notFound('privacy not found');
    }
    return tipoprivacidad;
  }

  async update(id, changes) {
    const tipoprivacidad = await this.findOne(id);
    const rta = await tipoprivacidad.update(changes);
    return rta;
  }

  async delete(id) {
    const tipoprivacidad = await models.TipoPrivacidad.findByPk(id);
    if (!tipoprivacidad) {
      throw boom.notFound('privacy not found');
    }
    await tipoprivacidad.destroy();
    return { id };
  }
}

module.exports = TipoPrivacidadService;
