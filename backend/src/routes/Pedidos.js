import express from 'express';
import Pedido from '../models/Pedido.js';
import Carrinho from '../models/Carrinho.js';
import ItemPedido from '../models/ItemPedido.js';
import Endereco from '../models/Endereco.js';
import Pagamento from '../models/Pagamento.js';
import Produto from '../models/Produto.js'; // Adicionado import do Produto
import autenticarToken from '../middlewares/auth.js';
import validarCupom from '../middlewares/validarCupom.js'; // Adicionado import do validarCupom

const router = express.Router();

// Criar pedido
router.post('/', async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar pedido', details: error.message });
  }
});

// Buscar todos os pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos', details: error.message });
  }
});

router.get('/usuario/:usuarioId', autenticarToken, async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId;

    // Verifica se o usuário está acessando seus próprios pedidos
    if (String(req.usuario.id) !== String(usuarioId)) {
      return res.status(403).json({ mensagem: 'Acesso não autorizado' });
    }

    const pedidos = await Pedido.findAll({
      where: { usuario_id: usuarioId },
      include: [
        {
          model: ItemPedido,
          as: 'itens', // <-- Use o alias da associação!
          include: [{ model: Produto, as: 'produto' }]
        },
        {
          model: Pagamento,
          as: 'pagamento' // <-- Use o alias da associação! 
        }
      ],
      order: [['data_pedido', 'DESC']]
    });

    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Erro ao buscar pedidos do usuário:', error);
    res.status(500).json({
      error: 'Erro ao buscar pedidos do usuário',
      details: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const pedido = await Pedido.findByPk(id, {
      include: [
        {
          model: ItemPedido,
          include: [Produto]
        },
        {
          model: Endereco
        },
        {
          model: Pagamento
        }
      ]
    });
    
    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ mensagem: 'Pedido não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao buscar pedido', 
      details: error.message 
    });
  }
});

// Atualizar pedido
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Pedido.update(req.body, { where: { id } });
    if (updated) {
      const pedidoAtualizado = await Pedido.findByPk(id);
      res.status(200).json(pedidoAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Pedido não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pedido', details: error.message });
  }
});

// Deletar pedido
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Pedido.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ mensagem: 'Pedido deletado com sucesso!' });
    } else {
      res.status(404).json({ mensagem: 'Pedido não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar pedido', details: error.message });
  }
});

router.post('/finalizar', autenticarToken, validarCupom, async (req, res) => {
  try {
    const { forma_pagamento } = req.body;
    const usuarioId = req.usuario.id;

    const itensCarrinho = await Carrinho.findAll({
      where: { usuario_id: usuarioId },
      include: [{ model: Produto }]
    });

    if (itensCarrinho.length === 0) {
      return res.status(400).json({ mensagem: 'Seu carrinho está vazio' });
    }

    const endereco = await Endereco.findOne({
      where: { usuario_id: usuarioId }
    });

    if (!endereco) {
      return res.status(400).json({ mensagem: 'Por favor, cadastre um endereço de entrega' });
    }

    const subtotal = itensCarrinho.reduce((total, item) => {
    const produto = item.Produto || item.produto || item; // cobre todos os casos
    if (!produto || produto.preco === undefined) {
      throw new Error('Produto sem preço no carrinho');
    }
    return total + (parseFloat(produto.preco) * item.quantidade);
  }, 0);

    let desconto = 0;
    if (req.cupom) {
      desconto = req.cupom.tipo === 'porcentagem' 
        ? subtotal * (req.cupom.valor / 100)
        : req.cupom.valor;
    }

    const frete = await calcularFrete(endereco.cep);

    const pedido = await Pedido.create({
      usuario_id: usuarioId,
      endereco_id: endereco.id,
      forma_pagamento,
      status: 'pendente',
      subtotal,
      desconto,
      frete,
      total: subtotal + frete - desconto,
      cupom_aplicado: req.cupom?.codigo || null
    });

    await Promise.all(
      itensCarrinho.map(item => {
        const produto = item.Produto || item.produto || item;
        if (!produto || produto.preco === undefined) {
          throw new Error('Produto sem preço no carrinho');
        }
        return ItemPedido.create({
          pedido_id: pedido.id,
          produto_id: item.produto_id,
          quantidade: item.quantidade,
          preco_unitario: parseFloat(produto.preco)
        });
      })
    );

    await Pagamento.create({
      pedido_id: pedido.id,
      valor: pedido.total,
      metodo: forma_pagamento,
      status_pagamento: forma_pagamento === 'boleto' ? 'aguardando' : 'processando',
      parcelamento_id: null // ou um valor padrão, se não usar parcelamento
    });

    await Carrinho.destroy({ where: { usuario_id: usuarioId } });

    res.status(201).json({
      pedidoId: pedido.id,
      mensagem: 'Pedido criado com sucesso!',
      total: pedido.total,
      desconto
    });

  } catch (error) {
    console.error('Erro ao finalizar pedido:', error);
    res.status(500).json({ 
      mensagem: 'Erro ao finalizar pedido',
      error: error.message 
    });
  }
});

async function calcularFrete(cep) {
  const primeiraLetraCEP = cep.charAt(0);
  let frete = 15.00;
  
  if (['8', '9'].includes(primeiraLetraCEP)) frete = 25.00;
  else if (['6', '7'].includes(primeiraLetraCEP)) frete = 20.00;
  
  return frete;
}

export default router;