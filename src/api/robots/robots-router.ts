import express from 'express';
import { getRobotsController } from './robots-controllers.js';

const router = express.Router();

router.route('/').get(getRobotsController);

router.route('/:id');

export default router;
