const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;

describe("Tests for login controller /users/login", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((error) => {
        console.log(error.massage);
      });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Test login with valid credentials", async () => {
    const body = {
      email: "example@example.com",
      password: "1111111",
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe("example@example.com");
    expect(response.body.user.subscription).toBe("starter");
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });

  test("Test login with invalid email", async () => {
    const body = {
      email: "invalid@example.com",
      password: "1111111",
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(401);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe("Email or password is wrong");
  });

  test("Test login with incorrect password", async () => {
    const body = {
      email: "example@example.com",
      password: "incorrect_password",
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(401);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe("Email or password is wrong");
  });

  test("Test login with incorrect password field numeric type", async () => {
    const body = {
      email: "example@example.com",
      password: 11111111,
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe(
      "Incorrect field values: 'password' must be a string"
    );
  });

  test("Test login with null password field ", async () => {
    const body = {
      email: "example@example.com",
      password: null,
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe(
      "Incorrect field values: 'password' must be a string"
    );
  });

  test("Test login with undefined password field ", async () => {
    const body = {
      email: "example@example.com",
      password: undefined,
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe("Missing field password");
  });

  test("Test login with boolean password field", async () => {
    const body = {
      email: "example@example.com",
      password: true,
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe(
      "Incorrect field values: 'password' must be a string"
    );
  });

  test("Test login with object password field", async () => {
    const body = {
      email: "example@example.com",
      password: {},
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe(
      "Incorrect field values: 'password' must be a string"
    );
  });

  test("Test login with array password field", async () => {
    const body = {
      email: "example@example.com",
      password: [],
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe(
      "Incorrect field values: 'password' must be a string"
    );
  });

  test("Test login with function password field", async () => {
    const body = {
      email: "example@example.com",
      password: () => {},
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe("Missing field password");
  });

  test("Test login with incorrect email field numeric type", async () => {
    const body = {
      email: 11111111,
      password: "1111111",
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe(
      "Incorrect field values: 'email' must be a string"
    );
  });

  test("Test login with null email field ", async () => {
    const body = {
      email: null,
      password: "1111111",
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe(
      "Incorrect field values: 'email' must be a string"
    );
  });

  test("Test login with undefined email field ", async () => {
    const body = {
      email: undefined,
      password: "1111111",
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe("Missing field email");
  });

  test("Test login with boolean email field", async () => {
    const body = {
      email: true,
      password: "1111111",
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe(
      "Incorrect field values: 'email' must be a string"
    );
  });

  test("Test login with object email field", async () => {
    const body = {
      email: {},
      password: "1111111",
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe(
      "Incorrect field values: 'email' must be a string"
    );
  });

  test("Test login with array email field", async () => {
    const body = {
      email: [],
      password: "1111111",
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe(
      "Incorrect field values: 'email' must be a string"
    );
  });

  test("Test login with function email field", async () => {
    const body = {
      email: () => {},
      password: "1111111",
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe("Missing field email");
  });

  test("Test login with missing field email", async () => {
    const body = {
      password: "incorrect_password",
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe("Missing field email");
  });

  test("Test login with missing field password", async () => {
    const body = {
      email: "example@example.com",
    };
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe("Missing field password");
  });

  test("Test login with with empty object", async () => {
    const body = {};
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe("Missing field email");
  });

  test("Test login with with empty array", async () => {
    const body = [];
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe('"value" must be of type object');
  });

  test("Test login with with empty string", async () => {
    const body = "";
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe("Missing field email");
  });

  test("Test login with with bulean", async () => {
    const body = false;
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe("Missing field email");
  });

  test("Test login with with undefined", async () => {
    const body = undefined;
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe("Missing field email");
  });

  test("Test login with with null", async () => {
    const body = null;
    const response = await request(app).post("/users/login").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.token).toBeUndefined();
    expect(response.body.user).toBeUndefined();
    expect(response.body.message).toBe("Missing field email");
  });
});