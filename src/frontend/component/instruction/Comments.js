import React, { Component } from 'react'
import { Comment, Form, Button, List, Input } from 'antd'
import SingleComment from "./SingleComment";


class Comments extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id: 2
        };

    }

    componentDidMount() {
        // this.setState(id: this.props.id);
        // this.setState({id: 20});
        const id = this.state.id;
        console.log("id is: " + id);
        fetch(`http://localhost:8080/api/recipe/${id}`)
            .then(res => res.json())
            .then(data => this.setState({data: data}, () => console.log("instruction succeed", data)));

    }

    render(){

        return(
            <div className="commentList">
                <List
                    className="comment-list"
                    header={`Comments`}
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <li>
                            <Comment
                                content={item.note}
                            />
                        </li>
                    )}
                />
                <SingleComment id={this.state.id}/>

            </div>
        )
    }


}

export default Comments;


