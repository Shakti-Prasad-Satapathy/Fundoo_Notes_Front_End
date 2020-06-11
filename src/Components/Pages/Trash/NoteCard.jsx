import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
/****** */
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { toast, ToastContainer } from "react-toastify";

/*************** */
import Morevert from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import Reminder from '../Reminder/Reminder'
import Collab from '../Collab/CollaboratorComponent'
import Colorpallet from '../ColorPallet/ColorPaletteComponent'
import Archive from '../Archive/ArchiveComponent'
import Addpic from '../imgupload/FileUpload'
import Pinicon from '../PinUnpin/PinUnpin'
import RemoveLable from '../Lables/RemoveLable'
import Untrash from '../Trash/Untrash'
import Delete from '../Trash/DeleteNote'
import Label from '../Lables/Lables'
import './Trash.css';


export default class NoteCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isTrue: false,
            anchorEl: null,
            title: "",
            content: this.props.allNote.content,

        }
    }

    handleClickOpen = () => {
        this.setState({
            isOpen: true

        })
    }
    onChangeTitle = (e) => {
        var title = e.target.value;
        this.setState({
            title: title,
            // noteid: "",
            error: false
        })
    }
    onChangeContent = (e) => {
        var content = e.target.value;
        this.setState({
            content: content,
            error: false
        })
    }

    handleClickClose = () => {
        if (this.state.content === "") {
            this.setState({
                error: true
            })
            console.log(this.state.error);
        }
        else {
            this.setState({
                isOpen: false

            })
            var editNoteDetails = {
                noteid: this.props.allNote.noteid,
                content: this.state.content
            }
            if (this.props.allNote.content !== this.state.content) {
                this.editNotes(editNoteDetails)
            }
            // this.editNotes(editNoteDetails)
        }

    }

    editNotes(editNoteDetails) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editNoteDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/updateNote', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {

                        if (data.success) {
                            window.location.reload(false);
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        } else {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
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

    handleColor = (color) => {
        this.setState({
            color: color
        });
    }


    render() {

        return (
            <div className="NoteCard" >
                <Card variant="outlined" className="Card" style={{ backgroundColor: this.state.color }} >
                    <CardContent className="CardContent" >
                        <div className="ContentDiv" >
                            <div style={{ maxWidth: "90%" }} onClick={this.handleClickOpen}>
                                <Typography className='title' color="textSecondary" gutterBottom>
                                    NOTE TITLE<br />
                                    {this.props.allNote.title}
                                </Typography>

                                <Typography className="ContentStyle" >
                                    NOTE CONTENTS<br />
                                    {(this.props.allNote.content).split('\n')}
                                </Typography>
                            </div>
                            <div>
                                <Pinicon
                                    noteid={this.props.allNote.noteid}
                                    ispined={this.props.allNote.is_pined}
                                />
                            </div>
                        </div>
                        <div>
                            {this.props.allNote.lable !== null ?
                                < RemoveLable noteid={this.props.allNote.noteid}
                                    lable={this.props.allNote.lable}
                                /> : null
                            }
                        </div>
                        <div className="NoteFunctions" >
                            <Reminder
                                notesId={this.props.allNote.noteid}
                            />
                            <Colorpallet
                                onSelectColor={this.handleColor}
                                notesId={this.props.allNote.noteid}
                            />
                            <Addpic
                                noteid={this.props.allNote.noteid}
                            />
                            <Collab
                                noteid={this.props.allNote.noteid}
                            />
                            <Archive
                                noteid={this.props.allNote.noteid}
                                isarchived={this.props.allNote.is_archived}

                            />
                            <div>
                                < Morevert style={{ paddingBottom: '3%' }}
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={this.handleMenuClick}
                                />
                                <Menu
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
                                    <MenuItem ><Untrash noteid={this.props.allNote.noteid} /></MenuItem>
                                    <MenuItem ><Delete noteid={this.props.allNote.noteid} /></MenuItem>
                                    <MenuItem onClick={this.handleMenuClose}>
                                        <Label
                                            noteid={this.props.allNote.noteid}
                                            lable={this.props.allNote.lable}

                                        />
                                    </MenuItem>

                                </Menu>
                            </div>
                        </div>
                        <ToastContainer />

                    </CardContent>

                </Card >

                < div >

                    <Dialog open={this.state.isOpen} onClose={this.handleClickClose} fullWidth={true} PaperProps={{ style: { backgroundColor: this.state.color, padding: '1%5%' }, }} >
                        {/* <div style={{ backgroundColor: this.state.color }} > */}
                        <Pinicon
                            noteid={this.props.allNote.noteid}
                            ispined={this.props.allNote.is_pined}
                        />
                        <TextField label="Title" defaultValue={this.props.allNote.title} onChange={(e) => this.onChangeTitle(e)} InputProps={{ disableUnderline: true }} />
                        <br /><br />
                        <TextField label="Take a note" defaultValue={this.props.allNote.content} onChange={(e) => this.onChangeContent(e)}
                            helperText={this.state.error ? "Field should not be empty" : ""}
                            error={this.state.error} multiline={true}
                            InputProps={{ disableUnderline: true }} /><br />

                        <div className="NoteFunctions" >
                            <Reminder
                                notesId={this.props.allNote.noteid}
                            />
                            <Colorpallet
                                onSelectColor={this.handleColor}
                                notesId={this.props.allNote.noteid}
                            />
                            <Addpic
                                noteid={this.props.allNote.noteid}
                            />
                            <Collab
                                noteid={this.props.allNote.noteid}
                            />
                            <Archive
                                noteid={this.props.allNote.noteid}
                                isarchived={this.props.allNote.is_archived}

                            />
                            <div>
                                < Morevert style={{ paddingBottom: '3%' }}
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={this.handleMenuClick}
                                />
                                <Menu
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
                                    <MenuItem ><Untrash noteid={this.props.allNote.noteid} /></MenuItem>
                                    <MenuItem ><Delete noteid={this.props.allNote.noteid} /></MenuItem>
                                    <MenuItem onClick={this.handleMenuClose}>
                                        <Label
                                            noteid={this.props.allNote.noteid}
                                            lable={this.props.allNote.lable}

                                        />
                                    </MenuItem>

                                </Menu>
                            </div>
                        </div>
                        {/* </div> */}
                    </Dialog>
                    <ToastContainer />
                </div >

            </div>
        )
    }
}
