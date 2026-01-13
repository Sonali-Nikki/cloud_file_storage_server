import request from "supertest";
import app from "../index.js";

describe("Auth APIs", () => {
  it("should login user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@gmail.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
