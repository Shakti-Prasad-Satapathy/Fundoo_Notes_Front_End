import React, { Component } from 'react'
import { toast } from "react-toastify";

import CreateNote from './createNote'
import NoteCard from './NoteCard'
/********* */
import './Notes.css'

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';


export default class Notes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lablednote: [],
            pinednotes: [],
            unpinednotes: []

        }
    }

    componentDidMount() {
        this.handleReadNote();
    }

    handleReadNote = () => {

        var readNoteDetails = {
            'logintoken': localStorage.getItem('token')
        }
        this.readNotes(readNoteDetails)
    }
    readNotes(readNoteDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(readNoteDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/readNote', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        // console.log(":::::::::----", data.data.notes.noteid);
                        // console.log(unpinednotes,"L:LL::L:L:L:",pinednotes);
                        if (data.success) {
                            var unpinednotes = []
                            var pinednotes = []
                            var lableednotes = []

                            data.data.notes.map((note) => {
                                if (note.is_pined === 'false') {
                                    return (unpinednotes.push(note))
                                }
                                else {
                                    return (pinednotes.push(note))
                                }
                            })
                            data.data.notes.map((note) => {
                                if (note.lable !== null && !lableednotes.includes(note)) {
                                    return (lableednotes.push(note))
                                }
                                
                            })
                            this.setState({
                                pinednotes: pinednotes,
                                unpinednotes: unpinednotes,
                                lablednote: lableednotes
                            })
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        } else {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        }
                    });
            })
    }
    render() {
        if (this.props.location.state !== undefined) {
            // console.log("///***********///", this.props.location.state);
            return (
                <div >
                    <Header props={this.props} lablednotes= {this.state.lablednote} />
                    <div style={{ overflowY: "scroll", height: '450px', marginTop: "8%" }}>
                        <div style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-evenly", marginLeft: '15%', marginRight: '5%' }}>
                            {this.props.location.state.allNote.map((note, index) =>
                            < NoteCard allNote={note} key={index} />
                            )}
                        </div>
                    </div>

                    <Footer />

                </div >
            )
        }
        else {

            return (
                <div >
                    <Header props={this.props} lablednotes= {this.state.lablednote}/>
                    <div style={{ overflowY: "scroll", height: '450px', marginTop: "8%" }}>
                        <CreateNote />
                        <div style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: "flex-start", marginLeft: '15%', marginRight: '5%' }}>
                            {this.state.pinednotes.map((note, index) =>
                                < NoteCard allNote={note} key={index} />
                            )}

                            {this.state.unpinednotes.map((note, index) =>
                                < NoteCard allNote={note} key={index} props={this.props} />
                            )}
                        </div>
                    </div>

                    <Footer />

                </div >
            )
        }
    }

}