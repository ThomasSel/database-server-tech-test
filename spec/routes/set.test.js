const request = require("supertest");
const app = require("../../app.js");

describe("PUT /set", () => {
  describe("with one query parameter", () => {
    it("responds with status 201", async () => {
      response = await request(app).put("/set?name=John");
      expect(response.status).toEqual(201);
    });

    it("responds with a confirmation message", async () => {
      response = await request(app).put("/set?name=John");
      expect(response.body.message).toEqual("OK");
    });
  });
});
