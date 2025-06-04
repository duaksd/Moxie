export default function validarCupom(req, res, next) {
    const { cupom } = req.body;
  
    if (!cupom) {
      return res.status(400).json({ mensagem: 'Cupom não informado.' });
    }
  
    if (cupom.length < 5) {
      return res.status(400).json({ mensagem: 'Cupom inválido.' });
    }
  
    console.log('Cupom validado com sucesso.');
    
    next();  // Segue para a próxima etapa: rota
  }
  