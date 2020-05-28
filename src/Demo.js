import React, { Component } from 'react';
import './Demo.css';

class Demo extends Component {
    render() {
        return <div class="Bgcolor">
            <h1>Hellow World 2020</h1>
            <h1>Hellow World 2020</h1>
            <h1>Hellow World 2020{this.props.name}</h1>
            <h1>Hellow World 2020</h1>
            <h1>Hellow World 2020</h1>
        </div>
        // Props Helps To pass value from child to perent
        //  props get passed to the component
        //  Props  are immutable ie. child class can't change its value, can only access
        //  use "this.props" with class component
        //  use "props" with functional component
    }
}
/*********** FUNCTIONAL COMPONENT************** */
// const Demo = (props) => {
//     return <div class="Bgcolor">
//         <h1>Hellow World 2020</h1>
//         <h1>Hellow World 2020</h1>
//         <h1>Hellow World 2020{this.props.name}</h1>
//         <h1>Hellow World 2020</h1>
//         <h1>Hellow World 2020</h1>
//     </div>
// }

export default Demo;



