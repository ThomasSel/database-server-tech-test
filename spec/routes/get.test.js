const request = require("supertest");
const app = require("../../app");

describe("GET /get", () => {
  describe("without any query parameters", () => {
    it("responds with status 400", async () => {
      const response = await request(app).get("/get");
      expect(response.status).toEqual(400);
    });

    it("responds with an error message", async () => {
      const response = await request(app).get("/get");
      expect(response.body.message).toEqual("Bad Request");
    });
  });
});
