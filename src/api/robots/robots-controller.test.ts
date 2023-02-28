import { Request, Response } from 'express';
import {
  getRobotsController,
  createRobotController,
  getRobotByIdController,
  deleteRobotByIdController,
  updateRobotByIdController,
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
    RobotModel.find = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(robots),
    }));
    await getRobotsController(request, response as Response, jest.fn());
    expect(response.json).toHaveBeenCalledWith(robots);
  });

  test('when the database throws an error then it should response with status 500', async () => {
    RobotModel.find = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockRejectedValue(new Error('Something went wrong')),
    }));
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

describe('Given a getRobotByIdController from robotController', () => {
  const request = {
    params: { id: 'mockId' },
  } as Partial<Request>;
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

  test('when the user exists then it should respond with a robot', async () => {
    RobotModel.findById = jest.fn().mockResolvedValue(robot);
    await getRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.json).toHaveBeenCalledWith(robot);
  });
});

describe('Given a getRobotByIdController from robotController', () => {
  const request = {
    params: { id: 'mockId' },
  } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  test('when the robot does not exists then it should respond with an error', async () => {
    RobotModel.findById = jest.fn().mockResolvedValue(null);
    await getRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.json).toReturnWith(undefined);
  });
});

describe('Given a updateRobotByController function from robotsController', () => {
  const request = {
    params: { id: 'mockId' },
  } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  test('when the database throws an error, we shoul get a 500 response', async () => {
    RobotModel.updateOne = jest.fn().mockResolvedValue({ matchedCount: 0 });
    await updateRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(500);
  });
  test('when the id exists and the robot has been modified then it should response with status 200', async () => {
    RobotModel.updateOne = jest.fn().mockResolvedValue({ modifiedCount: 1 });
    await updateRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalled();
  });
  test('when the id exists and the robot has been modified then it should response with status 200', async () => {
    RobotModel.updateOne = jest.fn().mockResolvedValue({ modifiedCount: 0 });
    await updateRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalled();
  });
  test('when the database throws an error then it should response with status 500', async () => {
    RobotModel.find = jest
      .fn()
      .mockRejectedValue(new Error('Something went wrong'));
    await updateRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(500);
  });
});

describe('Given a deleteRobotByIdController from robotController', () => {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  } as Partial<Response>;

  test('when the database response is successful, then it should resolve with the deleted robot id', async () => {
    const request = { params: { id: 'mockId' } } as Partial<Request>;
    RobotModel.deleteOne = jest.fn().mockReturnValue(0);
    await deleteRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );

    expect(response.json).toHaveBeenCalledWith(request.params?.id);
  });

  test('when the database answers with a 404, then it should send a 404 error', async () => {
    const request = { params: { id: 'mockId' } } as Partial<Request>;
    RobotModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });
    await deleteRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.sendStatus).toHaveBeenCalledWith(404);
  });
  test('when the database responds with a 500, it should show the 500 status', async () => {
    const request = { params: { id: 'mockId' } } as Partial<Request>;
    RobotModel.deleteOne = jest
      .fn()
      .mockRejectedValue(new Error('something was wrong'));
    await deleteRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(500);
  });
});
