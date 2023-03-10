import app from '../server';
import supertest from 'supertest';
import { ModelDB } from '../models/model';
import { Product } from '../models/types';

const request = supertest(app);

describe('This suite tests the api endpoints for products routes', function () {
  it('and this spec tests the /products GET route', async function () {
    const response = await request.get('/products');
    // console.log(response.body);
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

    expect(newProduct[0].name).toBe('Sandwich');
  });

  it('then INDEX method spec', async function() {
    const allProducts = <Product[]> await productsModel.getIndex();
    expect(Array.isArray(allProducts)).toBeTrue();
    if (allProducts.length) {
      expect(allProducts[0].hasOwnProperty('name')).toBeTrue();
    }
  });

  it('then SHOWS the product with a given product ID', async function (){
    const productsModel = new ModelDB('products');
    const product = <Product[]> await productsModel.showEntity(1);
    expect(product.length).toEqual(1);
  })
});
