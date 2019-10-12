import React from 'react';
import MyShoppingCart from './MyShoppingCart';
import MyAccount from '../component/MyAccount/MyAccountInfo';
import MyFavRecipe from '../component/MyAccount/MyFavRecipe';
import Orderhistory from '../component/MyAccount/OrderHistory';
import PaymentInfo from '../component/MyAccount/PaymentInfo';
import TrackOrder from '../component/MyAccount/TrackOrder';
import EditAccountInfo from '../component/MyAccount/EditAccountInfo';
// import EditAccountInfo from '../component/Auth/SignupForm';
import SecurityInfo from '../component/MyAccount/SecurityInfo';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Menu, Icon, Modal } from 'antd';
import 'antd/dist/antd.css';

class PersonalInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

            id: 1,
            data: [],
            current: 'myaccount'
        };
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
    };


    render(){
        // const id = this.props.data.id;
        const id = this.state.id;

        return (
            <BrowserRouter>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]}
                            style={{paddingBottom: "20px", marginLeft: '10%', marginRight: '10%', display: 'flex', 
                                            justifyContent:'center', alignItems:'center'}} mode="horizontal">
                    <Menu.Item key="myaccount">
                        {/*<Link to= "/personalinfo/123/myaccount">My Account</Link>*/}
                        <Link to={{
                            pathname: `/personalinfo/${id}/myaccount`,
                            state: {
                                id: this.state.id,
                            }
                        }}>My Account</Link>
                    </Menu.Item>
                    <Menu.Item key="orderhistory">
                        <Link to={{
                            pathname: `/personalinfo/${id}/orderhistory`,
                            state: {
                                id: this.state.id,
                            }
                        }}>Order History</Link>
                    </Menu.Item>
                    <Menu.Item key="myshoppingcart">
                        <Link to={{
                            pathname: `/personalinfo/${id}/myshoppingcart`,
                            state: {
                                id: this.state.id,
                            }
                        }}>My Shopping Cart</Link>
                    </Menu.Item>
                    <Menu.Item key="favoriterecipe">
                        <Link to={{
                            pathname: `/personalinfo/${id}/favoriterecipe`,
                            state: {
                                id: this.state.id,
                            }
                        }}>My Favorite Recipe</Link>
                    </Menu.Item>
                    <Menu.Item key="paymentinfo">
                        <Link to={{
                            pathname: `/personalinfo/${id}/securityinfo`,
                            state: {
                                id: this.state.id,
                            }
                        }}>Payment Information</Link>
                    </Menu.Item>
                    <Menu.Item key="trackorder">
                        <Link to={{
                            pathname: `/personalinfo/${id}/trackorder`,
                            state: {
                                id: this.state.id,
                            }
                        }}>Track My Order</Link>
                    </Menu.Item>
                </Menu>

                <Switch>
                    <Route exact path='/personalinfo/:id/myaccount' component={MyAccount} />
                    <Route exact path="/personalinfo/:id/editaccountinfo" component={EditAccountInfo} />
                </Switch>
                {/* <Route exact path="/myaccount" component={MyAccount} /> */}
                <Route exact path="/personalinfo/:id/orderhistory" component={Orderhistory} />
                <Route exact path="/personalinfo/:id/myshoppingcart" component={MyShoppingCart} />
                <Route exact path="/personalinfo/:id/favoriterecipe" component={MyFavRecipe} />
                <Route exact path="/personalinfo/:id/paymentinfo" component={PaymentInfo} />
                <Route exact path="/personalinfo/:id/trackorder" component={TrackOrder} />
                <Route exact path="/personalinfo/:id/securityinfo" component={SecurityInfo} />
            </BrowserRouter>            
        );
    }
}

export default PersonalInfo;