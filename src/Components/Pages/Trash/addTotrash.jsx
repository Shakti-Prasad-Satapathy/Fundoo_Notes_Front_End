import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { toast } from "react-toastify";

export default class AddToTrash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noteid: this.props.noteid

        }
    }
  
    handleAddToTrash = () => {
                var trashDetails = {
            "noteid": this.props.noteid
        }        
        this.addToTrash(trashDetails)
    }
    addToTrash(trashDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trashDetails)
        };
        fetch(process.env.REACT_APP_HOST+'/trash', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if (data.success) {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                            window.location.reload(false);
                        } else {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        }
                    });
            })
    }

    render() {        
        return (
            <div >
                        <Button onClick={this.handleAddToTrash} >Trash</Button>
            </div>
        )
    }
}
