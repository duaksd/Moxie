import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';
import Pedido from './Pedido.js';
import Parcelamento from './Parcelamento.js';

const Pagamento = sequelize.define('pagamento', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  pedido_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: {
      model: 'pedido',
      key: 'id'
    }
  },
  status_pagamento: { 
    type: DataTypes.ENUM('pendente', 'pago', 'falha'),
    allowNull: false
  },
  data_pagamento: { 
    type: DataTypes.DATE,
    allowNull: true
  },
  valor: { 
    type: DataTypes.DECIMAL(10,2), 
    allowNull: false 
  },
  parcelamento_id: { 
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'parcelamento',
      key: 'id'
    }
  }
}, {
  tableName: 'pagamento',
  timestamps: false
});

// ➡️ Relacionamentos
Pagamento.belongsTo(Pedido, { foreignKey: 'pedido_id' });
Pagamento.belongsTo(Parcelamento, { foreignKey: 'parcelamento_id' });

export default Pagamento;