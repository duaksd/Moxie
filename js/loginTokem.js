// controllers/authController.js
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = 'seusegredoaqui'; // Ideal: use process.env.JWT_SECRET

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (erro) {
    console.error("Erro no login:", erro); // Adicionado para diagnóstico
    return res.status(500).json({ error: 'Erro no servidor', detalhes: erro.message });
  }
};
