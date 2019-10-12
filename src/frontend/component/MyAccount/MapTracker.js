import React from 'react';
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import { Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import delivery from "../../images/delivery.svg"
import { Typography, Icon } from 'antd';

const { Title } = Typography;

const triangleCoords = [
    {lat:49.276765, lng:-122.917957},
    {lat:49.276765, lng:-122.918957}
];

class MapTracker extends React.Component{
    render(){
        const data = this.props.data;
        // console.log(data)
        const order_number = data.order_id;
        const ordered_time = new Date(data.ordered_time);
        const delivery_time = new Date(data.delivery_time);
        const distance = data.distance;
        const delivery_fee = data.delivery_fee;

        return (
            <div style={{marginBottom: "2%"}}>
                <Row>
                    <Title level={2}>Order No. {order_number}</Title>
                </Row>
                <Row>
                    <Col span={12}>
                        <div style={{ height: 400, width: '100%' }}>
                            <Map google={this.props.google} zoom={16} initialCenter={{lat:49.276765, lng:-122.917957}} >
                                
                                <Marker onClick={this.onMarkerClick}
                                    name={'Current location'}
                                    position={{lat:49.276765, lng:-122.917957}}
                                    icon={{
                                        url: delivery,
                                        scale: 3                              
                                    }} 
                                    />
                                <Marker onClick={this.onMarkerClick}
                                    name={'Target location'}
                                    position={{lat:49.276765, lng:-122.918957}} 
                                    />
                                <Polyline
                                    path={triangleCoords}
                                    strokeColor="#0000FF"
                                    strokeOpacity={0.8}
                                    strokeWeight={2} />

                            </Map>
                        </div>                    
                    </Col>
                    <Col span={11} offset={1}>
                        <Row>
                            <p>Ordered Time: {ordered_time.toDateString()}</p>
                            <p>Expected Delivery Time: {delivery_time.toDateString()}</p>
                            <p>Total Distance: {distance} km </p>
                            <p>Delivery Fee: $ {delivery_fee}</p>
                        </Row>
                        {/*<Row>*/}
                        {/*    <p style={{marginTop: "2%",textAlign:"right", paddingRight:"15%"}}>Subtotal: </p>*/}
                        {/*    <p style={{textAlign:"right", paddingRight:"15%"}}>Delivery Fee: </p>*/}
                        {/*    <p style={{textAlign:"right", paddingRight:"15%"}}>Tax: </p>*/}
                        {/*    <p style={{textAlign:"right", paddingRight:"15%"}}>Total: </p>*/}
                        {/*</Row>*/}
                        <Row>
                            <Button style={{width: '50%', marginLeft: '25%', marginRight: '25%', marginTop: '10%'}} id="btn" type="danger">Cancel Order</Button>
                        </Row>
                    </Col>
                </Row>
                
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyC9NelOrBD72PP3kQU2CAjVBrv0fNIOW9A")
  })(MapTracker)