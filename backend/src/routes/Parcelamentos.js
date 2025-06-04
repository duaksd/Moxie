import express from 'express';
import Parcelamento from '../models/Parcelamento.js';

const router = express.Router();

// Criar parcelamento
router.post('/', async (req, res) => {
  try {
    const parcelamento = await Parcelamento.create(req.body);
    res.status(201).json(parcelamento);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar parcelamento', details: error.message });
  }
});

// Listar todos os parcelamentos
router.get('/', async (req, res) => {
  try {
    const parcelamentos = await Parcelamento.findAll();
    res.json(parcelamentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar parcelamentos', details: error.message });
  }
});

// Buscar parcelamento por ID
router.get('/:id', async (req, res) => {
  try {
    const parcelamento = await Parcelamento.findByPk(req.params.id);
    if (parcelamento) {
      res.json(parcelamento);
    } else {
      res.status(404).json({ mensagem: 'Parcelamento não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar parcelamento', details: error.message });
  }
});

// Atualizar parcelamento
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Parcelamento.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const parcelamentoAtualizado = await Parcelamento.findByPk(req.params.id);
      res.json(parcelamentoAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Parcelamento não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar parcelamento', details: error.message });
  }
});

// Deletar parcelamento
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Parcelamento.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ mensagem: 'Parcelamento deletado com sucesso!' });
    } else {
      res.status(404).json({ mensagem: 'Parcelamento não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar parcelamento', details: error.message });
  }
});

export default router;
