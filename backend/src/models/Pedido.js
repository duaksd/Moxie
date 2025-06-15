import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const Pedido = sequelize.define('pedido', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  usuario_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'usuario', key: 'id' }
  },
  data_pedido: { 
    type: DataTypes.DATE, 
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  status: { 
    type: DataTypes.ENUM('pendente', 'pago', 'enviado', 'entregue', 'cancelado'), 
    allowNull: false, 
    defaultValue: 'pendente'
  },
  endereco_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'endereco', key: 'id' }
  },
  total: { 
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  }
}, {
  tableName: 'pedido',
  timestamps: false
});


export default Pedido;