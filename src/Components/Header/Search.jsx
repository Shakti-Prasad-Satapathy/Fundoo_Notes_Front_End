import React, { Component } from 'react'
import { toast } from "react-toastify";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            allNote: []
        }
    }

    componentDidMount() {
        this.handleSearchNote();
    }

    handleSearchNote = () => {

        var searchNoteDetails = {
            "title": this.props.location.state.title.title
        }
        console.log("================", this.props.location.state.title.title);
        this.SearchNote(searchNoteDetails)
        // this.props.history.push("/allnotes")

    }
    SearchNote(searchNoteDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchNoteDetails)
        };
        fetch(process.env.REACT_APP_HOST+'/notesearch', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        console.log(data);
                        if (data.success) {
                            console.log("14444444444411111114444441", data.data.result);
                            const allNotes = data.data.result.map((notedata) => {
                                return (notedata)
                            });
                            this.setState({
                                allNote: allNotes
                            })
                            this.props.history.push('/allnotes', { "allNote":  this.state.allNote  })

                            // if (data.success) {
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        } else {
                            this.props.history.push('/allnotes')
                            toast(data.message, { position: toast.POSITION.TOP_CENTER });


                        }
                    });
            })
    }
    render() {

        return (
            <div >
                {/* <div style={{ overflowY: "scroll", height: '450px', marginTop: "8%" }}>
                    <div style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-evenly", marginLeft: '15%', marginRight: '2%' }}>
                        
                        {this.state.allNote.map((searchResult) =>

                            < NoteCard allNote={searchResult} />
                        )}
                        
                    </div>
                </div> */}

            </div >
        )
    }
    //     {/* <TextField name="title" label={<SearchIcon />} type="search" variant="filled" value={this.state.search} onChange={(e) => this.onChangeSearch(e)} onKeyPress={this.handleSearchNote} /> */}

}
