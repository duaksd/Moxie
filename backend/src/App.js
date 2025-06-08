import express from 'express';
import cors from 'cors';
import sequelize from './database/ModelConnection.js';
import produtosRouter from './routes/Produtos.js';
import usuariosRouter from './routes/Usuarios.js';
import enderecosRouter from './routes/Enderecos.js';
import carrinhoRouter from './routes/Carrinhos.js';
import pedidosRouter from './routes/Pedidos.js';
import itemPedidosRouter from './routes/ItemPedidos.js';
import pagamentosRouter from './routes/Pagamentos.js';
import parcelamentosRouter from './routes/Parcelamentos.js';
//import validarCupom from './middlewares/validarCupom.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/img', express.static(path.join(__dirname, 'img')));

app.get('/', (req, res) => {
  res.send('Backend Node.js funcionando!');
});

app.use('/produtos', produtosRouter);

app.use('/usuarios', usuariosRouter);

app.use('/enderecos', enderecosRouter);

app.use('/carrinho', carrinhoRouter);

app.use('/pedidos', pedidosRouter);

app.use('/itempedidos', itemPedidosRouter);

app.use('/pagamentos', pagamentosRouter);

app.use('/parcelamentos', parcelamentosRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

//app.use(validarCupom);

// Testa a conexão com o banco ao iniciar o app
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error);
  });

export default app;