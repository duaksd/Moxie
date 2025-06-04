import express from 'express';
import Carrinho from '../models/Carrinho.js';
import Usuario from '../models/Usuario.js';
import Produto from '../models/Produto.js';

const router = express.Router();

// Buscar todos os itens do carrinho, com dados do usuário e produto
router.get('/', async (req, res) => {
  try {
    const itens = await Carrinho.findAll({
      include: [
        { model: Usuario, attributes: ['id', 'nome', 'email'] },
        { model: Produto, attributes: ['id', 'nome', 'preco', 'imagem_url'] }
      ]
    });
    res.json(itens);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar itens do carrinho', details: error.message });
  }
});

// Buscar itens do carrinho por usuário (ex: /carrinho/usuario/1)
router.get('/usuario/:usuarioId', async (req, res) => {
  try {
    const usuarioId = req.params.usuarioId;
    const itens = await Carrinho.findAll({
      where: { usuario_id: usuarioId },
      include: [{ model: Produto, attributes: ['id', 'nome', 'preco', 'imagem_url'] }]
    });
    res.json(itens);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar itens do carrinho do usuário', details: error.message });
  }
});

// Adicionar item ao carrinho
router.post('/', async (req, res) => {
  try {
    const { usuario_id, produto_id, quantidade } = req.body;
    if (!usuario_id || !produto_id) {
      return res.status(400).json({ error: 'usuario_id e produto_id são obrigatórios.' });
    }
    const carrinhoItem = await Carrinho.create({
      usuario_id,
      produto_id,
      quantidade: quantidade || 1
    });
    res.status(201).json(carrinhoItem);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao adicionar item ao carrinho', details: error.message });
  }
});

// Atualizar quantidade do item no carrinho pelo id do item no carrinho
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { quantidade } = req.body;

    const [updated] = await Carrinho.update({ quantidade }, { where: { id } });
    if (updated) {
      const itemAtualizado = await Carrinho.findByPk(id);
      res.json(itemAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Item do carrinho não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar item do carrinho', details: error.message });
  }
});

// Remover item do carrinho
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Carrinho.destroy({ where: { id } });
    if (deleted) {
      res.json({ mensagem: 'Item removido do carrinho com sucesso!' });
    } else {
      res.status(404).json({ mensagem: 'Item do carrinho não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover item do carrinho', details: error.message });
  }
});

export default router;
