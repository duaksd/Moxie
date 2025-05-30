import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const Produto = sequelize.define('produto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  preco: DataTypes.DECIMAL(10,2),
  estoque: DataTypes.INTEGER,
  genero: DataTypes.ENUM('masculino', 'feminino', 'unisex'),
  categoria: DataTypes.STRING,
  tamanho: DataTypes.ENUM('PP', 'P', 'M', 'G', 'GG', 'EXG'),
  cor: DataTypes.STRING,
  imagem_url: DataTypes.STRING,
  ativo: DataTypes.TINYINT
}, {
  tableName: 'produto',
  timestamps: false
});

export default Produto;