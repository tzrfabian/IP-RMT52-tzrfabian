const { test, expect, beforeAll, afterAll, describe } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');
const { sequelize, User, Image } = require('../models');
const { signToken } = require('../helpers/jwt');
const { hashPassword } = require('../helpers/bcrypt');
const path = require('path');

let access_token;

const usersSeed = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@mail.com',
    password: hashPassword('123456'),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const imagesSeed = [
  {
    imgName: 'Sample Image',
    imgUrl: 'http://example.com/sample-image.jpg',
    prompt: 'Sample Prompt',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

beforeAll(async () => {
    await Image.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
    await User.destroy({
      where: {},
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
    await sequelize.queryInterface.bulkInsert('Users', usersSeed, {});
    await sequelize.queryInterface.bulkInsert('Images', imagesSeed, {});
    const user = await User.findOne({
      where: {
          email: "user1@mail.com"
      },
    });
  access_token = signToken({ id: user.id });
  });


afterAll(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true
  });
  await Image.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true
  });
  await sequelize.close();
});

describe('User and Image API Test Suite', () => {

  test('should successfully login and return an access token', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'user1@mail.com',
        password: '123456'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token');
  });

  test('should fetch all images for authenticated user', async () => {
    const response = await request(app)
      .get('/api/images')
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should fetch an image by ID for authenticated user', async () => {
    const response = await request(app)
      .get('/api/images/1')
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('imgName', 'Sample Image');
  });

  test('should delete an image by ID for authenticated user', async () => {
    const response = await request(app)
      .delete('/api/images/1')
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', `Data id 1 has been deleted!`);
  });

  test('should return 404 if the image is not found', async () => {
    const response = await request(app)
      .get('/api/images/999') 
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Image Data Not Found!');
  });
});