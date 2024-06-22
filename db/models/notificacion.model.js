const { Model, DataTypes } = require('sequelize');
const { ACCION_TABLE } = require('./accion.model');
const { ESTADO_NOTIFICACION_TABLE } = require('./estado_notificacion.model');
const { USUARIO_TABLE } = require('./usuario.model');

const NOTIFICACION_TABLE = 'notificacion';

const NotificacionSchema = {
  id_notificacion: {
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
  id_usuario_origin: {
    field: 'id_usuario_origin',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USUARIO_TABLE,
      key: 'id_usuario',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  estatus_notificacion: {
    allowNull: false,
    defaultValue: true,
    type: DataTypes.BOOLEAN,
  },
  fecha_notificacion: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  id_estado_notificacion: {
    field: 'id_estado_notificacion',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ESTADO_NOTIFICACION_TABLE,
      key: 'id_estado_notificacion',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  id_accion: {
    field: 'id_accion',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ACCION_TABLE,
      key: 'id_accion',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
};

class Notificacion extends Model {
  static associate(models) {
    this.belongsTo(models.Accion, {
      as: 'accion',
      foreignKey: 'id_accion'
    });

    this.belongsTo(models.EstadoNotificacion, {
      as: 'estadoNotificacion',
      foreignKey: 'id_estado_notificacion'
    });

    this.belongsTo(models.Usuario, {
      as: 'usuario',
      foreignKey: 'id_usuario'
    });

    this.belongsTo(models.Usuario, {
      as: 'usuario_origin',
      foreignKey: 'id_usuario_origin'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NOTIFICACION_TABLE,
      modelName: 'Notificacion',
      timestamps: false
    }
  }
}

module.exports = {
  NOTIFICACION_TABLE, NotificacionSchema, Notificacion
};
