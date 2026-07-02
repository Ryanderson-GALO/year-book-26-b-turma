import express from 'express';
import alunosRouter from './routes/alunos.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'Yearbook API está no ar! 🎓' });
});

app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use('/alunos', alunosRouter);

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

export default app;