import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const Usuario = sequelize.define('usuario', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nome: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true,
    validate: {
      isEmail: true
    }
  },
  telefone: { 
    type: DataTypes.STRING 
  },
  senha: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  status: { 
    type: DataTypes.ENUM('ativo', 'inativo'), 
    allowNull: false, 
    defaultValue: 'ativo' 
  }
}, {
  tableName: 'usuario',
  timestamps: false
});

export default Usuario;