import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';

class SignInSignUp extends React.Component{
    componentWillMount() {
        if (sessionStorage.getItem('jwt')) {
            this.props.loginSuccess();
        };
    };

    render() {
        console.log("logged_in: ", this.props.logged_in);
        if (!this.props.logged_in) {
            return(
                <Button type="primary" color="#841584" variant="outline-light" href="/personalinfo/myaccount">Log in/My Account</Button>

            );
        } else {
            return(
                <button type="button" className="btn btn-success btn-lg ml-2">My Account</button>
            );
        };
            
    };
}

export default SignInSignUp;

