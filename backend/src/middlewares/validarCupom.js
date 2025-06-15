import Cupom from '../models/Cupom.js';
import { Op } from 'sequelize';

export default async function validarCupom(req, res, next) {
  const { cupom } = req.body;
  
  if (!cupom) return next(); // Continua sem cupom

  try {
    // Corrigido: troca valido_ate por validade
    const cupomValido = await Cupom.findOne({ 
      where: { 
        codigo: cupom,
        validade: { [Op.gte]: new Date() },
        ativo: 1
      } 
    });

    if (!cupomValido) {
      return res.status(400).json({ 
        mensagem: 'Cupom inválido ou expirado' 
      });
    }

    req.cupom = { // Adiciona informações do cupom à requisição
      codigo: cupomValido.codigo,
      tipo: 'porcentagem', // ajuste conforme seu modelo, se necessário
      valor: Number(cupomValido.desconto_percentual)
    };
    
    next();
  } catch (error) {
    console.error('Erro ao validar cupom:', error);
    res.status(500).json({ 
      mensagem: 'Erro ao validar cupom',
      error: error.message
    });
  }
}