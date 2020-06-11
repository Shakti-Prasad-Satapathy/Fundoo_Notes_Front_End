import React, { Component } from 'react'
import { toast } from "react-toastify";

import CreateNote from './createNote'
import NoteCard from './NoteCard'
import Divider from '@material-ui/core/Divider';
import StackGrid from "react-stack-grid";

/********* */
import './Notes.css'

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

var xxx = ""

export default class Notes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lablednote: [],
            pinednotes: [],
            unpinednotes: [],
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
                        if (data.success) {
                            var unpinednotes = []
                            var pinednotes = []
                            // var pinednotesrev = []
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
                                if (note.lable !== null) {
                                    return (lableednotes.push(note))
                                }
                            })
                            const uniqueLableednotes = [...new Set(lableednotes.map(lableednotes => lableednotes.lable))]
                            // console.log("KKKKK===KKKKK", pinednotes);
                            // pinednotesrev = pinednotes.reverse()
                            // console.log("KKKKKKKKKK", pinednotesrev);

                            this.setState({
                                pinednotes: pinednotes,
                                unpinednotes: unpinednotes,
                                lablednote: uniqueLableednotes
                            })
                            // toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        } else {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        }
                    });
            })
    }
    render() {
        if (this.props.location.state !== undefined) {
            return (
                <div >
                    <Header />
                    {/* <Header props={this.props} lablednotes={this.state.lablednote} /> */}
                    <div className="NoteDiv">
                        {/* <div style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-evenly", marginLeft: '15%', marginRight: '5%' }}> */}
                        <StackGrid columnWidth={250} style={{ marginLeft: '15%', marginRight: '5%' }}>
                            {this.props.location.state.allNote.map((note, index) =>
                                < NoteCard allNote={note} key={index} />
                            )}
                        </StackGrid>
                        {/* </div> */}
                    </div>

                    <Footer />

                </div >
            )
        }
        else {

            return (
                <div style={{ transform: (this.props.menu) ? "translate(80px,0)" : null, transition: (this.props.menu) ? ("0.5s") : null }} >
                    <Header />
                    <div className="NoteDiv">
                        <CreateNote />
                        <StackGrid columnWidth={250} style={{ marginLeft: '15%', marginRight: '5%' }}>
                            {this.state.pinednotes.map((note, index) =>
                                < NoteCard allNote={note} key={index} />
                            )}
                        </StackGrid>

                        <div style={{ marginLeft: '10%', padding: "5%" }}>
                            <Divider />
                        </div>
                        <StackGrid columnWidth={250} style={{ marginLeft: '15%', marginRight: '5%' }}>
                            {this.state.unpinednotes.map((note, index) =>
                                < NoteCard allNote={note} key={index} props={this.props} />
                            )}
                        </StackGrid>
                    </div>

                    <Footer />

                </div >
            )
        }
    }

}