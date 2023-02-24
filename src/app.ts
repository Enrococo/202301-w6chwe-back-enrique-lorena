import express from 'express';
import apiRouter from './api/api-router.js';

const app = express();

app.get('/', (req, res) => {
  res.json({ hello: 'World' });
});
app.use(express.json());
app.disable('x-powered-by');
app.use('/api/v1', apiRouter);

export default app;
