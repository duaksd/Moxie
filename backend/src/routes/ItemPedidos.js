import express from 'express';
import ItemPedido from '../models/ItemPedido.js';

const router = express.Router();

// Criar item pedido
router.post('/', async (req, res) => {
  try {
    const itemPedido = await ItemPedido.create(req.body);
    res.status(201).json(itemPedido);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar item pedido', details: error.message });
  }
});

// Atualizar item pedido por id
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await ItemPedido.update(req.body, { where: { id } });
    if (updated) {
      const itemPedidoAtualizado = await ItemPedido.findByPk(id);
      res.status(200).json(itemPedidoAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Item pedido não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar item pedido', details: error.message });
  }
});

// Deletar item pedido por id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await ItemPedido.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ mensagem: 'Item pedido deletado com sucesso!' });
    } else {
      res.status(404).json({ mensagem: 'Item pedido não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar item pedido', details: error.message });
  }
});

// Buscar todos os itens pedido
router.get('/', async (req, res) => {
  try {
    const itensPedido = await ItemPedido.findAll();
    res.status(200).json(itensPedido);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar itens pedido', details: error.message });
  }
});

// Buscar item pedido por id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const itemPedido = await ItemPedido.findByPk(id);
    if (itemPedido) {
      res.status(200).json(itemPedido);
    } else {
      res.status(404).json({ mensagem: 'Item pedido não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar item pedido', details: error.message });
  }
});

export default router;
