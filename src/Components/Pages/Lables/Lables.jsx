import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { toast } from "react-toastify";
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';

export default class Lables extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isTrue: false,
            anchorEl: null,
            lable:this.props.lable
        }
    }

    handleClick = (event) => {
        this.setState({
            isTrue: true,
            anchorEl: event.currentTarget,
            removechip: 'true',

        })
    };

    handleClose = () => {
        this.setState({
            isTrue: false
        })

        var lableDetails = {
            'noteid': this.props.noteid,
            'lable': this.state.lable,
        }

        // console.log("klklkkklkl", this.props.removechip);
        // console.log("klklkkklkl", lableDetails);

        this.addLable(lableDetails)
    };

    onChangeLable = (e) => {
        var lable = e.target.value;
        this.setState({
            lable: lable,
        })
        // console.log("LLLLLL", this.state.lable);
        
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
                            window.location = window.location
                        } else {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        }
                    });
            })
    }

    render() {
        return (
            <div>

                <Button onClick={this.handleClick}>
                    Add Lable
                </Button>
                <Popover
                    open={this.state.isTrue}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <TextField id="standard-basic" label="Add lable" defaultValue={this.props.lable} onChange={(e) => this.onChangeLable(e)} />
                </Popover>
            </div>
        )
    }
}
