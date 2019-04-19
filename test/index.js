const chai = require("chai"),
    chaiHttp = require("chai-http"),
    db = require("../models")

chai.should()
chai.use(chaiHttp)

describe("Authentication", () => {
    before(async () => {
        await db.User.deleteOne({ username: "johndoe" })
    })

    it("it should fail because no email/username found", done => {
        let credentials = {
            userInput: "johndoe@gmail.com",
            password: "johndoe123"
        }
        chai.request("http://localhost:5000")
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

    it("it should create a new user", done => {
        let credentials = {
            username: "johndoe",
            email: "johndoe@gmail.com",
            password: "johndoe123"
        }
        chai.request("http://localhost:5000")
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

    it("it should sign in successfully with correct email/username and password", done => {
        let credentials = {
            userInput: "johndoe@gmail.com",
            password: "johndoe123"
        }
        chai.request("http://localhost:5000")
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

    it("it should fail because of invalid username/email", done => {
        let credentials = {
            userInput: "johndoe1@gmail.com",
            password: "johndoe123"
        }
        chai.request("http://localhost:5000")
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

    it("it should fail because of invalid password", done => {
        let credentials = {
            userInput: "johndoe@gmail.com",
            password: "johndoe"
        }
        chai.request("http://localhost:5000")
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

describe("Get Homepage Projects", () => {
    it("should return featured, trending and recent lists", done => {
        chai.request("http://localhost:5000")
            .get("/home")
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("featured").to.be.an("array")
                res.body.should.have.property("trending").to.be.an("array")
                res.body.should.have.property("recent").to.be.an("array")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})

describe("Projects Search", () => {
    it("should return a list of projects whose names contain 'foo'", done => {
        chai.request("http://localhost:5000")
            .get("/search")
            .query({ q: "foo" })
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("projects").to.be.an("array")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})
