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

const customStyles = {
    content: {
        width: '47%',
        marginLeft: '27%',
        right: 'auto',
        bottom: 'auto',
        marginTop: "10%"
    }
};
export default class createNote extends Component {

    constructor() {
        super();
        this.state = {
            isActiveModalModal: false,
            error: false

        }
    }
    componentDidMount() {
        Modal.setAppElement('body');
    }
    togglModal = () => {
        this.setState({
            isActiveModalModal: true, //!this.state.isActiveModalModal
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

    closeModal = () => {
        this.setState({
            isActiveModalModal: false
        })
    }
    handleCreateNote = () => {


        if (this.state.title === "" || this.state.content === "") {
            this.setState({
                error: true
            })
            console.log(this.state.error);

        }
        else {
            this.setState({
                isActiveModalModal: false
            })

            var createNoteDetails = {
                'logintoken': localStorage.getItem('token'),
                "title": this.state.title,
                "content": this.state.content
            }
            this.createNotes(createNoteDetails)
        }
    }
    createNotes(createNoteDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createNoteDetails)
        };
        fetch(process.env.REACT_APP_HOST+'/createNote', requestOptions)
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
        return (
            <div>
                <Card style={{ width: '50%', marginLeft: '30%', marginBottom: '10%', height: '50%', borderRadius: '35% 35% 35% 35%', background: 'darkgrey' }} onClick={this.togglModal}>
                    <Typography className='title' color="textSecondary" gutterBottom style = {{marginTop: '3%', marginLeft: '5%'}} >
                        Take A Note...
                        </Typography>

                </Card>
                <Modal isOpen={this.state.isActiveModalModal} style={customStyles} onClose={this.closeModal} >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <TextField label="Title" name="title" value={this.state.title} onChange={(e) => this.onChangeTitle(e)}
                            helperText={this.state.error ? "Field should not be empty" : "Perfect!"}
                            error={this.state.error} /> <Icon icon={pinIcon} />
                    </div><br /><br /><br />
                    <TextField label="Take a note" name="content" value={this.state.content} onChange={(e) => this.onChangeContent(e)}
                        helperText={this.state.error ? "Field should not be empty" : "Perfect!"}
                        error={this.state.error} /><br /><br /><br />
                  
                    <div >
                        <Button onClick={this.handleCreateNote} >Save</Button>
                        <Button onClick={this.closeModal} >Close</Button>

                    </div>
                </Modal>
                <ToastContainer />
            </div>
        )
    }
}
