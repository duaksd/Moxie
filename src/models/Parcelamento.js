import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const Parcelamento = sequelize.define('parcelamento', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantidade_parcelas: DataTypes.TINYINT,
  valor_juros: DataTypes.DECIMAL(5,2),
  ativo: DataTypes.TINYINT
}, {
  tableName: 'parcelamento',
  timestamps: false
});

export default Parcelamento;