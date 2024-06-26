const { Model, DataTypes } = require('sequelize');

const USUARIO_TABLE = 'usuario';

const UsuarioSchema = {
  id_usuario: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre_usuario: {
    allowNull: false,
    type: DataTypes.STRING
  },
  ap1: {
    allowNull: false,
    type: DataTypes.STRING
  },
  ap2: {
    allowNull: false,
    type: DataTypes.STRING
  },
  correo_electronico: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  contrasenia: {
    allowNull: false,
    type: DataTypes.STRING
  },
  fecha_nacimiento: {
    allowNull: false,
    type: DataTypes.DATE
  },
  foto_perfil: {
    allowNull: false,
    type: DataTypes.STRING
  }
};

class Usuario extends Model {
  static associate(models) {
    this.hasMany(models.Publicacion, {
      as: 'publicaciones',
      foreignKey: 'id_usuario'
    });

    this.hasMany(models.Reaccion, {
      as: 'reacciones',
      foreignKey: 'id_usuario'
    });

    this.hasMany(models.Comentario, {
      as: 'comentarios',
      foreignKey: 'id_usuario'
    });

    this.hasMany(models.Compartir, {
      as: 'compartidos',
      foreignKey: 'id_usuario'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIO_TABLE,
      modelName: 'Usuario',
      timestamps: false
    };
  }
}

module.exports = { USUARIO_TABLE, UsuarioSchema, Usuario };
