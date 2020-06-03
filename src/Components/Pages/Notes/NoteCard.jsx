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
import '../Notes/Notes.css'
import Dialog from '@material-ui/core/Dialog';
import Reminder from '../Reminder/Reminder'
import Collab from '../Collab/CollaboratorComponent'
import Colorpallet from '../ColorPallet/ColorPaletteComponent'
import Archive from '../Archive/ArchiveComponent'
import Trash from '../Trash/addTotrash'
import Addpic from '../imgupload/FileUpload'
import Pinicon from '../PinUnpin/PinUnpin'
import Label from '../Lables/Lables'
import RemoveLable from '../Lables/RemoveLable'

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
    // const [anchorEl, setAnchorEl] = React.useState(null);

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
            this.editNotes(editNoteDetails)
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
        // console.log("444444", this.props.allNote.noteid);

        return (
            <div style={{ marginBottom: "5%", width: "250px", paddingLeft: "3%" }}>
                <Card variant="outlined" style={{ display: 'flex', marginRight: "10%", justifyContent: 'space-evenly', width: '100%', marginBottom: '5%', backgroundColor: this.state.color, borderRadius: "5%" }} >
                    <CardContent style={{ width: "100%" }} >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                            <div onClick={this.handleClickOpen}>
                                <Typography className='title' color="textSecondary" gutterBottom>
                                    NOTE TITLE<br />
                                    {this.props.allNote.title}
                                </Typography>

                                <Typography style={{ maxHeight: '105px', overflow: 'hidden' }}>
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
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }} >
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
                                    <MenuItem ><Trash noteid={this.props.allNote.noteid} /></MenuItem>
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

                    <Dialog open={this.state.isOpen} onClose={this.handleClickClose} aria-labelledby="form-dialog-title" fullWidth={true} >
                        <div style={{ backgroundColor: this.state.color }} >
                            <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                                <TextField id="standard-basic" label="Title" defaultValue={this.props.allNote.title} onChange={(e) => this.onChangeTitle(e)} />
                                <Pinicon
                                    noteid={this.props.allNote.noteid}
                                    ispined={this.props.allNote.is_pined}
                                />
                            </div><br /><br /><br />
                            <TextField id="standard-basic" label="Take a note" defaultValue={this.props.allNote.content} onChange={(e) => this.onChangeContent(e)}
                                helperText={this.state.error ? "Field should not be empty" : ""}
                                error={this.state.error} multiline='true' /><br /><br /><br />

                            <div style={{ display: 'flex', justifyContent: 'space-evenly' }} >
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
                                        <MenuItem ><Trash noteid={this.props.allNote.noteid} /></MenuItem>
                                        <MenuItem onClick={this.handleMenuClose}>
                                            <Label
                                                noteid={this.props.allNote.noteid}
                                                lable={this.props.allNote.lable}

                                            />
                                        </MenuItem>

                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                    <ToastContainer />
                </div >

            </div>
        )
    }
}
