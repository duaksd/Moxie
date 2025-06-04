import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';
import Produto from './Produto.js';
import Usuario from './Usuario.js';

const Carrinho = sequelize.define('carrinho', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  usuario_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuario',  // nome da tabela relacionada
      key: 'id'
    }
  },
  produto_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'produto',  // nome da tabela relacionada
      key: 'id'
    }
  },
  quantidade: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    defaultValue: 1 
  }
}, {
  tableName: 'carrinho',
  timestamps: false
});

// Definindo os relacionamentos::
Carrinho.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Carrinho.belongsTo(Produto, { foreignKey: 'produto_id' });

export default Carrinho;
