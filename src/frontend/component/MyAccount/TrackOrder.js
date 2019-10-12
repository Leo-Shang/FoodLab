import MapTracker from './MapTracker'
import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;

class TrackOrder extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const id = this.props.location.state.id;
        fetch(`/api/personalinfo/${id}/trackorder`)
            .then(res => res.json())
            .then(data => this.setState({data}, () => console.log("Track Order Callback: ", data)));
    }

    render(){
        const count = this.state.data.length;
        // console.log("There are " + order_count);
        let rows = [];
        for (let i = 0; i < count; i++){
            const today = new Date();
            const delivery_time = new Date(this.state.data[i].delivery_time);
            if (today < delivery_time)
                rows.push(<MapTracker key={i} data={this.state.data[i]} />);
        }
        return (
            <div style={{paddingBottom: "2%", marginLeft: '15%', marginRight: '15%'}}>
                <Row>
                    <Col>
                        <Title level={4} style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>Track My Order</Title>
                    </Col>
                </Row>
                <Row style={{marginLeft: "3%", marginRight: "3%"}}>
                    {rows}
                </Row>
            </div>
        );
    }
}

export default TrackOrder;