import React, { Component } from 'react'
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Trash from './ShowTrash';


export default class Demo extends Component {
    render() {
        return (
            <div>
                <Header />
                <Trash />
                <Footer />

            </div>
        )
    }
}
