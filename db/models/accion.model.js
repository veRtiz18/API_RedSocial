const { Model, DataTypes, Sequelize } = require('sequelize');

const ACCION_TABLE = 'accion';

const AccionSchema = {
  id_accion: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,

  },
  nombre_accion: {
    allowNull: false,
    type: DataTypes.STRING
  },
  // Otros campos según tu necesidad
};

class Accion extends Model {
  static associate(models) {
    this.hasMany(models.Notificacion, {
      as: 'notificaciones',
      foreignKey: 'id_accion'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ACCION_TABLE,
      modelName: 'Accion',
      timestamps: false
    }
  }
}

module.exports = {
  ACCION_TABLE, AccionSchema, Accion
};
