import supertest from "supertest";
import app from "../server";
import jwt from "jsonwebtoken";
import { User } from "../models/types";

const request = supertest(app);

describe('This suite tests the users route', function(){
  it('beginning with the CREATE route', async function(){
    const response = await request.post('/users/signup').send({
      username: 'shopper1', 
      password: 'shopper1password'});
    
    expect((jwt.decode(response.body) as User).username).toBe('shopper1');
  });

  // it('followed by the INDEX ROUTE', function(){});
});