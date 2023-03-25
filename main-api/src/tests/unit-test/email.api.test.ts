const request = require("supertest");
import app from "../../app";
describe("Send POST request to email sending API", () => {
  const payload = {
    content: "Hi This is EmailContent",
    email: "nuwansameerait@gmail.com",
  };
  test(`Send payload ${payload} should return status 204`, async () => {
    const response = await request(app).post("/");
    expect(response.status).toBe(204);
  });
  test(`Send payload ${payload} should return empty body`, async () => {
    const response = await request(app).post("/");
    const responseBody=response.text;
    expect(responseBody).toBe('');
  });
});
