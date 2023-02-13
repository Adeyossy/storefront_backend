import app from '../server';
import supertest from 'supertest';
import { ModelDB } from '../models/model';
import { Product } from '../models/types';

const request = supertest(app);

describe('This suite tests the api endpoints for products routes', function () {
  it('and this spec tests the /products GET route', async function () {
    const response = await request.get('/products');
    console.log(response.body);
    expect(response.status).toBe(200);
  });
});

describe('Suite for testing products models', function () {
  const productsModel = new ModelDB('products');

  it('beginning with a CREATE action spec', async function () {
    const newProduct = <Product[]> await productsModel.createEntity({
      name: 'Sandwich', 
      price: 300, 
      category: 'Food'
    });

    expect(Array.isArray(newProduct)).toBeTrue();
    console.log(typeof newProduct[0]);
    expect(typeof newProduct[0]).toBe('Product');
    expect(newProduct[0].name).toBe('Sandwich');
  });

  it('then SHOW method spec', async function() {
    const allProducts = <Product[]> await productsModel.getIndex();
    expect(Array.isArray(allProducts)).toBeTrue();
    if (allProducts.length) {
      expect(allProducts[0].hasOwnProperty('name')).toBeTrue();
    }
  })
})
