import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const Cupom = sequelize.define('cupom', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  codigo: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true, 
    validate: {
      notEmpty: { msg: 'O código do cupom não pode ser vazio.' }
    }
  },
  validade: { 
    type: DataTypes.DATE, 
    allowNull: false,
    validate: {
      isDate: { msg: 'A validade deve ser uma data válida.' }
    }
  },
  desconto_percentual: { 
    type: DataTypes.DECIMAL(5,2), 
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
      isDecimal: { msg: 'O desconto deve ser um número decimal entre 0 e 100.' }
    }
  },
  ativo: { 
    type: DataTypes.TINYINT, 
    allowNull: false, 
    defaultValue: 1,
    validate: {
      isIn: {
        args: [[0, 1]],
        msg: 'O campo ativo deve ser 0 (inativo) ou 1 (ativo).'
      }
    }
  }
}, {
  tableName: 'cupom',
  timestamps: false
});

export default Cupom;
