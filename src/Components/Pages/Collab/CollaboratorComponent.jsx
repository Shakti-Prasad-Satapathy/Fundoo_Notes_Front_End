import React, { Component } from 'react'
import {
    Dialog, Card, DialogTitle, DialogContent, Button, InputBase, Divider,
    Avatar, 
    /* MenuItem, */ 
    MuiThemeProvider, createMuiTheme
} from '@material-ui/core';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { /*ToastContainer,*/ toast } from "react-toastify";
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
const theme = createMuiTheme({
    overrides: {
        MuiDialogContent: {
            root: {
                padding: "0px 0px"
            }
        }
    }
})
class CollaboratorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            email: '',
        }
    }

    handleDialoge = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleCollabChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleSave = () => {
        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/;
        if (reg.test(this.state.email) === false) {
            alert("not an email try again")
            console.log("Email is Not Correct");
        }
        else {
            this.setState({
                open: false
            })

            var collabDetails = {
                "email": this.state.email
            }
            this.searchUser(collabDetails)
            // this.props.history.push("/allnotes")
            console.log(collabDetails, "hhhhhhhhHHHHHHHHH");

        }
    }
    searchUser(collabDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collabDetails)
        };
        // console.log("login---> try know");
        fetch(process.env.REACT_APP_HOST+'/search', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if (data.success) {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                            this.updateCollab(data.data.data)
                        } else {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        }
                    });
            })
    }
    updateCollab = (userid) => {
        var collabDetails = {
            "userid": userid,
            "noteid": this.props.noteid
        }
        this.addCollab(collabDetails)
    }

    addCollab(collabDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collabDetails)
        };
        fetch(process.env.REACT_APP_HOST+'/createCollaborator', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if (data.success) {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        } else {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        }
                    });
            })
    }

    render() {
        return (
            <div>
                <div onClick={this.handleDialoge}>
                    <PersonAddOutlinedIcon />
                </div>
                <MuiThemeProvider theme={theme}>
                    <div>
                        <Dialog position="static"
                            fullWidth={true}
                            onClose={this.handleClose}
                            open={this.state.open}
                        >
                            <Card className="get-card2" style={{ backgroundColor: this.state.colorUpdate }}>
                                <DialogTitle>
                                    Collaborators
                                </DialogTitle>
                                <Divider />
                                <DialogContent>
                                    <div>
                                        <div className="collaborator-avtar-email">
                                            <div className="collaborator-firstAvatar">
                                                <Avatar style={{ width: "35px", height: "35px" }}>
                                                    <img alt="pic"
                                                        style={{
                                                            width: "-webkit-fill-available",
                                                            height: "-webkit-fill-available",
                                                        }}
                                                        src={localStorage.getItem('profileimage')}
                                                    />

                                                </Avatar>
                                            </div>
                                            <div className="collaborator-name-email">
                                                <span style={{ fontFamily: 'Roboto' }}>
                                                    <b>{localStorage.getItem('firstName')}
                                                        {localStorage.getItem('lastName')}
                                                    </b>
                                                    <span style={{ fontFamily: "Roboto arial sansSerif", paddingLeft: "10px" }}>
                                                        (owner)</span>
                                                </span>
                                                <br />
                                                {localStorage.getItem('email')}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="collaborator-avtar-email">
                                                <div className="collaborator-secondAvatar">
                                                    <Avatar style={{ width: "35px", height: "35px" }}>
                                                        <PersonAddOutlinedIcon />
                                                    </Avatar>
                                                </div>
                                                <div className="collaborator-name-email">
                                                    <InputBase className="get-in2"
                                                        fullWidth
                                                        placeholder="person's email to share with"
                                                        id="addperson"
                                                        value={this.state.searchText}
                                                        onChange={this.handleCollabChange}
                                                    />
                                                </div>
                                                {this.state.trueIcon ? <DoneOutlinedIcon onClick={this.handleDone} />

                                                    : (null)}</div>

                                        </div>
                                    </div>
                                    <div>
                                        <div className="collaborator-buttons">
                                            <div >
                                                <Button
                                                    onClick={this.handleClose}>
                                                    close
                                        </Button>
                                            </div>
                                            <div>
                                                <Button
                                                    onClick={this.handleSave}>
                                                    save
                                        </Button>
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Card>
                        </Dialog>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default CollaboratorComponent