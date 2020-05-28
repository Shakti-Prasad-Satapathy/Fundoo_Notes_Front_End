import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

export default class Untrash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noteid: this.props.noteid

        }
    }
  
    handleUntrasheNote = () => {
                var unarchiveDetails = {
            "noteid": this.props.noteid
        }
        
        this.unarchiveNote(unarchiveDetails)
        
    }
    unarchiveNote(unarchiveDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(unarchiveDetails)
        };
        fetch(process.env.REACT_APP_HOST+'/untrash', requestOptions)
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
                <Button onClick={this.handleUntrasheNote} >Untrash</Button>
            </div>
        )
    }
}
