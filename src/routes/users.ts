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

router.post('/users/signup', async (req: Request, res: Response) => {
  const usersModel = new UsersDB('users');
  const userFromClient = req.body;
  if(userFromClient.username && userFromClient.password) {
    const newUser = <User> await usersModel.createNewUser(
      userFromClient.username, userFromClient.password);

    const payload = {
      id: newUser.id,
      username: newUser.username,
      firstName: newUser?.first_name,
      lastName: newUser?.last_name
    }

    let signedToken;
    try {
      signedToken = signToken(payload);
    } catch (error) {
      res.status(400);
      res.json(`An error occurred: ${error}`);
    }
    res.status(201).json(signedToken);
  }
});

router.post('/users/login', async (req: Request, res: Response) => {
  const usersModel = new UsersDB('users');
  const userFromClient = req.body;

  if(userFromClient.username && userFromClient.password) {
    const newUser = <User> await usersModel.authenticateUser(
      userFromClient.username, userFromClient.password);

    if(typeof newUser !== 'string') {
      
      const payload = {
        id: newUser.id,
        username: newUser.username,
        firstName: newUser?.first_name,
        lastName: newUser?.last_name
      }
  
      let signedToken;
      try {
        signedToken = signToken(payload);
      } catch (error) {
        res.status(400);
        res.json(`An error occurred: ${error}`);
      }
      res.status(201).json(signedToken);
      return;
    }

    res.status(403).json(newUser);
  }
});

export default router;