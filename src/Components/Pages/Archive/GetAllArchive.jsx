import React, { Component } from 'react'
import { toast } from "react-toastify";

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import NoteCard from './NoteCard'
/********* */


export default class Notes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allNote: [],
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
        fetch(process.env.REACT_APP_HOST+'/showarchive', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        
                        const allNotes = data.data.notes.map((notedata) => {
                            return (notedata)
                        });
                        this.setState({
                            allNote: allNotes
                        })

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
            <div >
                <Header props={this.props} />
                <div style={{ overflowY: "scroll", height: '450px', marginTop: "8%" }}>
                    <div style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-evenly", marginLeft: '15%', marginRight: '2%' }}>
                        {this.state.allNote.map((allNote, index) =>

                            < NoteCard allNote={allNote} key = {index} />

                        )}
                    </div>
                </div >
                <Footer />

            </div>
        )
    }

}