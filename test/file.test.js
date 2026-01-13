import request from "supertest";
import app from "../index.js";

describe("File APIs", () => {
  it("should fail without token", async () => {
    const res = await request(app).post("/api/files/upload");
    expect(res.statusCode).toBe(401);
  });
});
