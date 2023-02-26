import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDB from './database/connection.js';
import log from './logger.js';
import cors from 'cors';

const port = process.env.PORT ?? 3000;
const mongoUrl = process.env.MONGO_DB ?? '';

app.use(cors());

app.listen(port, async () => {
  await connectDB(mongoUrl);
  log.info(`Server has started in port ${port}`);
});
