import { RequestHandler } from 'express';
import logger from '../../logger.js';
import { User, UserModel } from '../../users/user-schema.js';
import { encryptPassword, generateJWTToken } from './auth-utils.js';
import crypto from 'node:crypto';

const emailValidation = /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/i;

interface LoginResponse {
  accessToken: string;
}

type AuthRequest = Pick<User, 'email' | 'password'>;

export const registerUserController: RequestHandler<
  unknown,
  unknown,
  AuthRequest
> = async (req, res) => {
  const { email, password } = req.body;
  logger.debug(`User ${email} is trying to register`);
  if (!emailValidation.test(email)) {
    logger.debug('El email no cumple la validación');
    return res.status(400).json({ msg: 'Email must be a valid email' });
  }

  if (!password) {
    return res.status(400).json({ mgs: 'Password must be defined' });
  }

  try {
    const existingDbUser = await UserModel.findOne({ email }).exec();
    if (existingDbUser !== null) {
      return res
        .status(409)
        .json({ msg: 'An user with that email already exists' });
    }

    const user = {
      id: crypto.randomUUID(),
      email,
      password,
    };
    await UserModel.create(user);
    res.sendStatus(201);
  } catch (err) {
    logger.error('Error registering user', err);
    res.sendStatus(500);
  }
};

export const loginUserController: RequestHandler<
  unknown,
  LoginResponse,
  AuthRequest
> = async (req, res) => {
  const { email, password } = req.body;
  try {
    const filterUser = {
      email,
      password: encryptPassword(password),
    };
    const existingUser = await UserModel.find(filterUser).exec();

    if (existingUser === null) {
      return res.sendStatus(404);
    }

    const tokenJWT = generateJWTToken(email);
    res.status(200).json({
      accessToken: tokenJWT,
    });
  } catch (err) {
    logger.error('Error registering user', err);
    res.sendStatus(500);
  }
};
