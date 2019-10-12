import React from 'react';
import Order from './Order'
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
const { Title } = Typography;

class OrderHistory extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const id = this.props.location.state.id;
        console.log("id is :" + id);
        fetch(`/api/personalinfo/${id}/orderhistory`)
            .then(res => res.json())
            .then(data => this.setState({data}, () => console.log("Order History Callback: ", data)));
    }

    render(){
        const order_count = this.state.data.length;
        let rows = [];
        let order_data = [];
        let key_value = 0;

        if (order_count > 0) {
            let old_order_id = this.state.data[0].order_id;
            for (let i = 0; i < order_count; i++){
                let current_order_id = this.state.data[i].order_id;
                let isSameOrder = old_order_id === current_order_id;
                if (isSameOrder) {
                    order_data.push(this.state.data[i]);
                    old_order_id = current_order_id;
                } else {
                    rows.push(<Order key={key_value} data={order_data} />);
                    key_value += 1;
                    order_data = [];
                    old_order_id = this.state.data[i].order_id;
                    i--;
                }
            }
            rows.push(<Order key={key_value} data={order_data} />);
        }
        // console.log(rows.length + " HERE");

        return (
            <div style={{paddingBottom: "2%", marginLeft: '15%', marginRight: '15%'}}>
                <Row>
                    <Col span = {24}>
                        <Title level={4} style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>
                            My Order History
                        </Title>
                    </Col>
                </Row>
                <Row style={{marginLeft: "3%", marginRight: "3%"}}>
                    {rows}
                </Row>
            </div>

            // <div style={{backgroundColor:"#8CC152", alignItems:'center', marginLeft: '15%', marginRight: '15%', paddingBottom: '2%'}}>
            //     <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>My Order History</h2>
            //     <Order/>
            //     <Order/>
            // </div>
        );
    }
}

export default OrderHistory;