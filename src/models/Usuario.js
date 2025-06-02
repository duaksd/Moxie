// Usuario.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const Usuario = sequelize.define('usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  telefone: DataTypes.STRING,
  senha: DataTypes.STRING,
  status: DataTypes.ENUM('ativo', 'inativo')
}, {
  tableName: 'usuario',
  timestamps: false
});

export default Usuario;
