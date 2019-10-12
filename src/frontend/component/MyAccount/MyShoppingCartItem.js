import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

class MyShoppingCartItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    render(){
        const fetched = this.props.data;
        // console.log("Passed state: " + JSON.stringify(fetched));
        const isVIP = fetched.is_member;
        const image_name = fetched.img;
        // console.log(image_name);
        // console.log("type of member is :" + typeof isVIP);
        // console.log("member status is :" + isVIP);
        let price = null;
        if (isVIP) {
            price = fetched.member_price;
            if (fetched.promotion_price < price) {
                price = fetched.promotion_price;
            }
        } else if (fetched.promotion_price < fetched.regular_price) {
            price = fetched.promotion_price;
        } else {
            price = fetched.regular_price;
        }

        if (fetched.price != null) {
            price = fetched.price;
        }

        var quantity = fetched.quantity;
        const subtotal = price * quantity;
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Row>
                            <img
                                src={ process.env.PUBLIC_URL + '/images/groceryItem/' + image_name + '.png' }
                                style={{ marginLeft:'auto', marginRight:'auto', marginTop:'auto', marginBottom:'auto', height:'100px', maxWidth:'200px', maxHeight:'200px' }}
                                alt=''>
                            </img>
                            {/*TODO: DEBUG HERE*/}
                        </Row>
                        <Row span={4}>{fetched.item_name} </Row>
                    </Col>
                    <Col span={4}>$ {price} </Col>
                    <Col span={4}>X {fetched.quantity}</Col>
                    <Col span={4}>$ {subtotal} </Col>
                </Row>
            </div>
        );
    }
}

export default MyShoppingCartItem;