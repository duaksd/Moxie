import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const Cupom = sequelize.define('cupom', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  codigo: DataTypes.STRING,
  validade: DataTypes.DATE,
  desconto_percentual: DataTypes.DECIMAL(5,2),
  ativo: DataTypes.TINYINT
}, {
  tableName: 'cupom',
  timestamps: false
});

export default Cupom;