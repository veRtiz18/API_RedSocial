const { faker, th } = require('@faker-js/faker');

const { models } = require('../libs/sequalize');
const sequalize = require('../libs/sequalize');

const boom = require("@hapi/boom");
const { required } = require('joi');

class ReaccionesService {
  constructor() {
  }

  //este sirve para encontrar todas las reacciones disponibles
  async find() {
    const rta = await models.Reaccion.findAll();
    return rta;
  }

  //sirve para contar el numero total de las reacciones
  async countReaccion(params) {
    const { id_publicacion } = params;
    const count = await models.Reaccion.count({
      where: {
        id_publicacion: id_publicacion,
      }
    });
    return { reacciones: count };
  }

  //muestra el detalle de notificacion (falta publicacion)
  async findOne(id_reaccion) {
    const rta = await models.Reaccion.findByPk(id_reaccion);
    if (!rta) {
      return { message: `No existe un registro con el id ${id_reaccion}` }
    }
    return rta;
  }


  async findByReaccion(query) {
    const { limit, offset, id_publicacion } = query;

    const options = {
      include: [
        {
          model: models.Usuario,
          as: 'usuario',
          attributes: ['nombre_usuario'], // Specify the fields you need
        },
        // {
        //   model: models.Publicacion,
        //   as: 'publicacion',
        //   attributes: ['id_publicacion', 'id_usuario', 'publicacion_data', 'publicacion_imagen', 'fecha_publicacion', 'id_tipo_privacidad'],
        //   where: { id_publicacion: parseInt(id_publicacion, 10) },
        //   required: true
        // }
      ],
      where: { id_publicacion: parseInt(id_publicacion, 10) }
    };

    if (limit && offset) {
      options.limit = parseInt(limit, 10);
      options.offset = parseInt(offset, 10);
    }

    const rta = await models.Reaccion.findAll(options);
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


























  async create(body) {
    const newAccion = await models.Reaccion.create(body);
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

module.exports = ReaccionesService;
