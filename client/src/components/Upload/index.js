import firebase from "firebase"
import React, { Component } from "react"
import FileUploader from "react-firebase-file-uploader"
import Upload from "../../static/Upload.png"

const config = {
    apiKey: "AIzaSyB53Nb6qYzyTPO-oEsstxNaGajFGjw4Sic",
    authDomain: "skymarket-43b75.firebaseapp.com",
    databaseURL: "https://skymarket-43b75.firebaseio.com",
    projectId: "skymarket-43b75",
    storageBucket: "skymarket-43b75.appspot.com",
    messagingSenderId: "406220759477"
}

firebase.initializeApp(config)

export default class index extends Component {
    state = {
        isUploading: false,
        iconURL: ""
    }

    handleSubmit = e => {
        e.preventDefault()
    }

    handleUploadSuccess = filename => {
        this.setState({ isUploading: false })
        firebase
            .storage()
            .ref("icons")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ iconURL: url }))
    }

    render() {
        return (
            <div className="container" onSubmit={this.handleSubmit}>
                <form>
                    <div
                        style={{
                            width: 100,
                            height: 100,
                            margin: "auto",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundImage: `url(${
                                this.state.iconURL
                                    ? '"' + this.state.iconURL + '"'
                                    : Upload
                            })`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain"
                        }}>
                        {this.state.isUploading && (
                            <div
                                className="spinner-border text-info"
                                role="status"
                            />
                        )}
                        <FileUploader
                            style={{
                                position: "absolute",
                                height: 150,
                                opacity: 0,
                                cursor: "pointer"
                            }}
                            accept="image/*"
                            randomizeFilename
                            storageRef={firebase.storage().ref("icons")}
                            onUploadStart={() =>
                                this.setState({ isUploading: true })
                            }
                            onUploadError={error => {
                                this.setState({ isUploading: false })
                                console.log(error)
                            }}
                            onUploadSuccess={this.handleUploadSuccess}
                        />
                    </div>
                    <div className="form-group">
                        <label>Project Name</label>
                        <input
                            type="text"
                            maxLength={20}
                            className="form-control"
                            placeholder="Awesome Project"
                        />
                    </div>
                    <div className="form-group">
                        <label>Headline</label>
                        <small className="text-muted">
                            {" - "}A very short description of your project
                        </small>
                        <input
                            type="text"
                            maxLength={50}
                            className="form-control"
                            placeholder="This project does fantastic things!"
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" rows="3" />
                    </div>
                    <input type="submit" className="btn btn-fill" />
                </form>
            </div>
        )
    }
}
