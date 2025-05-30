import express from 'express';
import Usuario from '../models/Usuario.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário', details: error.message });
  }
});

// ROTA DELETE PARA DELETAR USUÁRIO POR ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Usuario.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ mensagem: 'Usuário deletado!' });
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
  }
});

// ROTA PUT PARA ATUALIZAR USUÁRIO POR ID
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Usuario.update(req.body, { where: { id } });
    if (updated) {
      const usuarioAtualizado = await Usuario.findByPk(id);
      res.status(200).json(usuarioAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
  }
});

export default router;