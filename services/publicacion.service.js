const boom = require('@hapi/boom');
const { models } = require('../libs/sequalize');
// const bcrypt = require('bcrypt');

class PublicacionService {
  constructor() {}

  async create(data) {
    const newPublicacion = await models.Publicacion.create(data);
    return newPublicacion;
  }

  async find(query) {
    const options = {
      include: [
        {
          model: models.Usuario,
          as: 'usuario'  // Alias de la asociación 'usuario'
        },
        {
          model: models.TipoPrivacidad,
          as: 'privacidad'  // Alias de la asociación 'privacidad'
        }
      ]
    };

    // Desestructurar limit y offset de query y convertirlos a enteros
    const { limit, offset } = query;
    const parsedLimit = parseInt(limit, 10);
    const parsedOffset = parseInt(offset, 10);

    // Verifica si los valores son válidos y agrégalos a las opciones
    if (!isNaN(parsedLimit) && !isNaN(parsedOffset)) {
      options.limit = parsedLimit;
      options.offset = parsedOffset;
    }

    console.log('Options:', options); // Agrega esto para depurar

    const publicacion = await models.Publicacion.findAll(options);
    return publicacion;
  }

  async findOne(id) {
    const publicacion = await models.Publicacion.findByPk(id, {
      include: [
        {
          model: models.Usuario,
          as: 'usuario',  // Alias de la asociación 'usuario'
          attributes: ['id_usuario', 'nombre_usuario', 'ap1', 'ap2', 'correo_electronico', 'fecha_nacimiento', 'foto_perfil']
        },
        {
          model: models.TipoPrivacidad,
          as: 'privacidad'  // Alias de la asociación 'privacidad'
        }
      ]
    }

    );
    if (!publicacion) {
      throw boom.notFound('Publication not found');
    }
    return publicacion;
  }

  async update(id, changes) {
    const publicacion = await this.findOne(id);
    const rta = await publicacion.update(changes);
    return rta;
  }

  async delete(id) {
    const publicacion = await this.findOne(id);
    await publicacion.destroy();
    return { id };
  }
}

module.exports = PublicacionService;
