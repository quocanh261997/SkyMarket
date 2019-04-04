import React, { Component } from "react"
import Background from "../static/Background.png"
import Landing from "../static/Landing.png"

class Homepage extends Component {
    render() {
        return (
            <div>
                <div
                    style={{
                        backgroundColor: "#7FB9DD",
                        paddingTop: 30,
                        paddingBottom: 30
                    }}>
                    <div
                        style={{
                            backgroundImage: `url(${Background})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat"
                        }}>
                        <div className="container row m-auto d-flex align-items-center">
                            <div
                                className="col-md-6"
                                style={{ marginBottom: "1em" }}>
                                <h2 style={{ color: "white" }}>
                                    Showcase your projects with SkyMarket
                                </h2>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Project's name"
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <div className="col-md-6 text-center">
                                <img
                                    className="img-fluid"
                                    src={Landing}
                                    alt="Landing"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container row">
                    <ul className="col-md-5 list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center active">
                            Cras justo odio
                            <span className="badge badge-primary badge-pill">
                                x
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Dapibus ac facilisis in
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            Morbi leo risus
                        </li>
                    </ul>
                    <div className="col-md-7">
                        <div>
                            <h5>Featured Projects</h5>
                            <dl className="list-inline dl-horizontal">
                                <li
                                    className="list-inline-item card"
                                    style={{ width: "18em" }}>
                                    <img
                                        src="https://dummyimage.com/600x400"
                                        className="card-img-top"
                                        alt="Project Image"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Project #0
                                        </h5>
                                        <p className="card-text">Lorem ipsum</p>
                                    </div>
                                </li>
                                <li
                                    className="list-inline-item card"
                                    style={{ width: "18em" }}>
                                    <img
                                        src="https://dummyimage.com/600x400"
                                        className="card-img-top"
                                        alt="Project Image"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Project #0
                                        </h5>
                                        <p className="card-text">Lorem ipsum</p>
                                    </div>
                                </li>
                                <li
                                    className="list-inline-item card"
                                    style={{ width: "18em" }}>
                                    <img
                                        src="https://dummyimage.com/600x400"
                                        className="card-img-top"
                                        alt="Project Image"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Project #0
                                        </h5>
                                        <p className="card-text">Lorem ipsum</p>
                                    </div>
                                </li>
                                <li
                                    className="list-inline-item card"
                                    style={{ width: "18em" }}>
                                    <img
                                        src="https://dummyimage.com/600x400"
                                        className="card-img-top"
                                        alt="Project Image"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Project #0
                                        </h5>
                                        <p className="card-text">Lorem ipsum</p>
                                    </div>
                                </li>
                            </dl>
                        </div>
                        <div>
                            <h5>Trending Projects</h5>
                        </div>
                        <div>
                            <h5>Recent Projects</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage
