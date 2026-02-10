const request = require('supertest');
const app = require('../app');
const path = require('path');

describe('Health Check API', () => {
  test('GET /health should return status UP', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'UP');
  });
});

describe('File Upload API', () => {
  test('POST /api/user/upload should upload a file', async () => {
    const res = await request(app)
      .post('/api/user/upload')
      .attach(
        'profilePic',
        path.join(__dirname, 'test.png')
      );

    expect(res.statusCode).toBe(201);
  });
});
