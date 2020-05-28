import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

export default class AddToTrash extends Component {

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
        // this.props.history.push("/allnotes")
    }
    unarchiveNote(unarchiveDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(unarchiveDetails)
        };
        fetch(process.env.REACT_APP_HOST+'/unarchive', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if (data.success) {
                            alert("Successfully note unArchived")
                            window.location.reload(false);
                        } else {
                            alert("there is some probleam in untrashing")
                        }
                    });
            })
    }

    render() {
        
        return (
            <div >
                        <Button onClick={this.handleUntrasheNote} >unarchive</Button>
            </div>
        )
    }
}
