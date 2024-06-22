const { faker, th } = require('@faker-js/faker');

const { models } = require('./../libs/sequalize');
const sequalize = require('./../libs/sequalize');

const boom = require("@hapi/boom");
const { where } = require('sequelize');
const { id } = require('@hapi/joi/lib/base');
const { message } = require('../schemas/notificacion.schema');

class NotificacionesService {
  constructor() {
  }

  async generate() {
    const limit = 10;

    for (let index = 0; index < limit; index++) {
      this.notificaciones.push({
        id: faker.string.uuid(),
        id_usuario: parseInt(faker.commerce.price({ min: 10, max: 2500, dec: 0 })),
        fecha_notificacion: faker.date.past().toLocaleDateString('es-ES'),
        id_estado: faker.datatype.boolean(),
        accion_realizada: faker.datatype.boolean(),
      })
    }
  }

  async find(query) {
    const options = {
      include: [
        {
          model: models.Accion,
          as: 'accion',
          attributes: ['id_accion', 'nombre_accion'] // Especifica los campos que necesitas
        },
        {
          model: models.EstadoNotificacion,
          as: 'estadoNotificacion',
          attributes: ['id_estado_notificacion', 'nombre_estado_notificacion'] // Especifica los campos que necesitas
        },
        {
          model: models.Usuario,
          as: 'usuario',
          attributes: ['nombre_usuario'] // Especifica los campos que necesitas
        },
        {
          model: models.Usuario,
          as: 'usuario_origin',
          attributes: ['nombre_usuario'] // Especifica los campos que necesitas
        }
      ],

    }

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = parseInt(limit, 10);
      options.offset = parseInt(offset, 10);
    }

    const rta = await models.Notificacion.findAll(options);
    return rta;
  }

  async findByUser(query) {
    const { limit, offset, id_usuario } = query;

    const options = {
      include: [
        {
          model: models.Accion,
          as: 'accion',
          attributes: ['id_accion', 'nombre_accion'] // Especifica los campos que necesitas
        },
        {
          model: models.EstadoNotificacion,
          as: 'estadoNotificacion',
          attributes: ['id_estado_notificacion', 'nombre_estado_notificacion'] // Especifica los campos que necesitas
        },
        {
          model: models.Usuario,
          as: 'usuario',
          attributes: ['nombre_usuario'] // Especifica los campos que necesitas
        },
        {
          model: models.Usuario,
          as: 'usuario_origin',
          attributes: ['nombre_usuario'] // Especifica los campos que necesitas
        }
      ],
      where: { id_usuario: parseInt(id_usuario, 10) },
    };

    if (limit && offset) {
      options.limit = parseInt(limit, 10);
      options.offset = parseInt(offset, 10);
    }
    const rta = await models.Notificacion.findAll(options);
    return rta;
  }



  async findOne(id) {
    const notificacion_buscada = await models.Notificacion.findByPk(id,
      { include: ['accion'] });

    if (!notificacion_buscada) {
      throw boom.notFound('notificacion no encontrada');
    }

    return notificacion_buscada;
  }

  async countStatusNotification(params) {
    const { id_usuario } = params;
    const count = await models.Notificacion.count({
      where: {
        id_usuario: id_usuario,
        estatus_notificacion: 1
      }
    });
    return { notifications_not_read: count };
  }

  async update(id, body) {
    const notificacion_modificada = await this.findOne(id);
    const rta = await notificacion_modificada.update(body);
    return rta;
  }


  async create(body) {
    const newNotificacion = await models.Notificacion.create(body);
    return newNotificacion;
  }



  async delete(id) {
    const notificacion_eliminada = await this.findOne(id);
    await notificacion_eliminada.destroy();
    return { id };
  }

}

module.exports = NotificacionesService;
