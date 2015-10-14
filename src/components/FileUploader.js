import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class FileUploader extends Component {
  constructor() {
    super();
    this.state = {
      files: []
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
  }
  handleFile = (e) => {
    e.preventDefault();
    const node = this.refs.file;
    const file = node.files[0];
    const nextState = {
      ...this.state,
      files: [...this.state.files, {
        title: file.name,
        path: URL.createObjectURL(file)
      }]
    };
    this.setState(nextState);
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.files.map(file =>
            <li>
              <h3>{file.title}</h3>
              <img src={file.path} />
            </li>)}
        </ul>
        <hr />
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <input
            onChange={this.handleFile}
            placeholder="Upload file"
            ref='file'
            type="file"
          />
        </form>
      </div>
    );
  }
}
