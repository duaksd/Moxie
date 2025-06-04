import express from 'express';
import Pagamento from '../models/Pagamento.js';

const router = express.Router();

// ➕ Criar pagamento
router.post('/', async (req, res) => {
  try {
    const pagamento = await Pagamento.create(req.body);
    res.status(201).json(pagamento);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar pagamento', details: error.message });
  }
});

// Listar todos os pagamentos
router.get('/', async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll();
    res.json(pagamentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pagamentos', details: error.message });
  }
});

// Buscar pagamento por ID
router.get('/:id', async (req, res) => {
  try {
    const pagamento = await Pagamento.findByPk(req.params.id);
    if (pagamento) {
      res.json(pagamento);
    } else {
      res.status(404).json({ mensagem: 'Pagamento não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pagamento', details: error.message });
  }
});

// Atualizar pagamento
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Pagamento.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const pagamentoAtualizado = await Pagamento.findByPk(req.params.id);
      res.json(pagamentoAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Pagamento não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pagamento', details: error.message });
  }
});

// Deletar pagamento
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Pagamento.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ mensagem: 'Pagamento deletado com sucesso!' });
    } else {
      res.status(404).json({ mensagem: 'Pagamento não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar pagamento', details: error.message });
  }
});

export default router;
