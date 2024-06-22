const { Model, DataTypes } = require('sequelize');
const { USUARIO_TABLE } = require('./usuario.model');
const { TIPO_PRIVACIDAD_TABLE } = require('./tipo_privacidad.model');


const PUBLICACION_TABLE = 'publicacion';

const PublicacionSchema = {
  id_publicacion: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  id_usuario: {
    field: 'id_usuario',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USUARIO_TABLE,
      key: 'id_usuario',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  publicacion_data: {
    allowNull: false,
    type: DataTypes.STRING
  },
  publicacion_imagen: {
    allowNull: true,
    type: DataTypes.STRING
  },
  fecha_publicacion: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  id_tipo_privacidad: {
    field: 'id_tipo_privacidad',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: TIPO_PRIVACIDAD_TABLE,
      key: 'id_tipo_privacidad',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

}
class Publicacion extends Model {
  static associate(models) {

    this.belongsTo(models.Usuario, {
      as: 'usuario',
      foreignKey: 'id_usuario'
    });

    this.belongsTo(models.TipoPrivacidad, {
      as: 'privacidad',
      foreignKey: 'id_tipo_privacidad'
    });


    this.hasMany(models.Reaccion, {
      as: 'publicacion',
      foreignKey: 'id_publicacion'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PUBLICACION_TABLE,
      modelName: 'Publicacion',
      timestamps: false
    }
  }
}

module.exports = {
  PUBLICACION_TABLE, PublicacionSchema, Publicacion
};
