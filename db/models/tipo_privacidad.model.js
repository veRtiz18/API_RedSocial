const { Model, DataTypes } = require('sequelize');

const TIPO_PRIVACIDAD_TABLE = 'tipo_privacidad';

const Tipo_Privacidad_Schema = {
  id_tipo_privacidad: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre_tipo_privacidad: {
    allowNull: false,
    type: DataTypes.STRING
  },
  // Otros campos según tu necesidad
};

class TipoPrivacidad extends Model {
  static associate(models) {
    this.hasMany(models.Publicacion, {
      as: 'publicacion',
      foreignKey: 'id_tipo_privacidad'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_PRIVACIDAD_TABLE,
      modelName: 'TipoPrivacidad',
      timestamps: false
    }
  }
}

module.exports = {
  TIPO_PRIVACIDAD_TABLE, Tipo_Privacidad_Schema, TipoPrivacidad
};
