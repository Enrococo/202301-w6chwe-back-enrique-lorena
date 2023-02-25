import express from 'express';
import {
  createRobotController,
  getRobotByIdController,
  getRobotsController,
  deleteRobotByIdController,
  updateRobotByIdController,
} from './robots-controllers.js';

const router = express.Router();

router.route('/').get(getRobotsController).post(createRobotController);

router
  .route('/:id')
  .get(getRobotByIdController)
  .delete(deleteRobotByIdController)
  .put(updateRobotByIdController);

export default router;
