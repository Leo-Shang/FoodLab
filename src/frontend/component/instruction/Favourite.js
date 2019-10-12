import React, { Component } from 'react'
import {Link, BrowserRouter } from 'react-router-dom'
import { Comment, Form, Button, Icon, List, Input } from 'antd'
import axios from "axios";


class Favourite extends Component {
    state = {
        likes: 0,
        action: null,
    };

    like = () => {
        this.setState({
            likes: 1,
            action: 'liked',
        });
    };
    // constructor(props) {
    //     //     super(props);
    //     //     this.state = {
    //     //         value: false,
    //     //     };
    //     //     this.handleSubmit = this.handleSubmit.bind(this);
    //     // }
    //     //
    //     // handleSubmit(event) {
    //     //     const id = 2;
    //     //     event.preventDefault();
    //     //     const data = {
    //     //         value: true,
    //     //
    //     //     };
    //     //
    //     //     console.log(data);
    //     //     if (this.state.value) {
    //     //         axios.post(`http://localhost:8080/api/recipe/${id}`)
    //     //             .then(function (response) {
    //     //                 console.log(response);
    //     //             })
    //     //             .catch(function (error) {
    //     //                 console.log(error);
    //     //             });
    //     //     }
    //     // }
    //     //
    //     // handleChange = e => {
    //     //     this.setState({
    //     //         value: true,
    //     //     });
    //     // };

    render() {



        return (

            <div>


            </div>
        )
    }
}

export default Favourite;