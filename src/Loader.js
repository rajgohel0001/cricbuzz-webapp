import React, { Component } from 'react'
import load from './loader.gif';
import './loader.css';

class Loader extends Component {
    render(){
        return (
            <div>
                <img alt="" className="load" src={load}></img>
            </div>
        )
    }
}
// const Loader = {
//     show(){
//         console.log("loader call");
//         return (
//             <div>
//                 <img alt="" className="load" src={load}></img>
//             </div>
//         )
//     }
// }

export default Loader;