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
      model: 'usuario', // nome da tabela relacionada
      key: 'id'
    }
  },
  tipo: { 
    type: DataTypes.ENUM('residencial', 'comercial', 'outro'),
    allowNull: false
  },
  cep: { 
    type: DataTypes.CHAR(8),
    allowNull: false
  },
  logradouro: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  numero: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  complemento: DataTypes.STRING,
  bairro: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  cidade: { 
    type: DataTypes.STRING,
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