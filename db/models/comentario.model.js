const { Model, DataTypes, Sequelize } = require('sequelize');
const { PUBLICACION_TABLE } = require('./publicacion.model');
const { USUARIO_TABLE } = require('./usuario.model');

const COMENTARIO_TABLE = 'comentario';

const ComentarioSchema = {
  id_comentario: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,

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
  comentario_data: {
    allowNull: false,
    type: DataTypes.STRING
  },
  fecha_comentario: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  // Otros campos según tu necesidad
};

class Comentario extends Model {
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
      tableName: COMENTARIO_TABLE,
      modelName: 'Comentario',
      timestamps: false
    }
  }
}

module.exports = {
  COMENTARIO_TABLE, ComentarioSchema, Comentario
};
