import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

// react components
import Personalinfo from './PersonalInfo';
import MyShoppingCart from './MyShoppingCart';
import OurProduct from '../component/homepage/OurProduct';
import WrappedRegistrationForm from '../component/Auth/SignupForm';
import LoginForm from '../component/Auth/Signin';

// static resources
import icon from '../images/foodlab.png';
import '../component/css/Homepage.css';

// jquery
// import $ from 'jquery';

// ant design components
import { Layout, Menu } from 'antd';
const { Header, Content } = Layout;

// $(document).ready(function () {
//     // document.getElementById("product_btn").click()
// });

const api_url = '/api';

class Homepage extends React.Component {
    constructor() {
        super();
        this.state = {
            isFetching: false,
            data: [],
            error: null,
            term: "", // for searching
            current: '1' // for changing menu current tab
        };
    };

    componentDidMount() {
        this.getData();
        this.timer = setInterval(() => this.getData(), 1280000);
    };

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    };

    getData = () => {
        fetch(api_url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(msg => this.setState({ data: msg }))
            .catch(error => {
                console.log(error);
                this.setState({ error, })
            });
    };

    onSubmitFoods = (word) => {
        this.setState({ term: word });
        console.log(this.state.term);
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Layout>
                        <Header style={{ position: 'fixed', width: '100%', zIndex: 1 }}>
                            <img className="logo" src={icon} />
                            <div className="title">Food Lab</div>
                            <Menu
                                onClick={this.handleClick}
                                selectedKeys={[this.state.current]}
                                theme="dark"
                                mode="horizontal"
                                // defaultSelectedKeys={['2']}
                                style={{}}
                                className='menu'
                            >
                                <Menu.Item key="1">
                                    <Link to="/products/groceryItems">
                                        Our Products
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to="/personalinfo/myshoppingcart">
                                        My Cart
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                     <Link to="/personalinfo/myaccount">
                                    {/*<Link to="/login">*/}
                                        Log in/My Account
                                </Link>
                                </Menu.Item>
                            </Menu>
                        </Header>
                        <Content style={{ marginTop: '80px' }}>
                            <Switch>
                                {/* <Route exact path="/" component={Homepage} /> */}
                                <Route exact path="/products/groceryItems" component={OurProduct} />
                                <Route exact path="/personalinfo/myshoppingcart" component={MyShoppingCart} />
                                <Route exact path="/personalinfo/myaccount" component={Personalinfo} />
                                <Route exact path="/personalinfo/editaccountinfo" component={Personalinfo} />
                                <Route exact path="/login" component={LoginForm} />
                                <Route exact path="/register" component={WrappedRegistrationForm} />
                            </Switch>
                        </Content>
                    </Layout>
                </div>
            </BrowserRouter>
        );
    };

};

export default Homepage;