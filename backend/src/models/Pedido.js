import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';
import Usuario from './Usuario.js';
import Endereco from './Endereco.js';

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

// Definindo relações:
Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Pedido.belongsTo(Endereco, { foreignKey: 'endereco_id' });

export default Pedido;
