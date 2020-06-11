import React, { Component } from 'react'
import Chip from '@material-ui/core/Chip';
import { toast } from "react-toastify";
import { withRouter } from 'react-router-dom';
class Chips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showchip: true,
            result: [],
        }
    }

    handleDelete = () => {

        var lableDetails = {
            'noteid': this.props.noteid,
            'lable': null,
        }
        this.addLable(lableDetails)

    }

    handleClick = () => {
        var lableDetails = {
            'logintoken': localStorage.getItem('token'),
            'lable': this.props.lable,
        }
        this.getLable(lableDetails)
    }

    getLable(lableDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lableDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/getLable', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if (data.success) {
                            var resultnote = []
                            data.data.notes.map((note) => {
                                return (resultnote.push(note))
                            })
                            this.setState({
                                result: resultnote
                            })
                            this.props.history.push('/allnotes', { "allNote": this.state.result })
                        } else {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        }
                    });
            })
    }

    addLable(lableDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lableDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/addlable', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if (data.success) {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                            // window.location = window.location
                            window.reload(false);
                        } else {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        }
                    });
            })
    }

    render() {
        // console.log("GGGGGGGGGG",this.props.lable);
        return (
            <div >
                <Chip label={this.props.lable} onDelete={this.handleDelete} color="primary" onClick={() => this.handleClick()} />
            </div>
        );
    }
}

export default withRouter(Chips)