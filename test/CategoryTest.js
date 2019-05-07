const chai = require("chai")
const chaiHttp = require("chai-http")
const db = require("../models")

const baseURL = "http://localhost:8080/api/categories"

chai.should()
chai.use(chaiHttp)

describe("Categories", () => {
    it("should get all available categories", done => {
        chai.request(baseURL)
            .get("/")
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("categories").to.be.an("array")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    it("should return a list of categories whose names contain 'Java'", done => {
        chai.request(baseURL)
            .get("/search")
            .query({ q: "Java" })
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("categories").to.be.an("array")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})
