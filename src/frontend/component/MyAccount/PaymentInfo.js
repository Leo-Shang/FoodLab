import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;

class PaymentInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const id = this.props.location.state.id;
        // console.log("id is :" + id);
        fetch(`/api/personalinfo/${id}/paymentinfo`)
        // fetch(`/api/personalinfo/paymentinfo`)
            .then(res => res.json())
            .then(data => this.setState({data}, () => console.log("Payment Info Callback: ", data)));
    }

    render(){
        const expire_date = new Date(this.state.data.expire_date);
        return (
            <div style={{paddingBottom: "2%", marginLeft: '15%', marginRight: '15%'}}>
                <Row>
                    <Col>
                        <Title level={4} style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>My Payment Information</Title>
                    </Col>
                </Row>
                <Row style={{marginLeft: "3%", marginRight: "3%"}}>
                    <p><b>Card Holder Name:</b> {this.state.data.cardholder_name} </p>
                    <p><b>Card Number:</b> {this.state.data.card_number} </p>
                    <p><b>Card Expire Date:</b> {expire_date.toDateString()} </p>
                    <p><b>Security Code:</b> {this.state.data.security_code} </p>
                </Row>
            </div>
        );
    }
}

export default PaymentInfo;