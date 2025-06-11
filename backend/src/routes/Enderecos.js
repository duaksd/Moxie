import express from 'express';
import Endereco from '../models/Endereco.js';

const router = express.Router();

// Criar um endereço para um usuário
router.post('/', async (req, res) => {
  try {
    const { usuario_id, tipo, cep, logradouro, numero, complemento, bairro, cidade, estado } = req.body;

    if (!usuario_id || !tipo || !cep || !logradouro || !numero || !bairro || !cidade || !estado) {
      return res.status(400).json({ mensagem: 'Campos obrigatórios faltando.' });
    }

    const novoEndereco = await Endereco.create({
      usuario_id, tipo, cep, logradouro, numero, complemento, bairro, cidade, estado
    });

    res.status(201).json(novoEndereco);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar endereço', details: error.message });
  }
});

// Listar todos os endereços de um usuário
router.get('/usuario/:usuario_id', async (req, res) => {
  try {
    const usuario_id = req.params.usuario_id;
    const enderecos = await Endereco.findAll({ where: { usuario_id } });
    res.status(200).json(enderecos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar endereços', details: error.message });
  }
});

// Atualizar um endereço pelo id
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Endereco.update(req.body, { where: { id } });

    if (updated) {
      const enderecoAtualizado = await Endereco.findByPk(id);
      res.status(200).json(enderecoAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Endereço não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar endereço', details: error.message });
  }
});

// Deletar um endereço pelo id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Endereco.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ mensagem: 'Endereço deletado!' });
    } else {
      res.status(404).json({ mensagem: 'Endereço não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar endereço', details: error.message });
  }
});

export default router;
