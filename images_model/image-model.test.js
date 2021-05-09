const request = require("supertest");
const server = require("../api/server");
const AuthRouter = require("../auth/auth-router.js");
const db = require("../database/dbConfig");
const Images = require('./image-model.js');
const ImagesRouter = require("../images_model/image-router.js");


let token;

beforeAll((done)=>{
  request(server)
  .post("/api/auth/login")
  .send({
    email: "test4@test.com",
    password: "test123"
  })
  .end((err, res) => {
    // console.log("RES", res.body.token)
    token = res.body.token;
    done();
  })
})

describe("GET /", () => {
    it("is using right testing environment", () => {
      expect(process.env.NODE_ENV).toBe("test");
    });
  });


describe("GET /", () => {
    it("should return 404 restricted address not logged in", () => {
        request(server)
        .get("/images")
        .then((res) => expect(res.status).toBe(404));
        });
    });


describe('Image Router', () => {

    it("should get images ", async () => {
        let theImages = await db('images');
        let counts = theImages.length;
        expect(theImages.length).toBe(counts);
      })


    it('returns status 401 and NO token', () => {
        const expectedCode = 401
        let response
        return request(server).get('/api/images').then(res => {
            response = res
            expect(response.status).toEqual(expectedCode)
        })
    })
})

describe(" get all image URLs", () => {
    it("should get all the image urls in the db", async () => {

      request(server)
      .get("/api/images/url")
      .set("Authorization", `${token}`)
      .then(res => {
        let theImages = res.body;
        let imageCount = theImages.length;
        expect(res.status).toBe(200)
        expect(theImages.length).toBe(imageCount)
      })
    })
})
