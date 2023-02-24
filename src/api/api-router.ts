import express from 'express';
import villainsRouter from './robots/robots-router.js';

const router = express.Router();

router.use('/robots', villainsRouter);

export default router;
