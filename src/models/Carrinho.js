import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const Carrinho = sequelize.define('carrinho', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: DataTypes.INTEGER,
  produto_id: DataTypes.INTEGER,
  quantidade: DataTypes.INTEGER
}, {
  tableName: 'carrinho',
  timestamps: false
});

export default Carrinho;