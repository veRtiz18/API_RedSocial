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

  async findByIdAmigo1(id_amigo1) {
    const options = {
      include: [
        {
          model: models.Usuario,
          as: 'amigo2',
          attributes: ['nombre_usuario', 'ape1', 'ape2'],
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
          attributes: ['nombre_usuario', 'ape1', 'ape2','foto_perfil'],
        },
        {
          model: models.Usuario,
          as: 'amigo2',
          attributes: ['nombre_usuario', 'ape1', 'ape2', 'foto_perfil'],
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
