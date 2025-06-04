import Usuario from './Usuario.js';
import Endereco from './Endereco.js';

Usuario.hasMany(Endereco, {
  foreignKey: 'usuario_id',
  as: 'enderecos'
});

Endereco.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});

export { Usuario, Endereco };
