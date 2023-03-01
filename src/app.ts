import cors from 'cors';
import express from 'express';
import apiRouter from './api/api-router.js';
import authorizationRouter from './api/auth/auth-router.js';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({ hello: 'World' });
});
app.use(express.json());
app.disable('x-powered-by');

app.use('/auth', authorizationRouter);
app.use('/api/v1', apiRouter);

export default app;
