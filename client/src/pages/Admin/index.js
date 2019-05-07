import React, { Component } from "react";
import api from "../../libs/api";
import ProjectItem from "../components/ProjectItem";

class Admin extends Component {
  state = {
    id: null,
    username: "",
    email: "",
    photo: "",
    projects: [...Array(6)]
  };

  componentDidMount() {
    this.getProjects();
  }

  //Get all the uploaded projects
  getProjects = () => {
    let id = this.props.match.params.id;
    this.setState({ id });
    api("get", "/projects/admin").then(({ projects }) => {
      this.setState({ projects });
    });
  };

  //Decide if a project is to be accepted or rejected
  decideProject = (id, confirmed) => {
    api("put", `/projects/admin`, {
      confirmed: confirmed
    }).then(() => {
      this.setState(prevState => ({
        projects: prevState.projects.filter(project => project._id !== id)
      }));
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.projects.map((p, i) => (
            <div>
              <ProjectItem key={p ? p._id : i} project={p} size="lage" />
              <button
                className="btn btn-success"
                onClick={() => this.decideProject(p ? p._id : i, true)}
              >
                Accept
              </button>
              <button
                className="btn btn-danger"
                onClick={() => this.decideProject(p ? p._id : i, false)}
              >
                Reject
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Admin;
