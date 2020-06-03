import React, { Component } from 'react'
import Chip from '@material-ui/core/Chip';

export default class Chips extends Component {
    constructor() {
        super();
        this.state = {
            showchip: true
        }
    }

    handleDelete = () => {
        this.setState({
            showchip: false
        })
        console.log(this.showchip, "KKKKKKK");
    }

    handleClick = () => {
alert("ffffffff")    }
    render() {
        return (
            <div >
                {this.state.showchip ?
                    <Chip label="Deletable primary" onDelete={this.handleDelete} color="primary" onClick = {this.handleClick} />
                    :
                    null
                }
            </div>
        );
    }
}