const { faker, th } = require('@faker-js/faker');

const { models } = require('../libs/sequalize');
const sequalize = require('../libs/sequalize');

const boom = require("@hapi/boom");
const { required } = require('joi');

class AmigosService {
  constructor() {
  }

  async find() {
    const rta = await models.Amigo.findAll();
    return rta;
  }

  async findOne(id_amistad) {
    const rta = await models.Amigo.findByPk(id_amistad);
    if (!rta) {
      return { message: `No existe un registro con el id ${id_amistad}` }
    }
    return rta;
  }

  async findByIdAmigo1(id_amigo1) {
    const options = {
      include: [
        {
          model: models.Usuario,
          as: 'amigo2',
          attributes: ['nombre_usuario', 'ap1', 'ap2'],
        },
      ],
      where: {
        id_amigo1: parseInt(id_amigo1, 10)
      }
    };
    const rta = await models.Amigo.findAll(options);

    if (!rta || rta.length === 0) {
      return { messageError: `No existe ningún registro de amigo1 con el parámetro ${id_amigo1}` };
    } else {
      return {
        id_amigo1: id_amigo1,
        amigos: rta
      };
    }
  }

  async find_amistad_detail(id_amigo1, id_amigo2) {
    const options = {
      include: [
        {
          model: models.Usuario,
          as: 'amigo1',
          attributes: ['nombre_usuario', 'ap1', 'ap2', 'foto_perfil'],
        },
        {
          model: models.Usuario,
          as: 'amigo2',
          attributes: ['nombre_usuario', 'ap1', 'ap2', 'foto_perfil'],
        },
      ],
      where: {
        id_amigo1: parseInt(id_amigo1, 10),
        id_amigo2: parseInt(id_amigo2, 10)
      }
    };
    const rta = await models.Amigo.findAll(options);

    if (!rta || rta.length === 0) {
      return { messageError: `No existe ningún registro de amigo1 con el parámetro ${id_amigo1}` };
    } else {
      return {
        amigos: rta
      };
    }
  }


  async create(body) {
    const nueva_amistad = await models.Amigo.create(body);
    return nueva_amistad;
  }

  async delete(id_amistad) {
    const amistad_eliminada = await this.findOne(id_amistad);
    await amistad_eliminada.destroy();
    return { "Registro eliminado": id_amistad };
  }

}

module.exports = AmigosService;
