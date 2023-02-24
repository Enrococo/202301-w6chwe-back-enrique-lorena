import { Request, Response } from 'express';
import { getRobotsController } from './robots-controllers.js';
import { RobotModel } from './robots-schema.js';

describe('Given a getVillainsController function from villainsController', () => {
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

  test('when it is invoked it should return a list of students', async () => {
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
