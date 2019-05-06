const chai = require("chai")
const chaiHttp = require("chai-http")
const db = require("../models")

const baseURL = "http://localhost:8080/api/projects"

const assert = chai.assert
chai.should()
chai.use(chaiHttp)

describe("Projects", () => {
    it("should return featured, trending and recent lists", done => {
        chai.request(baseURL)
            .get("/")
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

    it("should return projects of category JavaScript", done => {
        chai.request(baseURL)
            .get("/?category=5caebff2e1ebb4395d1a32e9")
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("name").eql("JavaScript")
                res.body.should.have.property("projects").to.be.an("array")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    it("should return projects of user zberkbl", done => {
        chai.request(baseURL)
            .get("/?user=5cae98ac826e1321311773ef")
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("username").eql("zberkbl")
                res.body.should.have.property("projects").to.be.an("array")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    it("should return a list of projects whose names contain 'foo'", done => {
        chai.request(baseURL)
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

    it("should return details of project Bytecard", done => {
        chai.request(baseURL)
            .get("/5caec78dc02d2d3bb8af4504")
            .then(res => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("project")
                assert.propertyVal(res.body.project, "name", "Bytecard")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})

describe("Create Project", () => {
    before(async () => await cleanUp())
    after(async () => await cleanUp())

    let project = {
        name: "Test Project",
        headline: "This is a wonderful headline",
        description: "This is a wonderful description",
        developers: ["5cae98ac826e13213117724e", "5cae98ac826e13213117724f"],
        categories: ["5caebff2e1ebb4395d1a32b7", "5caebff2e1ebb4395d1a32bb"],
        icon: "https://robohash.org/nostrumsedex.jpg?size=60x60&set=set1",
        photos: [
            "http://dummyimage.com/400x300",
            "http://dummyimage.com/400x300"
        ]
    }

    it("should not allow unauthenticated user to create project", done => {
        chai.request(baseURL)
            .post("/")
            .send(project)
            .then(res => {
                res.should.have.status(401)
                res.body.should.be.a("object")
                res.body.should.have.property("type").eql("UNAUTHORIZED")
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    it("should create a new project", done => {
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
                    .post("/")
                    .set("Authorization", `Bearer ${token}`)
                    .send(project)
                    .then(res => {
                        res.should.have.status(201)
                        res.body.should.be.a("object")
                        res.body.should.have.property("project")
                        done()
                    })
            })
            .catch(err => {
                console.log(err)
            })
    })
})

function cleanUp() {
    return Promise.all([
        db.Project.deleteOne({ name: "Test Project" }),
        db.User.deleteOne({ username: "johndoe" })
    ])
}
