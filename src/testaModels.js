import Usuario from './models/Usuario.js';
import Endereco from './models/Endereco.js';
import Produto from './models/Produto.js';
import Pedido from './models/Pedido.js';
import ItemPedido from './models/ItemPedido.js';
import Carrinho from './models/Carrinho.js';
import Parcelamento from './models/Parcelamento.js';
import Pagamento from './models/Pagamento.js';
import Cupom from './models/Cupom.js';

async function testarModels() {
  try {
    console.log('Usuarios:', await Usuario.findAll());
    console.log('Enderecos:', await Endereco.findAll());
    console.log('Produtos:', await Produto.findAll());
    console.log('Pedidos:', await Pedido.findAll());
    console.log('ItensPedido:', await ItemPedido.findAll());
    console.log('Carrinhos:', await Carrinho.findAll());
    console.log('Parcelamentos:', await Parcelamento.findAll());
    console.log('Pagamentos:', await Pagamento.findAll());
    console.log('Cupons:', await Cupom.findAll());
    console.log('Todos os models testados com sucesso!');
  } catch (error) {
    console.error('Erro ao testar models:', error);
  }
}

testarModels();