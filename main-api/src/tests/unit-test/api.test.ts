const request = require('supertest');
import app from '../../app'
describe('Call Main API', () => {
    test('validate API is running and rerurn status 200', async () => {   
      const response = await request(app).get('/');
       expect(response.status).toBe(200);
    });
    test('validate API is running and returning result ', async () => {   
        const response = await request(app).get('/');
        const responseBody=JSON.parse(response.text);
        let res = {
          "statusCode": 200,
          "api":'Main Api'
      };
         expect (responseBody).toStrictEqual(res)
      });
});
