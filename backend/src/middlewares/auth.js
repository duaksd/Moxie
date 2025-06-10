import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'dragonball_super';

export default function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.usuario = usuario;
    next();
  });
}