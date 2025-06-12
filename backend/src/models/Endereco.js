import { DataTypes } from 'sequelize';
import sequelize from '../database/ModelConnection.js';
import Usuario from './Usuario.js';

const Endereco = sequelize.define('endereco', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  usuario_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, // referência ao model importado
      key: 'id'
    }
  },
  tipo: { 
    type: DataTypes.ENUM('residencial', 'comercial', 'outro'),
    allowNull: true // Permite nulo, igual ao banco
  },
  cep: { 
    type: DataTypes.CHAR(8),
    allowNull: false
  },
  logradouro: { 
    type: DataTypes.STRING(100),
    allowNull: true // Permite nulo, igual ao banco
  },
  numero: { 
    type: DataTypes.STRING(10),
    allowNull: false
  },
  complemento: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  bairro: { 
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cidade: { 
    type: DataTypes.STRING(100),
    allowNull: false
  },
  estado: { 
    type: DataTypes.CHAR(2),
    allowNull: false
  }
}, {
  tableName: 'endereco',
  timestamps: false
});

// Relacionamentos
Endereco.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Usuario.hasMany(Endereco, { foreignKey: 'usuario_id', as: 'enderecos' });

export default Endereco;