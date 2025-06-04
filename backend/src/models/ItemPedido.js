import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const ItemPedido = sequelize.define('item_pedido', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  produto_id: DataTypes.INTEGER,
  pedido_id: DataTypes.INTEGER,
  quantidade: DataTypes.INTEGER,
  preco_unitario: DataTypes.DECIMAL(10,2)
}, {
  tableName: 'item_pedido',
  timestamps: false
});

export default ItemPedido;