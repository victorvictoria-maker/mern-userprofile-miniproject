import request from "supertest";
import express from "express";
import userRoutes from "../routes/user.route.js";

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

describe("User API Endpoints", () => {
  test("GET /api/users - should return 20 users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.users.length).toBe(20);
  });

  test("GET /api/users/:id - should return a single user", async () => {
    const response = await request(app).get("/api/users/1");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(1);
  });

  test("GET /api/users/:id - should return 400 for invalid ID", async () => {
    const response = await request(app).get("/api/users/53");

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid User ID");
  });

  test("GET /api/users - should handle fetch error", async () => {
    global.fetch = async () => {
      throw new Error("Failed to fetch users");
    };

    const response = await request(app).get("/api/users");

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Server Error");
  });

  test("GET /api/users/:id - should handle fetch error", async () => {
    global.fetch = async () => {
      throw new Error("Failed to fetch user");
    };

    const response = await request(app).get("/api/users/1");

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Server Error");
  });
});
