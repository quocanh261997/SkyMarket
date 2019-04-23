import React, { Component } from "react"
import api from "../../libs/api"
import IconUpload from "../../static/IconUpload.png"
import PhotoUpload from "../../static/PhotoUpload.png"
import ImageUploader from "../components/ImageUploader"
import SearchBox from "../components/SearchBox"

export default class index extends Component {
    state = {
        icon: "",
        name: "",
        headline: "",
        description: "",
        photos: [],
        selectedDevs: [],
        selectedCats: []
    }

    getDevelopers = value => {
        return api("get", `/users/search?q=${value}`).then(({ users }) => users)
    }

    getCategories = value => {
        return api("get", `/categories/search?q=${value}`).then(
            ({ categories }) => categories
        )
    }

    handleDevSelect = o => {
        this.setState(prev => ({
            selectedDevs: [...prev.selectedDevs, o]
        }))
    }

    handleDevUnselect = o => {
        this.setState(prev => ({
            selectedDevs: prev.selectedDevs.filter(({ _id }) => _id !== o._id)
        }))
    }

    handleCatSelect = o => {
        this.setState(prev => ({
            selectedCats: [...prev.selectedCats, o]
        }))
    }

    handleCatUnselect = o => {
        this.setState(prev => ({
            selectedCats: prev.selectedCats.filter(({ _id }) => _id !== o._id)
        }))
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        let {
            icon,
            name,
            headline,
            description,
            photos,
            selectedDevs,
            selectedCats
        } = this.state
        if (
            icon &&
            name &&
            headline &&
            description &&
            photos.length > 0 &&
            selectedDevs.length > 0 &&
            selectedCats.length > 0
        ) {
            api("post", "/projects", {
                ...this.state,
                developers: selectedDevs.map(d => d._id),
                categories: selectedCats.map(c => c._id)
            }).then(({ project }) =>
                this.props.history.push(`/projects/${project}`)
            )
        }
    }

    handleIconUpload = name => {
        ImageUploader.getImage(name).then(icon => this.setState({ icon }))
    }

    handlePhotoUpload = name => {
        ImageUploader.getImage(name).then(photo =>
            this.setState(prev => ({ photos: [...prev.photos, photo] }))
        )
    }

    render() {
        const {
            name,
            headline,
            description,
            selectedDevs,
            selectedCats
        } = this.state
        return (
            <div className="container my-4">
                <form onSubmit={this.handleSubmit}>
                    <ImageUploader
                        style={{ margin: "auto" }}
                        backgroundImage={
                            this.state.icon ? this.state.icon : IconUpload
                        }
                        onUploadSuccess={this.handleIconUpload}
                    />
                    <div className="form-group">
                        <label>Project Name</label>
                        <input
                            type="text"
                            name="name"
                            maxLength={20}
                            className="form-control"
                            placeholder="Awesome Project"
                            value={name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Headline</label>
                        <small className="text-muted">
                            {" - "}A very short description of your project
                        </small>
                        <input
                            type="text"
                            name="headline"
                            maxLength={50}
                            className="form-control"
                            placeholder="This project does fantastic things!"
                            value={headline}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Developers</label>
                        <SearchBox
                            isMulti
                            selectedOptions={selectedDevs}
                            loadOptions={this.getDevelopers}
                            optionKey={o => o._id}
                            optionLabel={o => o.username}
                            optionImg={o => o.photo}
                            placeholder="Search"
                            onSelect={this.handleDevSelect}
                            onUnselect={this.handleDevUnselect}
                        />
                    </div>
                    <div className="form-group">
                        <label>Categories</label>
                        <SearchBox
                            isMulti
                            selectedOptions={selectedCats}
                            loadOptions={this.getCategories}
                            optionKey={o => o._id}
                            optionLabel={o => o.name}
                            optionImg={o => o.photo}
                            placeholder="Search"
                            onSelect={this.handleCatSelect}
                            onUnselect={this.handleCatUnselect}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            rows="3"
                            value={description}
                            onChange={this.handleChange}
                            placeholder="Show how awesome your project is!"
                        />
                    </div>
                    <div className="form-group">
                        <label>Photos</label>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center"
                            }}>
                            {this.state.photos.map(p => (
                                <img
                                    style={{
                                        width: 200,
                                        margin: "0 1em 1em 0"
                                    }}
                                    key={p}
                                    src={p}
                                    alt="Upload"
                                />
                            ))}
                            <ImageUploader
                                backgroundImage={PhotoUpload}
                                onUploadSuccess={this.handlePhotoUpload}
                            />
                        </div>
                    </div>
                    <input type="submit" className="btn btn-fill" />
                </form>
            </div>
        )
    }
}
