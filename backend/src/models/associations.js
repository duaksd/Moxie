import Usuario from './Usuario.js';
import Endereco from './Endereco.js';
import Pedido from './Pedido.js';
import ItemPedido from './ItemPedido.js';
import Produto from './Produto.js';
import Pagamento from './Pagamento.js';


// Usuário e Endereço
Usuario.hasMany(Endereco, {
  foreignKey: 'usuario_id',
  as: 'enderecos'
});
Endereco.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuarioEndereco' // <-- ÚNICO!
});

// Usuário e Pedido
Usuario.hasMany(Pedido, {
  foreignKey: 'usuario_id',
  as: 'pedidos'
});
Pedido.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuarioPedido' // <-- ALTERE AQUI!
});

// Pedido e Endereco
Pedido.belongsTo(Endereco, {
  foreignKey: 'endereco_id',
  as: 'enderecoPedido' // <-- ALTERE AQUI!
});
Endereco.hasMany(Pedido, {
  foreignKey: 'endereco_id',
  as: 'pedidosEndereco'
});

// Pedido e ItemPedido
Pedido.hasMany(ItemPedido, {
  foreignKey: 'pedido_id',
  as: 'itens'
});
ItemPedido.belongsTo(Pedido, {
  foreignKey: 'pedido_id',
  as: 'pedido'
});

// ItemPedido e Produto
ItemPedido.belongsTo(Produto, {
  foreignKey: 'produto_id',
  as: 'produto'
});
Produto.hasMany(ItemPedido, {
  foreignKey: 'produto_id',
  as: 'itensPedido'
});

// Pedido e Pagamento
Pedido.hasOne(Pagamento, { foreignKey: 'pedido_id', as: 'pagamento' });
Pagamento.belongsTo(Pedido, { foreignKey: 'pedido_id', as: 'pedidoPagamento' });

export { Usuario, Endereco, Pedido, ItemPedido, Produto, Pagamento };