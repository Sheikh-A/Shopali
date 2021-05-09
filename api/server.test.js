const server = require("./server.js");
const request = require("supertest");
const db = require("../database/dbConfig.js");
const { expectCt } = require("helmet");


describe("server.js", () => {
    it("should be set the testing env", () => {
      expect(process.env.NODE_ENV).toBe("test");
    });

    describe("Get /", () => {
      it("should return 200 OK", () => {
        return request(server)
          .get("/test")
          .then((res) => {
            expect(res.status).toBe(200);
          });
      });

      //ASYNC
      it("should return 200 ok using async / await ", async () => {
        const res = await request(server).get("/test");
        expect(res.status).toBe(200);
      });
    });
  });
