import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
/****** */
// import { Snackbar, IconButton } from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
// import MuiAlert from '@material-ui/lab/Alert';


import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ToastContainer } from "react-toastify";
/*************** */
import Reminder from '@material-ui/icons/AddAlert';
// import Colorpallet from '@material-ui/icons/ColorLens';
import Addpic from '@material-ui/icons/Photo';
// import Collab from '@material-ui/icons/PersonAdd';
// import Archive from '@material-ui/icons/Archive';
import Morevert from '@material-ui/icons/MoreVert';
import { Icon } from '@iconify/react';
import pinIcon from '@iconify/icons-mdi/pin';
/***************** */
import '../Pages/Notes/Notes.css'
import Dialog from '@material-ui/core/Dialog';
// import Reminder from '../Reminder'
import Collab from '../Pages/Collab/CollaboratorComponent'
import Colorpallet from '../Pages/ColorPallet/ColorPaletteComponent'
import Archive from '../Pages/Archive/ArchiveComponent'
import Trash from '../Pages/Trash/addTotrash'
// import EditNote from './EditNote'


export default class NoteCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allNote: [],
            isOpen: false,
            isTrue: false,
            anchorEl: null,
            title: "",
            content: ""
        }
    }
    handleColor = (col, noteid) => {
        var data = {
            noteIdList: [noteid],
            color: col
        }
        this.setState({
            colorUpdate: col
        })
        console.log('data in get', data);

        this.colorChange(data)
            .then((res) => {
                console.log('*******************************', res);
                this.getNotes();
            }).catch((err) => {
                console.log('**************************');
            })
    }
    handleClickOpen = () => {

        this.setState({
            isOpen: true

        })

    }
    onChangeTitle = (e) => {
        var title = e.target.value;
        this.setState({
            title: title
        })
    }
    onChangeContent = (e) => {
        var content = e.target.value;
        this.setState({
            content: content
        })
    }

    handleClickClose = () => {
        this.setState({
            isOpen: false

        })
        var editNoteDetails = {
            // 'logintoken': localStorage.getItem('token')
            noteid: this.props.allNote.noteid,
            content: this.state.content
        }
        this.editNotes(editNoteDetails)
        // this.props.history.push("/allnotes")
        console.log("hhhhhhhhhh",this.state.content);

    }

    editNotes(editNoteDetails) {
        console.log("hhhhhhhhhhxxxxx",editNoteDetails);

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editNoteDetails)
        };
        // console.log("login---> try know");
        fetch(process.env.REACT_APP_HOST+'/updateNote', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        // console.log(data);
                        // console.log("14444444444411111114444441", data.data.notes);

                        // const allNotes = data.data.notes.map((notedata) => {
                        //     return (notedata)
                        // });
                        // this.setState({
                        //     allNote: allNotes
                        // })

                        if (data.success) {
                            alert("Successfully read the notesxxxxxxyyyyy")
                            // toast(data.message, { position: toast.POSITION.TOP_CENTER });
                            // this.props.history.push("/allnotes");                            


                        } else {
                            // toster alert for failure dont redirect to dasboard
                            alert("sorry Wrong id or password... Try again")
                            // toast(data.message, { position: toast.POSITION.TOP_CENTER });


                        }
                    });
            })

    }
    handleMenuClick = (event) => {

        this.setState({
            isTrue: true,
            anchorEl: event.currentTarget
        })

    };

    handleMenuClose = () => {
        this.setState({
            isTrue: false
        })

    };
    handleArchiveInGetnote = (isArchive) => {
        if (isArchive) {
            // this.getNotes()
        }
    }
    render() {
        return (
            <div >
                {/* {window.location.reload(false)} */}
                <Card variant="outlined" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginBottom: '5%', backgroundColor: 'red' }} >
                    <CardContent style={{ width: "100%" }} >
                        <div onClick={this.handleClickOpen} >
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography className='title' color="textSecondary" gutterBottom>
                                    NOTE TITLE<br />
                                    {this.props.allNote.title}
                                </Typography>
                                <Icon icon={pinIcon} />
                            </div>
                            <Typography>
                                NOTE CONTENTS<br />
                                {this.props.allNote.content}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }} >
                            <Reminder />
                            {/* <Colorpallet /> */}
                            {/* <Tooltip title="Change color"> */}
                            <Colorpallet
                                // paletteProps={this.handleColor}
                                notesId={this.props.allNote.noteid}
                            />
                            {/* </Tooltip> */}
                            <Addpic />
                            <Collab noteid={this.props.allNote.noteid}/>
                            {/* <Archive /> */}
                            <Archive noteid={this.props.allNote.noteid} />

                            {/* <Morevert /> */}
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={this.handleMenuClick}
                            >
                                < Morevert style={{ paddingBottom: '3%' }} />
                            </IconButton>

                            <Menu
                                // keepMounted
                                open={this.state.isTrue}
                                onClose={this.handleMenuClose}
                                PaperProps={{
                                    style: {
                                        width: '10ch',
                                    },
                                }}
                            >
                                <MenuItem ><Trash noteid={this.props.allNote.noteid} /></MenuItem>
                            </Menu>
                        </div>
                        <ToastContainer />

                    </CardContent>

                </Card >

                < div >
                    {/* <EditNote isOpen={this.state.isOpen} allNote={this.props.allNote} /> */}

                    <Dialog open={this.state.isOpen} onClose={this.handleClickClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField id="standard-basic" label="Title" defaultValue={this.props.allNote.title} onChange={(e) => this.onChangeTitle(e)} /> <Icon icon={pinIcon} />
                        </div><br /><br /><br />
                        <TextField id="standard-basic" label="Take a note" defaultValue={this.props.allNote.content} onChange={(e) => this.onChangeContent(e)} /><br /><br /><br />
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }} >
                            <Reminder />
                            <Colorpallet />
                            <Addpic />
                            <Collab />
                            <Archive />
                            <Icon icon={pinIcon} />
                            {/* <Morevert /> */}
                        </div>
                    </Dialog>
                </div >
            </div>
        )
    }
}
