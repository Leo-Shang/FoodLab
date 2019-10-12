import React from 'react';
import Item from './MyShoppingCartItem'
import { Row, Typography } from 'antd';
import 'antd/dist/antd.css';

const { Title } = Typography;

class Order extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    render(){
        const fetched = this.props.data;
        // console.log("Order log: " + JSON.stringify(fetched));
        const subtotal = fetched[0].subtotal;
        const delivery_fee = fetched[0].delivery_fee;
        const tax = fetched[0].tax;
        const total = fetched[0].total;
        const ordered_time = new Date(fetched[0].ordered_time);
        const fetched_delivery_time = fetched[0].delivery_time;
        const delivery_time = new Date(fetched_delivery_time);
        const today = new Date();
        // console.log(today);
        // console.log(delivery_time);
        // var is_delivered = true;
        var is_delivered = delivery_time < today;

        const item_count = this.props.data.length;
        let rows = [];
        for (let i = 0; i < item_count; i++) {
            rows.push(<Item key={i} data={this.props.data[i]} />)
        }

        return (
            <div style={{marginBottom: "2%"}}>
                <Row>
                    <Title level={4}>On {ordered_time.toDateString()}</Title>
                </Row>
                <Row>
                    <Row style={{paddingRight: "2%", paddingLeft: "2%"}}>
                        <p>Order ID: {fetched[0].order_id} </p>
                    </Row>
                    <Row style={{paddingRight: "2%", paddingLeft: "2%"}}>

                        {is_delivered ? (
                            <p>Delivered on: {delivery_time.toDateString()} </p>
                        ) : (
                            <p>Delivery Time: Estimated on {delivery_time.toDateString()} </p>
                        )}

                    </Row>
                    <Row style={{paddingTop: "1%", paddingRight: "2%", paddingLeft: "2%"}}>
                        {rows}
                    </Row>
                    <Row>
                        <p style={{marginTop: "2%",textAlign:"right", paddingRight:"15%"}}>Subtotal: $ {subtotal}</p>
                        <p style={{textAlign:"right", paddingRight:"15%"}}>Delivery Fee: $ {delivery_fee}</p>
                        <p style={{textAlign:"right", paddingRight:"15%"}}>Tax: $ {tax}</p>
                        <p style={{textAlign:"right", paddingRight:"15%"}}>Total: $ {total} </p>
                    </Row>
                </Row>
                <hr/>
            </div>
        );
    }
}

export default Order;