const boom = require('@hapi/boom');
const { models } = require('../libs/sequalize');
const bcrypt = require('bcrypt');

class UsuarioService {
  constructor() {

  }

  async create(data) {
    const hash = await bcrypt.hash(data.contrasenia, 10);
    const newUsuario = await models.Usuario.create({
      ...data,
      contrasenia: hash
    });
    delete newUsuario.dataValues.contrasenia;
    return newUsuario;
  }

  async find() {
    const rta = await models.Usuario.findAll({
      include: ['publicaciones']
    });
    return rta;
  }

  async findByEmail(correo_electronico) {
    const rta = await models.Usuario.findOne({
      where: { correo_electronico },
      include: ['publicaciones']
    });
    return rta;
  }

  async findOne(id) {
    const usuario = await models.Usuario.findByPk(id, {
      include: ['publicaciones']
    });
    if (!usuario) {
      throw boom.notFound('user not found');
    }
    return usuario;
  }

  async update(id, changes) {
    const usuario = await this.findOne(id);
    const rta = await usuario.update(changes);
    return rta;
  }

  async delete(id) {
    const usuario = await models.Usuario.findByPk(id);
    if (!usuario) {
      throw boom.notFound('user not found');
    }
    await usuario.destroy();
    return { id };
  }
}

module.exports = UsuarioService;
