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
                                <img className="img-fluid" src={Landing} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage
