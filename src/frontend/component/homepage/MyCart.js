import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';

class MyCart extends React.Component{
    componentWillMount() {
        if (sessionStorage.getItem('jwt')) {
            this.props.loginSuccess();
        };
    };

    render(){
        if (!this.props.logged_in) {
            return(
                <Button type="primary" color="#841584" variant="outline-light" href="/personalinfo/myshoppingcart">My Cart</Button>
            );
        };
    };
}

export default MyCart;

