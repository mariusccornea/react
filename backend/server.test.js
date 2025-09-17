import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "./server.js";

describe("Transactions API", () => {
  it("GET /transactions should return an array", async () => {
    const res = await request(app).get("/transactions");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /transactions should create a new transaction", async () => {
    const newTx = {
      amount: 99.99,
      description: "Test Transaction",
      date: "2025-09-16",
      category: "Food",
    };

    const res = await request(app)
      .post("/transactions")
      .send(newTx)
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(newTx);
    expect(res.body).toHaveProperty("id");
  });
});
