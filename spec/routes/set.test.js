const request = require("supertest");
const app = require("../../app.js");

describe("PUT /set", () => {
  beforeEach(() => {
    app.locals.memory = {};
  });

  describe("without a query parameter", () => {
    let response;
    beforeEach(async () => {
      response = await request(app).put("/set");
    });

    it("responds with status 204", () => {
      expect(response.status).toEqual(204);
    });

    it("has no body", () => {
      expect(response.body).toEqual({});
    });

    it("does nothing to memory", () => {
      expect(app.locals.memory).toEqual({});
    });
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

    describe("with a second request", () => {
      it("does nothing when sending an empty request", async () => {
        response = await request(app).put("/set");
        expect(app.locals.memory).toEqual({ name: "John" });
      });

      it("does nothing when sending the same request", async () => {
        response = await request(app).put("/set?name=John");
        expect(app.locals.memory).toEqual({ name: "John" });
      });

      it("replaces memory with same key and a different value", async () => {
        response = await request(app).put("/set?name=Jane");
        expect(app.locals.memory).toEqual({ name: "Jane" });
      });

      it("adds another key-value pair for a different query", async () => {
        response = await request(app).put("/set?username=j0hn");
        expect(app.locals.memory).toEqual({ name: "John", username: "j0hn" });
      });
    });
  });

  describe("with two or more query parameters", () => {
    it("responds with status 201", async () => {
      const response = await request(app).put("/set?name=John&username=j0hn");
      expect(response.status).toEqual(201);
    });

    it("responds with a confirmation message", async () => {
      const response = await request(app).put("/set?name=John&username=j0hn");
      expect(response.body.message).toEqual("OK");
    });

    it("adds both keys to memory", async () => {
      const response = await request(app).put("/set?name=John&username=j0hn");
      expect(app.locals.memory).toEqual({ name: "John", username: "j0hn" });
    });

    describe("with a second request", () => {
      beforeEach(async () => {
        await request(app).put("/set?name=John&username=j0hn");
      });

      it("does nothing when sending an empty request", async () => {
        response = await request(app).put("/set");
        expect(app.locals.memory).toEqual({ name: "John", username: "j0hn" });
      });

      it("does nothing when sending the same request", async () => {
        await request(app).put("/set?name=John&username=j0hn");
        expect(app.locals.memory).toEqual({ name: "John", username: "j0hn" });
      });

      it("updates a single key", async () => {
        await request(app).put("/set?name=Jane");
        expect(app.locals.memory).toEqual({ name: "Jane", username: "j0hn" });
      });

      it("updates one key and adds another", async () => {
        await request(app).put("/set?name=Jane&lastName=Doe");
        expect(app.locals.memory).toEqual({
          name: "Jane",
          lastName: "Doe",
          username: "j0hn",
        });
      });

      it("adds three new keys", async () => {
        await request(app).put("/set?key1=value1&key2=value2&key3=value3");
        expect(app.locals.memory).toEqual({
          name: "John",
          username: "j0hn",
          key1: "value1",
          key2: "value2",
          key3: "value3",
        });
      });
    });
  });
});
