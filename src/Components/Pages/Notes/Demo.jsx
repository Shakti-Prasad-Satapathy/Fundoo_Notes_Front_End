import React, { Component } from 'react'
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Notes from './Notes';


export default class Demo extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <Header props={this.props}/>
                <Notes />
                <Footer />

            </div>
        )
    }
}
