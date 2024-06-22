const { Model, DataTypes } = require('sequelize');
const { USUARIO_TABLE } = require('./usuario.model');
const { PUBLICACION_TABLE } = require('./publicacion.model');

const REACCION_TABLE = 'reaccion';

const ReaccionSchema = {
  id_reaccion: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
    onDelete: 'CASCADE',
  },
  id_publicacion: {
    field: 'id_publicacion',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PUBLICACION_TABLE,
      key: 'id_publicacion',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

class Reaccion extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, {
      as: 'usuario',
      foreignKey: 'id_usuario',
    });

    this.belongsTo(models.Publicacion, {
      as: 'publicacion',
      foreignKey: 'id_publicacion',
    });

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: REACCION_TABLE,
      modelName: 'Reaccion',
      timestamps: false,
    };
  }
}

module.exports = {
  REACCION_TABLE, ReaccionSchema, Reaccion
};
