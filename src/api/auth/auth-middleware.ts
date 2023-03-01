import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import log from '../../logger';

export const authMiddleWare: RequestHandler = (req, res, next) => {
  const jwtToken = req.headers.authorization?.split(' ')[1];
  if (!jwtToken) {
    return res.sendStatus(401);
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable must be defined');
    }

    const payload = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET,
    ) as jwt.JwtPayload;
    // Store the email to be used in the next middleware or controllers
    res.locals = payload.email;
    next();
  } catch (err) {
    log.error(err);
    res.sendStatus(403);
  }
};
