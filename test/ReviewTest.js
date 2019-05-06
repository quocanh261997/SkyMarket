const chai = require("chai")
const chaiHttp = require("chai-http")
const db = require("../models")

const baseURL = "http://localhost:8080/api/projects"

chai.should()
chai.use(chaiHttp)

describe("Reviews", () => {
    it("should get all reviews for project Bytecard", done => {
        chai.request(baseURL)
            .get("/5caec78dc02d2d3bb8af4504/reviews")
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("reviews")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    let review = {
        content: "Test review"
    }

    after(
        async () =>
            await db.Review.deleteOne({
                project: "5caec78dc02d2d3bb8af4504",
                content: review.content
            })
    )

    it("should not allow unauthenticated user to post review", done => {
        chai.request(baseURL)
            .post("/5caec78dc02d2d3bb8af4504/reviews")
            .send(review)
            .then(res => {
                res.should.have.status(401)
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    it("should create new review", done => {
        let credentials = {
            username: "johndoe",
            email: "johndoe@gmail.com",
            password: "johndoe123"
        }

        chai.request("http://localhost:8080/api/users")
            .post("/signup")
            .send(credentials)
            .then(({ body: { token } }) => {
                chai.request(baseURL)
                    .post("/5caec78dc02d2d3bb8af4504/reviews")
                    .set("Authorization", `Bearer ${token}`)
                    .send(review)
                    .then(res => {
                        res.should.have.status(201)
                        res.body.should.be.a("object")
                        res.body.should.have.property("review")
                        done()
                    })
            })
            .catch(err => {
                console.log(err)
            })
    })
})
