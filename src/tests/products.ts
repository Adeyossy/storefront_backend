import app from '../server';
import supertest from 'supertest';

const request = supertest(app);

describe('This suite tests the api endpoints for products routes', function() {
  it('and this spec tests the /products GET route', async function() {
    const response = request.get('/products');
    expect(response)
  })
})
