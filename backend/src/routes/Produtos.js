import express from 'express';
import Produto from '../models/Produto.js';

const router = express.Router();

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    return res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});

// Buscar um produto por ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const produto = await Produto.findByPk(id);
    if (produto) {
      return res.status(200).json(produto);
    } else {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar produto.' });
  }
});

/* Criar um novo produto
router.post('/', async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    return res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Erro ao criar produto.', details: error.message });
  }
}); */

// POST múltiplos produtos
router.post('/', async (req, res) => {
  try {
    const dados = req.body;

    // Verifica se está recebendo um array
    if (Array.isArray(dados)) {
      const produtosCriados = await Produto.bulkCreate(dados);
      return res.status(201).json(produtosCriados);
    }

    // Se for apenas um produto, cria normalmente
    const produto = await Produto.create(dados);
    return res.status(201).json(produto);

  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Erro ao criar produto(s).', details: error.message });
  }
});

// Atualizar um produto
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Produto.update(req.body, { where: { id } });
    if (updated) {
      const produtoAtualizado = await Produto.findByPk(id);
      return res.status(200).json(produtoAtualizado);
    } else {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Erro ao atualizar produto.', details: error.message });
  }
});

// Deletar um produto
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Produto.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ mensagem: 'Produto deletado com sucesso!' });
    } else {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao deletar produto.' });
  }
});

// Buscar produtos por nome
router.get('/search', async (req, res) => {
  try {
    const nome = req.query.nome;
    if (!nome) {
      return res.status(400).json({ error: 'Parâmetro "nome" é obrigatório.' });
    }

    const produtos = await Produto.findAll({
      where: {
        nome: {
          [Op.like]: `%${nome}%`
        }
      }
    });

    if (produtos.length > 0) {
      return res.status(200).json(produtos);
    } else {
      return res.status(404).json({ error: 'Nenhum produto encontrado.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});
// asdasdasd

export default router;
