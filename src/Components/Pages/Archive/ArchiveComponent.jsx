import React, { Component } from 'react'
import Archive from '@material-ui/icons/ArchiveOutlined';
import Unarchive from '@material-ui/icons/UnarchiveOutlined';

import { toast } from "react-toastify";

export default class AddToArchive extends Component {

    // constructor(props) {
    //     super(props);

    // }

    handleArchiveNote = () => {
        var archiveDetails = {
            "noteid": this.props.noteid
        }
        if (this.props.isarchived === "false") {
            this.addToArchive(archiveDetails)
        }
        else {
            this.unarchiveNote(archiveDetails)

        }

    }
    addToArchive(archiveDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(archiveDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/archive', requestOptions)
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

    unarchiveNote(archiveDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(archiveDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/unarchive', requestOptions)
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
        
        if (this.props.isarchived === "false") {
            return (
                <div onClick={this.handleArchiveNote} >
                    <Archive />

                </div>
            )
        }
        else {
            return (
                <div onClick={this.handleArchiveNote} >
                    <Unarchive />
                </div>
            )
        }


    }
}
