import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from "react-toastify";

import { Icon } from '@iconify/react';
import pinIcon from '@iconify/icons-mdi/pin';
import './Notes.css'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Morevert from '@material-ui/icons/MoreVert';

// import Reminder from '../Reminder/Reminder'
import Reminder from '@material-ui/icons/AddAlertOutlined';

// import Collab from '../Collab/CollaboratorComponent'
import Collab from '@material-ui/icons/PersonAddOutlined';

// import Colorpallet from '../ColorPallet/ColorPaletteComponent'
import Colorpallet from '@material-ui/icons/ColorLensOutlined';

// import Archive from '../Archive/ArchiveComponent'
import Archive from '@material-ui/icons/ArchiveOutlined';

import Addpic from '../imgupload/FileUpload'
import Dialog from '@material-ui/core/Dialog';
import './Notes.css'

// import Pinicon from '../PinUnpin/PinUnpin'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
const theme = createMuiTheme({
    overrides: {
        MuiPaper:{
            elevation1:{
                boxShadow: '1px 1px 10px 1px #888888',
            },
        // },
        // MuiPaper:{
            rounded:{
                borderRadius: '8px',
            },
        },
        
    }
})
// const { classes } = props;

export default class createNote extends Component {

    constructor() {
        super();
        this.state = {
            isActiveModalModal: false,
            error: false,
            isOpen: false

        }
    }
    componentDidMount() {
        Modal.setAppElement('body');
    }
    togglModal = () => {
        this.setState({
            isOpen: true, //!this.state.isActiveModalModal
            title: "",
            content: ""
        })
    }
    modalClose = () => {
        this.setState({
            isActiveModalModal: false
        })
    }

    onChangeTitle = (e) => {
        var title = e.target.value;
        this.setState({
            title: title,
        })
    }
    onChangeContent = (e) => {
        var content = e.target.value;
        this.setState({
            content: content,
        })
    }
    // handleCloseDialog = () => {
    //     this.setState({
    //         isOpen: false
    //     })
    // }

    handleClickClose = () => {

        this.setState({
            isOpen: false
        })

        var createNoteDetails = {
            'logintoken': localStorage.getItem('token'),
            "title": this.state.title,
            "content": this.state.content
        }
        if (this.state.title !== "" || this.state.content !== "") {
            this.createNotes(createNoteDetails)
        }
    }
    createNotes(createNoteDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createNoteDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/createNote', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if (data.success) {
                            // toast(data.message, { position: toast.POSITION.TOP_CENTER });
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
                <MuiThemeProvider theme={theme}>
                    <Card className="CreateNote" onClick={this.togglModal}>
                        <Typography className='title' color="textSecondary" gutterBottom style={{ marginTop: '1%', marginLeft: '5%' }} >
                            Take A Note...
                        </Typography>
                    </Card>
                </MuiThemeProvider>

                <Dialog open={this.state.isOpen} onClose={this.handleClickClose} aria-labelledby="form-dialog-title" fullWidth={true} PaperProps={{ style: { padding: '0%5%', top: "-20%", right: "-4%", boxShadow: '1px 1px 30px 10px #353434', }, }}  >
                    <div >
                        <TextField label="Title" name="title" value={this.state.title} onChange={(e) => this.onChangeTitle(e)}
                            InputProps={{ disableUnderline: true, }} style={{ width: "100%" }}
                        />
                        <Icon icon={pinIcon} style={{ marginTop: '3%', marginRight: '-7%', alignSelf: 'flex-end', fontSize: '30px', transform: 'rotate(45deg)' }} />
                    </div>
                    <TextField label="Take a note" name="content" value={this.state.content} onChange={(e) => this.onChangeContent(e)}
                        InputProps={{ disableUnderline: true }} multiline={true}
                    /><br />

                    <div className="NoteFunctions" >
                        <Reminder />
                        <Colorpallet />
                        <Addpic />
                        <Collab />
                        <Archive />
                        <div>
                            < Morevert style={{ paddingBottom: '3%' }}
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={this.handleMenuClick}
                            />
                            {/* <Menu
                                open={this.state.isTrue}
                                anchorEl={this.state.anchorEl}
                                onClose={this.handleMenuClose}
                                keepMounted
                                PaperProps={{
                                    style: {
                                        width: '10ch',
                                    },
                                }}
                            >
                                <MenuItem ><Trash
                                /></MenuItem>
                                <MenuItem onClick={this.handleMenuClose}>
                                    <Label />
                                </MenuItem>

                            </Menu> */}
                        </div>
                        {/* </div>
                    <div > */}
                        <Button onClick={this.handleClickClose} >Close</Button>
                    </div>
                </Dialog>
                <ToastContainer />

            </div>
        )
    }
}
