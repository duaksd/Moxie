import express from 'express';
import Pedido from '../models/Pedido.js';
import validarCupom from '../middlewares/validarCupom.js';

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

// Buscar pedido por ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const pedido = await Pedido.findByPk(id);
    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ mensagem: 'Pedido não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedido', details: error.message });
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

// Rota para finalizar pedido com validação de cupom
router.post('/finalizar', validarCupom, async (req, res) => {
  try {
    // Lógica para finalizar pedido
    res.status(200).json({ mensagem: 'Pedido finalizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao finalizar pedido.', error: error.message });
  }
});

export default router;
