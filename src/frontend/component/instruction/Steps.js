import React, { Component } from 'react'
import {Link, BrowserRouter } from 'react-router-dom'
import { List, Typography } from 'antd'


class Steps extends Component {
    state = {
        isFetching: false,
        data: [],
        error: null,
        id: 1,
    };

    getData = async () => {
        const id = this.state.id;
        this.setState({ isFetching: true, });
        try {
            await Promise.all([
                fetch( `http://localhost:8080/api/recipe/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                } )
                    .then(res => res.json())
                    .then(msg => this.setState({ data: msg, }, () => console.log(msg)))
            ]);
        } catch (error) {
            console.log(error);
            this.setState({ error, isFetching: false, });
        } finally {
            this.setState({ isFetching: false, });
        };
    };

    componentDidMount() {
        this.getData();
    };


    render() {

        const item_count = this.state.data.length;
        let item_step = [];

        for (let i = 0; i < item_count; i++){
            item_step.push(this.state.data[i].steps);

        }

        let item_steps = [...new Set(item_step)];


        let steps = [];
        for (let i = 0; i < item_steps.length; i++){
            steps.push(item_steps[i].split('%%%%'));

        }

        console.log(steps);


        return (
            <div>

                {steps.map(reptile => <li>{reptile}</li>)}
            </div>
        )
    }
}

export default Steps;

/*
{this.state.data.map(function(object, index){
                            return <div className={"row"} key={index}>
                                {[ object.steps]}
                            </div>;
                        })}
 */