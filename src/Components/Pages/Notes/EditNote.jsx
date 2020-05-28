import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { Icon } from '@iconify/react';
import pinIcon from '@iconify/icons-mdi/pin';
import Addpic from '@material-ui/icons/Photo';
import Reminder from '@material-ui/icons/AddAlert';
import Collab from '../Collab/CollaboratorComponent'
import Colorpallet from '../ColorPallet/ColorPaletteComponent'
import Archive from '../Archive/ArchiveComponent'
import Morevert from '@material-ui/icons/MoreVert';

export default class EditNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: this.props.isOpen
        }
        this.isopen = this.props.isOpen
    }
    
    handleClickClose = () => {
        this.setState({
            isOpen: false

        })
        this.isopen = this.state.isOpen
        
    }
    render() {
        return (
            <div>
                <Dialog open={this.isopen} onClose={this.handleClickClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <TextField id="standard-basic" label="Title" defaultValue={this.props.allNote.title} /> <Icon icon={pinIcon} />
                    </div><br /><br /><br />
                    <TextField id="standard-basic" label="Take a note" defaultValue={this.props.allNote.content} /><br /><br /><br />
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }} >
                        <Reminder />
                        <Colorpallet />
                        <Addpic />
                        <Collab />
                        <Archive />
                        <Morevert />
                    </div>
                </Dialog>
            </div>
        )
    }
}
