const chai = require("chai")
const chaiHttp = require("chai-http")
const db = require("../models")

const baseURL = "http://localhost:8080/api/admin"

chai.should()
chai.use(chaiHttp)

describe("Admin", () => {
    let adminCredentials = {
        userInput: "admin",
        password: "admin"
    }

    let credentials = {
        username: "johndoe",
        email: "johndoe@gmail.com",
        password: "johndoe123"
    }

    before(async () => await cleanUp())
    after(async () => await cleanUp())

    it("should not allow unauthenticated user to view pending projects", done => {
        chai.request(baseURL)
            .get("/")
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

    it("should not allow non-admin user to view pending projects", done => {
        chai.request("http://localhost:8080/api/users")
            .post("/signup")
            .send(credentials)
            .then(({ body: { token } }) => {
                chai.request(baseURL)
                    .get("/")
                    .set("Authorization", `Bearer ${token}`)
                    .then(res => {
                        res.should.have.status(401)
                        res.body.should.be.a("object")
                        res.body.should.have
                            .property("type")
                            .eql("UNAUTHORIZED")
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    })

    it("should allow admin to view pending projects", done => {
        chai.request("http://localhost:8080/api/users")
            .post("/signin")
            .send(adminCredentials)
            .then(({ body: { token } }) => {
                chai.request(baseURL)
                    .get("/")
                    .set("Authorization", `Bearer ${token}`)
                    .then(res => {
                        res.should.have.status(200)
                        res.body.should.be.a("object")
                        res.body.should.have
                            .property("projects")
                            .to.be.an("array")
                        done()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    })

    it("should allow admin to accept pending projects", done => {
        chai.request("http://localhost:8080/api/users")
            .post("/signin")
            .send({
                userInput: "johndoe",
                password: "johndoe123"
            })
            .then(({ body: { token } }) => {
                let project = {
                    name: "Test Project",
                    headline: "This is a wonderful headline",
                    description: "This is a wonderful description",
                    developers: [
                        "5cae98ac826e13213117724e",
                        "5cae98ac826e13213117724f"
                    ],
                    categories: [
                        "5caebff2e1ebb4395d1a32b7",
                        "5caebff2e1ebb4395d1a32bb"
                    ],
                    icon:
                        "https://robohash.org/nostrumsedex.jpg?size=60x60&set=set1",
                    photos: [
                        "http://dummyimage.com/400x300",
                        "http://dummyimage.com/400x300"
                    ]
                }
                chai.request("http://localhost:8080/api/projects")
                    .post("/")
                    .set("Authorization", `Bearer ${token}`)
                    .send(project)
                    .then(({ body: { project: projectId } }) => {
                        chai.request("http://localhost:8080/api/users")
                            .post("/signin")
                            .send(adminCredentials)
                            .then(({ body: { token: adminToken } }) => {
                                chai.request(baseURL)
                                    .post("/")
                                    .set(
                                        "Authorization",
                                        `Bearer ${adminToken}`
                                    )
                                    .send({
                                        id: projectId,
                                        confirmed: true
                                    })
                                    .then(res => {
                                        res.should.have.status(204)
                                        done()
                                    })
                            })
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
