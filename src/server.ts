import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDB from './database/connection.js';
import log from './logger.js';
import cors from 'cors';

const port = process.env.PORT ?? 3000;
const mongoUrl = process.env.MONGO_DB ?? '';

const corsOptions = {
  origin: 'https://two02301-w6chwe-back-enrique-lorena.onrender.com/',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.listen(port, async () => {
  await connectDB(mongoUrl);
  log.info(`Server has started in port ${port}`);
});
