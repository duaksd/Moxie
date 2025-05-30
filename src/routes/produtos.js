import express from 'express';
import Produto from '../models/Produto.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});

export default router;