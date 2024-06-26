const { faker, th } = require('@faker-js/faker');

const { models } = require('./../libs/sequalize');
const sequalize = require('./../libs/sequalize');

const boom = require("@hapi/boom");
const { required } = require('joi');

class CompartidosService {
  constructor() {
  }


  async find() {
    const rta = await models.Compartir.findAll();
    return rta;
  }

  async findOne(id) {
    const compartir_rta = await models.Compartir.findByPk(id, {
      include: [
        {
          model: models.Usuario,
          as: 'usuario',
          attributes: ['nombre_usuario', 'ap1', 'ap2', 'foto_perfil', 'id_usuario'], // Especifica los campos que deseas
        },
        {
          model: models.Publicacion,
          as: 'publicacion',
          attributes: ['publicacion_data', 'publicacion_imagen', 'fecha_publicacion',], // Especifica los campos que deseas
        },
      ],
    });
    if (!compartir_rta) {
      throw boom.notFound('accion no encontrada');
    }
    return compartir_rta;
  }
  async findSharesByUser(query) {
    const { limit, offset, id_usuario } = query;
    const options = {
      include: [
        {
          model: models.Usuario,
          as: 'usuario',
          attributes: ['nombre_usuario', 'ap1', 'ap2'], // Especifica los campos que necesitas
        },
        {
          model: models.Publicacion, // Corrected model here
          as: 'publicacion', // Correct alias here
          attributes: ['id_usuario', 'publicacion_data', 'publicacion_imagen', 'fecha_publicacion'], // Especifica los campos que necesitas
        },
      ],
      where: { id_usuario: parseInt(id_usuario, 10) },
    };

    if (limit && offset) {
      options.limit = parseInt(limit, 10);
      options.offset = parseInt(offset, 10);
    }

    const rta = await models.Compartir.findAll(options);
    return rta;
  }


  async create(body) {
    const newCompartido = await models.Compartir.create(body);
    return newCompartido;
  }

  //sirve para contar el numero total de las reacciones
  async countCompartido(params) {
    const { id_publicacion } = params;
    const count = await models.Compartir.count({
      where: {
        id_publicacion: id_publicacion,
      }
    });
    return { compartidos: count };
  }

  //   async update(id, body) {
  //     const accion_modificada = await this.findOne(id);
  //     const rta = await accion_modificada.update(body);

  //     return rta;
  //   }

  //   async delete(id) {
  //     const accion_eliminada = await this.findOne(id);
  //     await accion_eliminada.destroy();
  //     return { id };
  //   }
}

module.exports = CompartidosService;
