import crypto from 'node:crypto';
import { RequestHandler } from 'express';
import { RobotModel } from './robots-schema.js';
import { robotSchema } from './robots-schema.js';

export const getRobotsController: RequestHandler = async (_req, res) => {
  try {
    const foundRobots = await RobotModel.find({});
    res.json(foundRobots);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createRobotController: RequestHandler = async (req, res) => {
  const id = crypto.randomUUID();
  const robot: typeof robotSchema = {
    id,
    ...req.body,
  };
  try {
    await RobotModel.create(robot);
    res.status(201).json(robot);
  } catch (error) {
    res.status(500).json(error);
  }
};
