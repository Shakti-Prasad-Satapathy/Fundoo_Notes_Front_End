import React, { Component } from 'react';
import ImageIcon from '@material-ui/icons/ImageOutlined';
var FormData = require('form-data');

const url = "http://localhost:4000/"

export default class FleUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageUrl: '',
            filename: '',
        }
    }

    handleProfile = async (event) => {
        console.log("images selected", event.target.files[0]);
        var value = url + event.target.files[0].name

        await this.setState({
            imageUrl: value,
            filename: event.target.files[0].name
        })
        console.log("res in image",this.state.filename);
        let formData = new FormData();
        formData.append("image", this.state.imageUrl);
        formData.append("id", this.props.noteid)
        formData.append("filename", this.state.filename);
        
        console.log("***//res in image===", formData);

        console.log("***//res in image***", formData.get("image"), formData.get("id"));

        this.addNoteimg(formData)
    }

    addNoteimg(formData) {
        console.log("***//res in image", formData);

        const requestOptions = {
            method: 'POST',
            // headers: { 'Content-Type': 'multipart/form-data' },
            body: formData
            // body: JSON.stringify(formData)

        };
        fetch(process.env.REACT_APP_HOST + '/fileUpload', requestOptions)
            .then(response => {
                // console.log(response);
                
                response.json()
                    .then(data => {
                        if (data.success) {
                            alert("---Successfully uploaded---")
                            window.location.reload(false);

                        } else {
                            alert("...there is some probleam in img upload...")
                        }
                    });
            })
    }
    render() {
        return (
            <div  >
                <label htmlFor={this.props.noteid}>
                    <ImageIcon style={{ cursor: 'pointer' }} />
                </label>
                <input type="file" id={this.props.noteid} onChange={(event) => this.handleProfile(event)} style={{ display: 'none' }} />
            </div>
        );
    }
}