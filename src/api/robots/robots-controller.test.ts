import { Request, Response } from 'express';
import {
  getRobotsController,
  createRobotController,
} from './robots-controllers.js';
import { RobotModel } from './robots-schema.js';

describe('Given a getRobotsController function from robotsController', () => {
  const request = {} as Request;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const robots = [
    {
      id: '01',
      name: 'r2q2',
      speed: 32,
      endurance: 5,
      creationDate: '28/02/2023, 11:49:36 AM',
    },
  ];

  test('when it is invoked it should return a list of robots', async () => {
    RobotModel.find = jest.fn().mockResolvedValue(robots);
    await getRobotsController(request, response as Response, jest.fn());
    expect(response.json).toHaveBeenCalledWith(robots);
  });

  test('when the database throws an error then it should response with status 500', async () => {
    RobotModel.find = jest
      .fn()
      .mockRejectedValue(new Error('Something went wrong'));
    await getRobotsController(request, response as Response, jest.fn());
    expect(response.status).toHaveBeenCalledWith(500);
  });
});

describe('Given a createRobotController function from robotsController', () => {
  const request = {} as Request;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const robot = {
    id: '01',
    name: 'r2q2',
    speed: 32,
    endurance: 5,
    creationDate: '28/02/2023, 11:49:36 AM',
  };
  test('when the db response success, it should return the posted data', async () => {
    RobotModel.create = jest.fn().mockResolvedValue(robot);
    await createRobotController(request, response as Response, jest.fn());
    expect(response.json).toHaveBeenCalled();
  });

  test('when the database throws an error then it should respond with status 500', async () => {
    RobotModel.create = jest
      .fn()
      .mockRejectedValue(new Error('something went wrong'));
    await createRobotController(request, response as Response, jest.fn());
    expect(response.status).toHaveBeenCalledWith(500);
  });
});
