import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';

const Produto = sequelize.define('produto', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nome: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  descricao: { 
    type: DataTypes.TEXT 
  },
  preco: { 
    type: DataTypes.DECIMAL(10,2), 
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  estoque: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    defaultValue: 0
  },
  genero: { 
    type: DataTypes.ENUM('masculino', 'feminino', 'unisex'), 
    allowNull: false 
  },
  categoria: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  tamanho: { 
    type: DataTypes.ENUM('PP', 'P', 'M', 'G', 'GG', 'EXG'), 
    allowNull: false 
  },
  cor: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  imagem_url: { 
    type: DataTypes.STRING 
  },
  ativo: { 
    type: DataTypes.TINYINT, 
    allowNull: false, 
    defaultValue: 1 
  }
}, {
  tableName: 'produto',
  timestamps: false
});

export default Produto;
