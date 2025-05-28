import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const Usuario = sequelize.define('usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  telefone: DataTypes.STRING,
  status: DataTypes.ENUM('ativo', 'inativo')
}, {
  tableName: 'usuario',
  timestamps: false // coloque true se sua tabela tem created_at/updated_at
});

export default Usuario;