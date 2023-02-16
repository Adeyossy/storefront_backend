import express, { Request, Response } from 'express';
import { UsersDB } from '../models/model';
import { User } from '../models/types';
import { signToken, verifyToken } from './middleware';

const router = express.Router();

router.get('/users', verifyToken, async (req: Request, res: Response) => {
  const usersModel = new UsersDB('users');
  let users: User[];
  try {
    users = <User[]>await usersModel.getIndex();
    res.json(users)
    return;
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/users/userId', verifyToken, async (req: Request, res: Response) => {
  const usersModel = new UsersDB('users');
  try {
    const users = <User[]>await usersModel.showEntity(parseInt(req.params.userId));
    res.json(users[0]);
    return;
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/users/signup', async (req: Request, res: Response) => {
  const usersModel = new UsersDB('users');
  const userFromClient = req.body;
  if (userFromClient.username && userFromClient.password) {
    try {
      const newUser = <User>await usersModel.createNewUser(
        userFromClient.username, userFromClient.password);

      const payload = {
        id: newUser.id,
        username: newUser.username,
        firstName: newUser?.first_name,
        lastName: newUser?.last_name
      }

      const signedToken = signToken(payload);
      res.status(201).json(signedToken);
    } catch (error) {
      res.status(400);
      res.json(`An error occurred: ${error}`);
    }
  }
});

router.post('/users/login', async (req: Request, res: Response) => {
  const usersModel = new UsersDB('users');
  const userFromClient = req.body;

  if (userFromClient.username && userFromClient.password) {
    try {
      const newUser = <User>await usersModel.authenticateUser(
        userFromClient.username, userFromClient.password);

      if (typeof newUser !== 'string') {

        const payload = {
          id: newUser.id,
          username: newUser.username,
          firstName: newUser?.first_name,
          lastName: newUser?.last_name
        }
        const signedToken = signToken(payload);
        res.status(201).json(signedToken);
        return;
      }

      res.status(403).json(newUser as string);
    } catch (error) {
      res.status(400);
      res.json(`An error occurred: ${error}`);
    }
  }
});

export default router;