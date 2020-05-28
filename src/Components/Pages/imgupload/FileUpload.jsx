import React, { Component } from 'react';
import ImageIcon from '@material-ui/icons/ImageOutlined';
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
        let value = url + event.target.files[0].name
        //console.log("res in image",image);       
        await this.setState({
            imageUrl: event.target.files[0],
            filename: event.target.files[0].name
        })
        var addImgDetails = {
            "noteid": this.props.noteid,
            'file': this.state.imageUrl,
            'filename': this.state.filename,
            // 'image': this.state.imageUrl,
        }
        this.addNoteimg(addImgDetails)
    }
    
    addNoteimg(addImgDetails) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addImgDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/fileUpload', requestOptions)
            .then(response => {
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