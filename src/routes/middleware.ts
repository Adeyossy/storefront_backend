import jwt from 'jsonwebtoken';
import { User } from '../models/types';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

// Not strictly a middleware but a helper function
export const signToken = (user: object): string => {
  const signedToken = jwt.sign(user, process.env.TOKEN_SECRET as string);
  return signedToken;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authorization = req.headers.authorization;
  let token: string;
  if (authorization) {
    token = authorization.split(' ')[1];
    try {
      jwt.verify(token, process.env.TOKEN_SECRET as string);
      next();
    } catch (err) {
      res.status(401);
      res.json(err);
      return;
    }
  }
}