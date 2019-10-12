import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import { Row, Col } from 'antd';
import { Input } from 'antd';

const { Search } = Input;

const item_url = '/api/item'

class Searchbar extends React.Component {

    state = { searchString: '', data:[] }
    handleChange = (e) => {
        this.setState({ searchString:e.target.value });
        console.log(this.state.data);
    }

    render(){
        return (
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <Search size="large size" placeholder="Search items or recipts" onChange={this.handleChange} items={this.state.data} />
                </Col>
                <Col span={4}></Col>
    
                <ul>
                    {this.state.data.map(function(i) {
                        return <li>{i.name} <a href={i.url}>{i.url}</a></li>;
                    }) } 
                </ul>
            </Row>
        );
    };
}


export default Searchbar;