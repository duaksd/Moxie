import express from 'express';
import cors from 'cors';
import sequelize from './database/ModelConnection.js';
import produtosRouter from './routes/produtos.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend Node.js funcionando!');
});

app.use('/produtos', produtosRouter);

// Testa a conexão com o banco ao iniciar o app
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error);
  });

export default app;