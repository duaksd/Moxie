import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Adicione no topo do arquivo
import autenticarToken from '../middlewares/auth.js';
import Usuario from '../models/Usuario.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dragonball_super'; // Defina sua chave secreta

// ROTA POST PARA LOGIN COM BCRYPT E JWT
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }

    // Compara senha recebida com hash armazenado
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta!' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, nome: usuario.nome },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Retorna dados do usuário (menos a senha) e o token
    res.status(200).json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        status: usuario.status
      },
      token // <-- token JWT aqui
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro no login', details: error.message });
  }
});

// ROTA GET PARA BUSCAR USUÁRIO POR EMAIL
router.get('/email/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const usuario = await Usuario.findOne({ where: { email } });
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
  }
});

// ROTA GET PROTEGIDA - retorna dados completos do usuário autenticado
router.get('/protegida', autenticarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: { exclude: ['senha'] }
    });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
  }
});

// ROTA POST PARA CRIAR USUÁRIO COM HASH DE SENHA
router.post('/', async (req, res) => {
  try {
    // Extrai dados do corpo da requisição
    const { nome, email, telefone, senha, status } = req.body;
    // Cria hash da senha com 10 rounds de salt
    const hashedSenha = await bcrypt.hash(senha, 10);

    // Cria usuário no banco com senha hasheada
    const usuario = await Usuario.create({
      nome,
      email,
      telefone,
      senha: hashedSenha,
      status: status || 'ativo', // status padrão 'ativo'
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário', details: error.message });
  }
});

// ROTA DELETE PARA DELETAR USUÁRIO POR ID
router.delete('/:id', autenticarToken, async (req, res) => {
  if (req.usuario.id != req.params.id) {
    return res.status(403).json({ error: 'Acesso negado.' });
  }
  try {
    const id = req.params.id;
    const deleted = await Usuario.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ mensagem: 'Usuário deletado com sucesso!' });
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário.', details: error.message });
  }
});

// ROTA PUT PARA ATUALIZAR USUÁRIO POR ID
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Se atualizar senha, precisa hashear ela
    if (req.body.senha) {
      req.body.senha = await bcrypt.hash(req.body.senha, 10);
    }

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

// ROTA GET PARA BUSCAR USUÁRIO POR ID (protegida por JWT)
router.get('/:id', autenticarToken, async (req, res) => {
  try {
    const id = req.params.id;
    // Opcional: só permite que o usuário autenticado acesse o próprio perfil
    if (req.usuario.id != id) {
      return res.status(403).json({ error: 'Acesso negado.' });
    }
    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['senha'] } // não retorna a senha
    });
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
  }
});

// ROTA GET PARA RETORNAR TODOS OS USUÁRIOS
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
  }
});

export default router;