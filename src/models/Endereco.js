import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const Endereco = sequelize.define('endereco', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: DataTypes.INTEGER,
  tipo: DataTypes.ENUM('residencial', 'comercial', 'outro'),
  cep: DataTypes.CHAR(8),
  logradouro: DataTypes.STRING,
  numero: DataTypes.STRING,
  complemento: DataTypes.STRING,
  bairro: DataTypes.STRING,
  cidade: DataTypes.STRING,
  estado: DataTypes.CHAR(2)
}, {
  tableName: 'endereco',
  timestamps: false
});

export default Endereco;