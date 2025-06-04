import express from 'express';
import Cupom from '../models/Cupom.js';

const router = express.Router();

// Listar todos os cupons
router.get('/', async (req, res) => {
  try {
    const cupons = await Cupom.findAll();
    res.json(cupons);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar cupons.', detalhes: error.message });
  }
});

// Buscar cupom por ID
router.get('/:id', async (req, res) => {
  try {
    const cupom = await Cupom.findByPk(req.params.id);
    if (!cupom) {
      return res.status(404).json({ erro: 'Cupom não encontrado.' });
    }
    res.json(cupom);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar o cupom.', detalhes: error.message });
  }
});

// Criar novo cupom
router.post('/', async (req, res) => {
  try {
    const novoCupom = await Cupom.create(req.body);
    res.status(201).json(novoCupom);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar o cupom.', detalhes: error.message });
  }
});

// Atualizar cupom
router.put('/:id', async (req, res) => {
  try {
    const cupom = await Cupom.findByPk(req.params.id);
    if (!cupom) {
      return res.status(404).json({ erro: 'Cupom não encontrado.' });
    }
    await cupom.update(req.body);
    res.json(cupom);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar o cupom.', detalhes: error.message });
  }
});

// Deletar cupom
router.delete('/:id', async (req, res) => {
  try {
    const cupom = await Cupom.findByPk(req.params.id);
    if (!cupom) {
      return res.status(404).json({ erro: 'Cupom não encontrado.' });
    }
    await cupom.destroy();
    res.json({ mensagem: 'Cupom excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir o cupom.', detalhes: error.message });
  }
});

export default router;
