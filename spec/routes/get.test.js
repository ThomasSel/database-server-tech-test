const request = require("supertest");
const app = require("../../app");

describe("GET /get", () => {
  let response;

  describe("without any query parameters", () => {
    beforeEach(async () => {
      response = await request(app).get("/get");
    });

    it("responds with status 400", async () => {
      expect(response.status).toEqual(400);
    });

    it("responds with an error message", async () => {
      expect(response.body.message).toEqual("Bad Request");
    });
  });
});
