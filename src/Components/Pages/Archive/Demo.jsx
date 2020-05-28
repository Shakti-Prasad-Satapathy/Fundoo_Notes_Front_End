import React, { Component } from 'react'
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Archive from './GetAllArchive';


export default class Demo extends Component {
    render() {
        return (
            <div>
                <Header />
                <Archive />
                <Footer />

            </div>
        )
    }
}
