const request = require("supertest");
const app = require("../../app.js");

describe("PUT /set", () => {
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
  });
});
