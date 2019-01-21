const Supertest = require("supertest");

const app = require("../src/index");

const server = new Supertest(app.listen());

describe("Basic api functionality", () => {
  afterAll(done => {
    app.close(done);
  });

  it("Should return some data", async () => {
    const response = await server.get(
      `/api/?type=weather&location=Helsinki,fi`
    );

    // console.log(response);
    const data = response.body;

    expect(response.status).toBe(200);
    expect(data.name).toBe("Helsinki");
  });
});
