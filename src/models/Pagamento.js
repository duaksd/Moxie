import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const Pagamento = sequelize.define('pagamento', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  pedido_id: DataTypes.INTEGER,
  status_pagamento: DataTypes.ENUM('pendente', 'pago', 'falha'),
  data_pagamento: DataTypes.DATE,
  valor: DataTypes.DECIMAL(10,2),
  parcelamento_id: DataTypes.INTEGER
}, {
  tableName: 'pagamento',
  timestamps: false
});

export default Pagamento;