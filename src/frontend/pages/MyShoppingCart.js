import React from 'react';
import MyShoppingCartItem from '../component/MyAccount/MyShoppingCartItem'
import { Row, Col } from 'antd';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Orderhistory from "../component/MyAccount/OrderHistory";
import 'antd/dist/antd.css';
import { Typography } from 'antd';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import Order from "../component/MyAccount/Order";
import PriceChart from '../component/ItemDetail/PriceChart';
import Orderlist from "./OrderList"
const { Title } = Typography;


class MyShoppingCart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id :1
        };
    }

    componentDidMount() {
        var id = this.state.id;
        // if (this.props.location.state.id !== undefined){
        //     id = this.props.location.state.id;
        // }

        // console.log("id is :" + id);
        fetch(`http://localhost:8080/api/personalinfo/${id}/myshoppingcart`)
            .then(res => res.json())
            .then(data => this.setState({data}, () => console.log("Shopping Cart Callback: ", data)));
    }

    render(){
        const shopping_cart_item_count = this.state.data.length;
        // console.log("There are " + order_count);
        const id = this.state.id;

        let key_index = 0;
        let previous_id = -1;
        let rows = [];
        for (let i = 0; i < shopping_cart_item_count; i++){
            let current_id = this.state.data[i].item_id;
            let isDifferentID = previous_id !== current_id;
            if (isDifferentID) {
                rows.push(<MyShoppingCartItem key={key_index} data={this.state.data[i]} />);
                key_index++;
                previous_id = current_id;
            }
        }
        return (
            <BrowserRouter>
                <div style={{paddingBottom: "2%", marginLeft: '15%', marginRight: '15%'}}>
                    <Row>
                        <Title level={4} style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>My Shopping Cart</Title>
                    </Row>

                    <Row style={{marginLeft: "3%", marginRight: "3%"}}>
                        {rows}
                    </Row>

                    {/*<Row>*/}
                    {/*    <p style={{marginTop: "5%",textAlign:"right", paddingRight:"15%"}}>Subtotal: </p>*/}
                    {/*    <p style={{textAlign:"right", paddingRight:"15%"}}>Delivery Fee: </p>*/}
                    {/*    <p style={{textAlign:"right", paddingRight:"15%"}}>Tax: </p>*/}
                    {/*    <p style={{textAlign:"right", paddingRight:"15%"}}>Total: </p>*/}
                    {/*</Row>*/}

                    <Row style={{marginTop: "5%"}}>
                        <Col span={4} offset={20}>
                            <Button type="primary" color="#841584" variant="outline-light">
                                <Link to={{
                                    pathname: `/personalinfo/${id}/checkout`,
                                    state: {
                                        id: {id}
                                    }
                                }}>Checkout</Link>
                            </Button>
                        </Col>
                    </Row>
                </div>
                <Route exact path="/personalinfo/:id/checkout" component={Orderlist} />
            </BrowserRouter>
        );
    }
}

export default MyShoppingCart;