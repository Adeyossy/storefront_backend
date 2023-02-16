import supertest from "supertest";
import app from "../server";
import jwt from "jsonwebtoken";
import { User } from "../models/types";
import { UsersDB } from "../models/model";

const request = supertest(app);

const testUser: User = {
  username: 'neuyusa',
  password: 'passkey'
}

describe('This suite tests the users models', function() {
  it('starting with the CREATE model method', async function() {
    const usersModel = new UsersDB('users');
    try {
      const newUser = await usersModel.createNewUser(testUser.username, testUser.password);

      if(typeof newUser !== 'string') {
        expect(newUser.username).toBe(testUser.username);
      }
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  });

  it('then tests the logging in model method', async function() {
    const usersModel = new UsersDB('users');
    try {
      const user = await usersModel.authenticateUser(testUser.username, testUser.password);

      if(typeof user !== 'string') {
        expect(user.username).toBe(testUser.username);
      }
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  });

  it('then lists all users', async function() {
    const usersModel = new UsersDB('users');
    try {
      const newUser = <User[]> await usersModel.getIndex();

      if(typeof newUser !== 'string') {
        expect(newUser.length).toBeTruthy;
      }
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  });

  it('then shows a specific user', async function() {
    const usersModel = new UsersDB('users');
    try {
      const user = <User[]> await usersModel.showEntity(1); //assumes at least 1 user exists

      if(typeof user !== 'string') {
        expect(user[0].username).toBeTruthy();
      }
    } catch (error) {
      throw new Error(`An error occurred: ${error}`);
    }
  })
});

describe('This suite tests the users route', function(){
  it('beginning with the CREATE route', async function(){
    const response = await request.post('/users/signup').send({
      username: 'shopper1', 
      password: 'shopper1password'});
    
    expect((jwt.decode(response.body) as User).username).toBe('shopper1');
  });

  // it('followed by the INDEX ROUTE', function(){});
});