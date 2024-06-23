const { faker, th } = require('@faker-js/faker');

const { models } = require('../libs/sequalize');
const sequalize = require('../libs/sequalize');

const boom = require("@hapi/boom");
const { required } = require('joi');

class ComentarioService {
  constructor() {
  }

  //este sirve para encontrar todas las reacciones disponibles
  async find() {
    const rta = await models.Comentario.findAll();
    return rta;
  }

  //Sirve para contar el numero total de las reacciones
  async countComentario(params) {
    const { id_publicacion } = params;
    const count = await models.Comentario.count({
      where: {
        id_publicacion: id_publicacion,
      }
    });
    return { comentarios: count };
  }

  //Muestra el detalle de comentario
  async findOne(id_comentario) {
    const rta = await models.Comentario.findByPk(id_comentario);
    if (!rta) {
      return { message: `No existe un registro con el id ${id_comentario}` }
    }
    return rta;
  }

  async findByComentario(query) {
    const { limit, offset, id_publicacion } = query;
    const options = {
      include: [
        {
          model: models.Usuario,
          as: 'usuario',
          attributes: ['id_usuario', 'nombre_usuario'],
          required: true
        }
      ],
      where: { id_publicacion: parseInt(id_publicacion, 10) }
    };

    if (limit && offset) {
      options.limit = parseInt(limit, 10);
      options.offset = parseInt(offset, 10);
    }

    const rta = await models.Comentario.findAll(options);
    return rta;
  }

  //actualizar un registro
  async update(id_comentario, body) {
    const comentario_modificado = await this.findOne(id_comentario);
    const rta = await comentario_modificado.update(body);
    return rta;
  }

  async create(body) {
    const nuevoComentario = await models.Comentario.create(body);
    return nuevoComentario;
  }

  async delete(id_comentario) {
    const comentario_eliminado = await this.findOne(id_comentario);
    await comentario_eliminado.destroy();
    return { "Registro eliminado": id_comentario };
  }
}

module.exports = ComentarioService;
