import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

export default class DeletFromTrash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noteid: this.props.noteid

        }
    }
  
    handleDeleteNote = () => {
                var deleteDetails = {
            "noteid": this.props.noteid
        }
        
        this.deleteNote(deleteDetails)
    }
    deleteNote(deleteDetails) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deleteDetails)
        };
        fetch(process.env.REACT_APP_HOST+'/deleteNote', requestOptions)
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
                        <Button onClick={this.handleDeleteNote} >Delete</Button>
            </div>
        )
    }
}
