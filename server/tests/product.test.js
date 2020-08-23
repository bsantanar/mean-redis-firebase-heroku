const request = require("supertest");
const sinon = require('sinon');

//const app = require('../server');

let app;
const authenticationMiddleware = require('../middlewares/validateToken');
const cacheMiddleware = require('../middlewares/cache');

describe("TEST server.js", () => {

    beforeAll(() => {
        sinon.stub(authenticationMiddleware, 'checkToken').callsFake(async (req, res, next) => next());
        sinon.stub(cacheMiddleware, 'cache').callsFake(async (req, res, next) => next());
        app = require('../server');
    });
  
    it("GET /products route, should return message", async (done) => {
        const response = await request(app).get("/api/products/123").set('Authorization', 'Bearer 12asd');
        //console.log(response.body)
        expect(response.statusCode === 200 || response.statusCode === 400).toBeTruthy();
        //expect(validateToken).toHaveBeenCalledTimes(1);
        done();
    });
  
    it("GET /products/bySku route, should return message", async (done) => {
        const response = await request(app).get("/api/products/bySku/2000374667845P").set('Authorization', 'Bearer 12asd');
        //console.log(response.body)
        expect(response.statusCode === 200 || response.statusCode === 400).toBeTruthy();
        done();
    });
});