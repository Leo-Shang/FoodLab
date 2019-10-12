import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Homepage from './Hompage'

class Welcome extends React.Component{

    render(){
        return (
            <div>
                <h1>Welcome To Food Lab</h1>
                <div>
                    <input type="text" placeholder="User name"></input>
                </div>
                <div>
                    <input type="password" placeholder="Password"></input>
                </div>  
                <div>
                    <button>Log In</button> 
                    {/* TODO: link Log in button, if log in success then go to Homepage.js */}
                    <button>Sign Up</button>
                </div>
            </div>
            
            
        );
    }
}

export default Welcome;