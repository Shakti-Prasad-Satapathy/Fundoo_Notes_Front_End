import React, { Component, createRef } from 'react';

import DatePicker from 'react-datepicker';
import Popover from '@material-ui/core/Popover';
import Remindericon from '@material-ui/icons/AddAlert';
import { toast } from "react-toastify";

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './rem.css'



class Reminder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date(),
            anchorEl: false,
            remainder: "",
            remdate: ""
        };
        this.buttonRef = createRef()

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClick = (event) => {

        this.setState({
            anchorEl: true
            // anchorEl: event.currentTarget
        })
    };

    handleClose = () => {
        this.setState({
            anchorEl: false
        })
    };

    handleChange(date) {
        this.setState({
            startDate: date
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        var date = this.state.startDate
        var addremainderDetails = {
            "noteid": this.props.notesId,
            "remainder": date
        }
        this.addremainder(addremainderDetails)
    }
    addremainder(addremainderDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addremainderDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/reminders', requestOptions)
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
            <div >
                <div onClick={this.handleClick} ref={this.buttonRef} ><Remindericon /></div>
                <Popover

                    open={this.state.anchorEl}
                    onClose={this.handleClose}
                    // anchorEl={this.state.anchorEl}
                    anchorEl={() => this.buttonRef.current}

                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',

                    }}
                >
                    <form onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <label>Select Date: </label>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                name="startDate"
                                dateFormat="MM/dd/yyyy"
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success">Add Date</button>
                        </div>
                    </form>
                </Popover>
            </div>
        );
    }
}

export default Reminder;



