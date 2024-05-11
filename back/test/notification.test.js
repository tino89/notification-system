const request = require("supertest")
const app = require("../app")
//const notification = require("../database/repository/notificationRepository")

//jest.mock('notification');

describe("Testing notification endpoint", () => {
    
    test("get all notification", async () => {
        const response = await request(app).get("/v1/notification");
        expect(response.statusCode).toBe(200);


    })
});
