import request from 'supertest';
import app from '../index.ts'

describe('Test the API endpoints', () => {
  it('should return a 200 status code for GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

//   it('should return a JSON object for GET /', async () => {
//     const response = await request(app).get('/');
//     expect(response.type).toBe('application/json');
//     expect(response.body).toEqual({ message: 'Hello, World!' });
//   });

//   it('should return a 404 status code for GET /nonexistent', async () => {
//     const response = await request(app).get('/nonexistent');
//     expect(response.status).toBe(404);
//   });
});
