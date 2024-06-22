const { Model, DataTypes } = require('sequelize');

const ESTADO_NOTIFICACION_TABLE = 'estado_notificacion';

const Estado_Notificacion_Schema = {
  id_estado_notificacion: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre_estado_notificacion: {
    allowNull: false,
    type: DataTypes.STRING
  },
  // Otros campos según tu necesidad
};

class EstadoNotificacion extends Model {
  static associate(models) {
    this.hasMany(models.Notificacion, {
      as: 'notificaciones',
      foreignKey: 'id_estado_notificacion'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTADO_NOTIFICACION_TABLE,
      modelName: 'EstadoNotificacion',
      timestamps: false
    }
  }
}

module.exports = {
  ESTADO_NOTIFICACION_TABLE, Estado_Notificacion_Schema, EstadoNotificacion
};
