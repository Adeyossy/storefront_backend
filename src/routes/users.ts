import express, { Request, Response } from 'express';
import { UsersDB } from '../models/model';
import { User } from '../models/types';
import { signToken, verifyToken } from './middleware';

const router = express.Router();

router.get('/users', verifyToken, async (req: Request, res: Response) => {
  const usersModel = new UsersDB('users');
  const users = <User[]> await usersModel.getIndex();
  res.json(users);
});

router.get('/users/userId', verifyToken, async (req: Request, res: Response) => {
  const usersModel = new UsersDB('users');
  const users = <User[]> await usersModel.showEntity(parseInt(req.params.userId));
  res.json(users[0]);
});

router.post('/users', async (req: Request, res: Response) => {
  const usersModel = new UsersDB('users');
  const userFromClient = req.body;
  if(userFromClient.username && userFromClient.password) {
    const newUser = <User[]> await usersModel.createEntity({
      username: userFromClient.username, 
      password: userFromClient.password
    });

    const payload = {
      username: newUser[0].username,
      firstName: newUser[0].firstName,
      lastName: newUser[0].lastName
    }

    let signedToken;
    try {
      signedToken = signToken(payload);
    } catch (error) {
      res.status(400);
      res.json(`An error occurred: ${error}`);
    }
    res.json(signedToken);
  }
});

export default router;