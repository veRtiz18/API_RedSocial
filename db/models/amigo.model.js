const { Model, DataTypes } = require('sequelize');
const { USUARIO_TABLE } = require('./usuario.model');

const AMIGO_TABLE = 'amigo';

const AmigoSchema = {
  id_amistad: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  id_amigo1: {
    field: 'id_amigo1',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USUARIO_TABLE,
      key: 'id_usuario',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_amigo2: {
    field: 'id_amigo2',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USUARIO_TABLE,
      key: 'id_usuario',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  fecha_amistad: {
    allowNull: false,
    type: DataTypes.DATE,
  },
};

class Amigo extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, {
      as: 'amigo1',
      foreignKey: 'id_amigo1'
    });

    this.belongsTo(models.Usuario, {
      as: 'amigo2',
      foreignKey: 'id_amigo2'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: AMIGO_TABLE,
      modelName: 'Amigo',
      timestamps: false,
    };
  }
}

module.exports = {
  AMIGO_TABLE, AmigoSchema, Amigo
};
