import express from 'express';
import {
  createRobotController,
  getRobotByIdController,
  getRobotsController,
} from './robots-controllers.js';

const router = express.Router();

router.route('/').get(getRobotsController).post(createRobotController);

router.route('/:id').get(getRobotByIdController);

export default router;
