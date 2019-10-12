import React, {Component} from 'react';
import Profile from '../../images/prof.png';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
const { Title } = Typography;

class MyAccount extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const id = this.props.location.state.id;
        console.log("id is :" + id);
        fetch(`/api/personalinfo/${id}/myaccount`)
            .then(res => res.json())
            .then(data => this.setState({data}, () => console.log("My Account Callback: ", data)));
    }

    render(){
        const fetched_json = this.state.data;
        const isVIP = this.state.data.is_member;
        const id = this.props.location.state.id;
        // const props_data = this.props.data;
        // console.log(props_data.id);
        const image_name = fetched_json.img;
        console.log(image_name);
        return (
                <div style={{paddingBottom: "2%", marginLeft: '15%', marginRight: '15%'}}>
                    <Row>
                        <Title level={4} style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>My Account</Title>
                    </Row>
                    <Row gutter={24} style={{alignItems:'center', marginRight: '50px'}}>
                        <Col span={12}>
                            <img
                                src = { process.env.PUBLIC_URL + "../../images/customer_picture/" + image_name + ".png" }
                                style={{ marginLeft:'auto', marginRight:'auto', marginTop:'auto', marginBottom:'auto', height:'100px', maxWidth:'200px', maxHeight:'200px' }}
                                alt='profile' >
                            </img>
                                 {/*TODO: DEBUG HERE*/}
                            {/*<img*/}
                            {/*    src={ process.env.PUBLIC_URL + '/images/groceryItem/' + image_name + '.png' }*/}
                            {/*    style={{ marginLeft:'auto', marginRight:'auto', marginTop:'auto', marginBottom:'auto', height:'380px', maxWidth:'60vw', maxHeight:'380px' }}*/}
                            {/*    alt=''>*/}
                            {/*</img>*/}
                        </Col>
                        <Col span={12}>
                            <Row style={{marginBottom: "3%"}}>
                                <Row><b>Name:</b> {fetched_json.user_name} </Row>
                                <Row><b>Customer ID:</b> {fetched_json.customer_id} </Row>
                                <Row><b>Contact Info:</b> {fetched_json.phone} </Row>

                                {isVIP ? (
                                    <Row><b>Status:</b> VIP </Row>
                                ) : (
                                    <Row><b>Status:</b> Customer </Row>
                                )}

                            </Row>
                            <Row>
                                <Button type="primary" color="#841584" variant="outline-light" >
                                    <Link to={{
                                        pathname: `/personalinfo/${id}/editaccountinfo`,
                                        state: {
                                            id: id,
                                        }
                                    }}>Edit Info</Link>
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </div> 
                                          
        );
    }
}

export default MyAccount;