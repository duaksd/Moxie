import express from 'express';
import Produto from '../models/Produto.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    return res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});


export default router;