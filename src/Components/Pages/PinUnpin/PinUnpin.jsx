import React, { Component } from 'react'
import { toast } from "react-toastify";
import { Icon } from '@iconify/react';
import unpinIcon from '@iconify/icons-mdi/pin';
import pinIcon from '@iconify/icons-mdi/pin-outline';

export default class PinUnpin extends Component {

    // constructor(props) {
    //     super(props);

    // }

    handlePinUnpin = () => {

        var pinunpinDetails = {
            "noteid": this.props.noteid
        }
        if (this.props.ispined === "false") {
            this.addToPin(pinunpinDetails)
        }
        else {
            this.addToUnPin(pinunpinDetails)
        }

    }
    addToPin(pinunpinDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pinunpinDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/pin', requestOptions)
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

    addToUnPin(pinunpinDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pinunpinDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/unpin', requestOptions)
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
        if (this.props.ispined === "false") {
            return (
                <div onClick={this.handlePinUnpin} className="Pin" >
                    <Icon icon={pinIcon} />
                </div>
            )
        }
        else {
            return (
                <div onClick={this.handlePinUnpin} className="Pin" >

                    <Icon icon={unpinIcon} />
                </div>
            )
        }


    }
}
