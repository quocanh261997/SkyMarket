const chai = require("chai")
const chaiHttp = require("chai-http")
const db = require("../models")

const baseURL = "http://localhost:8080/api/users"

chai.should()
chai.use(chaiHttp)

describe("Authentication", () => {
    before(async () => {
        await db.User.deleteOne({ username: "johndoe" })
    })

    it("should fail because no email/username found", done => {
        let credentials = {
            userInput: "johndoe@gmail.com",
            password: "johndoe123"
        }
        chai.request(baseURL)
            .post("/signin")
            .send(credentials)
            .then(res => {
                res.should.have.status(400)
                res.body.should.be.a("object")
                res.body.should.have.property("type").eql("INVALID_EMAIL")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    it("should create a new user", done => {
        let credentials = {
            username: "johndoe",
            email: "johndoe@gmail.com",
            password: "johndoe123"
        }
        chai.request(baseURL)
            .post("/signup")
            .send(credentials)
            .then(res => {
                res.should.have.status(201)
                res.body.should.be.a("object")
                res.body.should.have.property("_id")
                res.body.should.have.property("username")
                res.body.should.have.property("photo")
                res.body.should.have.property("token")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    it("should sign in successfully with correct email/username and password", done => {
        let credentials = {
            userInput: "johndoe@gmail.com",
            password: "johndoe123"
        }
        chai.request(baseURL)
            .post("/signin")
            .send(credentials)
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("_id")
                res.body.should.have.property("username")
                res.body.should.have.property("photo")
                res.body.should.have.property("token")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    it("should fail because of invalid username/email", done => {
        let credentials = {
            userInput: "johndoe1@gmail.com",
            password: "johndoe123"
        }
        chai.request(baseURL)
            .post("/signin")
            .send(credentials)
            .then(res => {
                res.should.have.status(400)
                res.body.should.be.a("object")
                res.body.should.have.property("type").eql("INVALID_EMAIL")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    it("should fail because of invalid password", done => {
        let credentials = {
            userInput: "johndoe@gmail.com",
            password: "johndoe"
        }
        chai.request(baseURL)
            .post("/signin")
            .send(credentials)
            .then(res => {
                res.should.have.status(400)
                res.body.should.be.a("object")
                res.body.should.have.property("type").eql("INVALID_PASSWORD")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})

describe("Users", () => {
    it("should return a list of users whose names contain 'john'", done => {
        chai.request(baseURL)
            .get("/search")
            .query({ q: "john" })
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("users").to.be.an("array")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})
