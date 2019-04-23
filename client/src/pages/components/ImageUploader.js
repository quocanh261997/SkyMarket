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

class ImageUploader extends Component {
    state = {
        isUploading: false
    }

    static getImage(name) {
        return firebase
            .storage()
            .ref("photos")
            .child(name)
            .getDownloadURL()
    }

    render() {
        const background = this.props.backgroundImage
            ? this.props.backgroundImage
            : Upload
        return (
            <div
                style={{
                    width: 120,
                    height: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    ...this.props.style
                }}>
                {this.state.isUploading && (
                    <div className="spinner-border text-info" role="status" />
                )}
                <FileUploader
                    style={{
                        position: "absolute",
                        width: 120,
                        height: 120,
                        opacity: 0,
                        cursor: "pointer"
                    }}
                    accept="image/*"
                    randomizeFilename
                    storageRef={firebase.storage().ref("photos")}
                    onUploadStart={() => this.setState({ isUploading: true })}
                    onUploadError={error => {
                        this.setState({ isUploading: false })
                        console.log(error)
                    }}
                    onUploadSuccess={name => {
                        this.setState({ isUploading: false })
                        this.props.onUploadSuccess(name)
                    }}
                />
            </div>
        )
    }
}

export default ImageUploader
