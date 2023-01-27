const request = require("supertest");
const app = require("../../app");

describe("GET /get", () => {
  let response;

  describe("without any query parameters", () => {
    beforeEach(async () => {
      response = await request(app).get("/get");
    });

    it("responds with status 400", () => {
      expect(response.status).toEqual(400);
    });

    it("responds with an error message", () => {
      expect(response.body.message).toEqual("Bad Request");
    });
  });

  describe("without the key query parameter", () => {
    beforeEach(async () => {
      response = await request(app).get("/get?name=John&username=j0hn");
    });

    it("responds with status 400", () => {
      expect(response.status).toEqual(400);
    });

    it("responds with an error message", () => {
      expect(response.body.message).toEqual("Bad Request");
    });
  });

  describe("with only the key query parameter", () => {
    beforeEach(() => {
      app.locals.memory = { name: "John", username: "j0hn" };
    });

    describe("when the key exists in memory", () => {
      it("responds with status 200", async () => {
        response = await request(app).get("/get?key=name");
        expect(response.status).toEqual(200);
      });

      it("responds with a status message", async () => {
        response = await request(app).get("/get?key=name");
        expect(response.body.message).toEqual("OK");
      });

      it("responds with the value for e.g. name", async () => {
        response = await request(app).get("/get?key=name");
        expect(response.body.value).toEqual("John");
      });

      it("responds with the value for e.g. username", async () => {
        response = await request(app).get("/get?key=username");
        expect(response.body.value).toEqual("j0hn");
      });
    });

    describe("when the key doesn't exist in memory", () => {
      beforeEach(async () => {
        response = await request(app).get("/get?key=lastName");
      });

      it("responds with status 404", () => {
        expect(response.status).toEqual(404);
      });

      it("response with not found error message", () => {
        expect(response.body.message).toEqual('Key "lastName" not found');
      });
    });
  });
});
