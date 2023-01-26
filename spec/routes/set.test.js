const request = require("supertest");
const app = require("../../app.js");

describe("PUT /set", () => {
  beforeEach(() => {
    app.locals.memory = {};
  });

  describe("with one query parameter", () => {
    let response;
    beforeEach(async () => {
      response = await request(app).put("/set?name=John");
    });

    it("responds with status 201", () => {
      expect(response.status).toEqual(201);
    });

    it("responds with a confirmation message", () => {
      expect(response.body.message).toEqual("OK");
    });

    it("updates the app memory", () => {
      expect(app.locals.memory).toEqual({ name: "John" });
    });

    it("replaces memory when querying the same key", async () => {
      response = await request(app).put("/set?name=Jane");
      expect(app.locals.memory).toEqual({ name: "Jane" });
    });

    it("does nothing when sending the same request", async () => {
      response = await request(app).put("/set?name=John");
      expect(app.locals.memory).toEqual({ name: "John" });
    });
  });
});
