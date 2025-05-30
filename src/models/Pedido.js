import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const Pedido = sequelize.define('pedido', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: DataTypes.INTEGER,
  data_pedido: DataTypes.DATE,
  status: DataTypes.ENUM('pendente', 'pago', 'enviado', 'entregue', 'cancelado'),
  endereco_id: DataTypes.INTEGER,
  total: DataTypes.DECIMAL(10,2)
}, {
  tableName: 'pedido',
  timestamps: false
});

export default Pedido;