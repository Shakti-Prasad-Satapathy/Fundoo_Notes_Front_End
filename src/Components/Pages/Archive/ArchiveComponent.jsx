import React, { Component } from 'react'
import Archive from '@material-ui/icons/Archive';
import { toast } from "react-toastify";

export default class AddToArchive extends Component {

    // constructor(props) {
    //     super(props);
        
    // }

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
        fetch(process.env.REACT_APP_HOST + '/archive', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if (data.success) {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                            // window.location.reload(false);
                        } else {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        }
                    });
            })
    }

    render() {

        return (
            <div onClick={this.handleAddToTrash} >
                <Archive />
            </div>
        )
    }
}
