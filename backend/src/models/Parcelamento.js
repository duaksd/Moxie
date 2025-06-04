import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const Parcelamento = sequelize.define('parcelamento', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  numero_parcelas: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  juros: { 
    type: DataTypes.DECIMAL(5, 2), 
    allowNull: true 
  },
  descricao: { 
    type: DataTypes.STRING, 
    allowNull: true 
  }
}, {
  tableName: 'parcelamento',
  timestamps: false
});

export default Parcelamento;
