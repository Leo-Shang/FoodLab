import React from 'react';
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Upload,
    Select,
    Row,
    Col,
    Button,
    message,
    Collapse,
    Typography,
    Drawer
  } from 'antd';
import Profile from '../../images/prof.png';
import '../css/Avatar.css'
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

// For Advance settings, changing password
const { Panel } = Collapse;
// const axios = require('axios');

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class EditAccountInfo extends React.Component{
    constructor(props) {
        super(props);
        const src = '../../images/prof.jpeg';
        this.state = {
            visible: false,
            data: [],
            confirmDirty: false,
            autoCompleteResult: [],
            preview: null,
            src,
            oldPassword: "",
            password: "",
            confirmPassword: "",
            user_name: '',
            temp: [],
        };
    }

    // handleChange = event => {
    //     this.setState({
    //       [event.target.id]: event.target.value
    //     });
    // };

    // Reset Password Drawer
    showDrawer = () => {
        this.setState({
          visible: true,
        });
    };

    onClose = () => {
        this.setState({
          visible: false,
        });
    };

    componentDidMount() {
        const set = ()=>{
            var assigned = this.state.data.user_name;
            this.setState({user_name:assigned});
        }
        const id = this.props.location.state.id;
        console.log("id is :" + id);
        fetch(`/api/personalinfo/${id}/editaccountinfo`)
            .then(res => res.json())
            .then(data => this.setState({data}, () => console.log("Edit Account Info Callback: ", data)));
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    };

    // handleInput(event){
    //     var email = document.getElementById("email").value;
    //     var phone = document.getElementById("phone").value;
    //     var apt_number = document.getElementById("apt").value;
    //     var street_name = document.getElementById("street").value;
    //     var city_name = document.getElementById("city").value;
    //     var province_name = document.getElementById("province").value;
    //     var postal_code = document.getElementById("postal").value;
    //     var buzz_code  = document.getElementById("buzz").value;
    //     var user_name = document.getElementById("user").value;

    //     var q = []
    //     q.push(email);
    //     q.push(phone);
    //     q.push(apt_number);
    //     q.push(street_name);

    //     this.setState({temp: q})
    // }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    onSaveSubmit = () => {
        const id = this.props.location.state.id;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var apt_number = document.getElementById("apt").value;
        var street_name = document.getElementById("street").value;
        var city_name = document.getElementById("city").value;
        var province_name = document.getElementById("province").value;
        var postal_code = document.getElementById("postal").value;
        var buzz_code  = document.getElementById("buzz").value;
        var user_name = document.getElementById("user").value;

        let databody = {
            password:       this.state.data.password,
            user_name:      user_name,
            phone:          phone,
            email:          email,
            street_name:    street_name,
            city_name:      city_name,
            province_name:  province_name,
            apt_number:     apt_number,
            buzz_code:      buzz_code,
            postal_code:    postal_code
        }
        fetch(`/api/personalinfo/${id}/editaccountinfo`, {
                method: 'POST',
                body: JSON.stringify(databody),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => console.log(data));
        
    }

    onPasswordSubmit = () => {
        var oldPassword = document.getElementById("old_pwd").value;
        var password = document.getElementById("pwd").value;
        var confirmPassword = document.getElementById("confirm_pwd").value;
        this.setState({oldPassword: oldPassword, password: password, confirmPassword: confirmPassword});

        var user_name       = this.state.data.user_name;
        var phone           = this.state.data.phone;
        var email           = this.state.data.email;
        var street_name     = this.state.data.street_name;
        var city_name       = this.state.data.city_name;
        var province_name   = this.state.data.province_name;
        var apt_number      = this.state.data.apt_number;
        var buzz_code       = this.state.data.buzz_code;
        var postal_code     = this.state.data.postal_code;

        if (oldPassword !== this.state.data.password) {
            message.error('The password is incorrect!', 5);
        } else {
            if (password !== confirmPassword) {
                message.error('Two passwords that you enter is inconsistent!', 5);
            } else {
                const id = this.props.location.state.id;
                console.log('PWD is ' + password)
                let databody = {
                    password:       password,
                    user_name:      user_name,
                    phone:          phone,
                    email:          email,
                    street_name:    street_name,
                    city_name:      city_name,
                    province_name:  province_name,
                    apt_number:     apt_number,
                    buzz_code:      buzz_code,
                    postal_code:    postal_code
                }
                fetch(`/api/personalinfo/${id}/editaccountinfo`, {
                        method: 'POST',
                        body: JSON.stringify(databody),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    .then(res => res.json())
                    .then(data => console.log(data));
            }
        }
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { imageUrl } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 20 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '1',
        })(
            <Select style={{ width: 70 }}>
              <Option value="1">+1</Option>
              <Option value="86">+86</Option>
            </Select>,
        );
        const fetched = this.state.data;
        
        const uploadButton = (
            <div className="btn-img">
                <div className="btn-wrap">
                    <img src={Profile} style={{ width: '100%' }} alt="profile"/>
                    {/* <Icon className="overlay" type={this.state.loading ? 'loading' : 'plus-circle'}/> */}
                </div>               
                {/* <div className="ant-upload-text">Upload</div> */}
            </div>
        );

        console.log("Edit info fetched data: " + JSON.stringify(fetched));
        
        return (
            <div style={{paddingTop: "2%", paddingBottom: "2%", marginLeft: '15%', marginRight: '15%'}}>
                <Row>
                    <Col span={24}>
                        <Title level={4} style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>Edit My Information</Title>
                    </Col>
                </Row>
                
                <Form {...formItemLayout} layout="inline" onSubmit={this.handleSubmit} style={{marginLeft: '10%', marginRight: '10%'}}>
    `                <Form.Item className="avatar-form">                      
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                            style={{width: 150, height: 100}}
                            >  
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }}/> : uploadButton}                        
                        </Upload>
                        
                    </Form.Item>`
                    <br/>
                    <Form.Item
                        label={
                            <span>
                            Username&nbsp;
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                            </span>
                        }
                        style={{width: '100%'}}
                        >
                        <Input id={"user"} type="text" value={fetched.user_name}/>
                    </Form.Item>
                    <br/>
                    <Form.Item label="E-mail" style={{width: '100%'}}>
                        <Input id={"email"} type="text" value={fetched.email}/>
                    </Form.Item>
                    <br/>
                    <Form.Item label="Phone Number" style={{width: '100%'}}>
                        <Input id={"phone"} addonBefore={prefixSelector} style={{ width: '100%' }} type="text" value={fetched.phone}/>
                    </Form.Item>
                    <br/>
                    <Form.Item label="Unit" style={{width: '100%'}}>
                        <Input id={"apt"} type="text" value={fetched.apt_number}/>
                    </Form.Item>

                    <Form.Item label="Street " style={{width: '100%'}}>
                        <Input id={"street"} type="text" value={fetched.street_name}/>
                    </Form.Item>

                    <Form.Item label="City Name" style={{width: '100%'}}>
                        <Input id={"city"} style={{ width: '100%' }} type="text" value={fetched.city_name}/>
                    </Form.Item>

                    <Form.Item label="Province Name" style={{width: '100%'}}>
                        <Input id={"province"} style={{ width: '100%' }} type="text" value={fetched.province_name}/>
                    </Form.Item>

                    <Form.Item label="Postal Code" style={{width: '100%'}}>
                        <Input id={"postal"} style={{ width: '100%' }} type="text" value={fetched.postal_code}/>
                    </Form.Item>    

                    <Form.Item label="Buzz Code" style={{width: '100%'}}>
                        <Input id={"buzz"} style={{ width: '100%' }} type="text" value={fetched.buzz_code}/>
                    </Form.Item>

                    {/* Advanced setting: reset password */}
                    <Form.Item style={{width: '100%', marginTop: '5%'}}>
                        <Collapse bordered={false} >
                            <Panel header="Advanced Setting" style={{width: '100%'}}>
                                <Button type="primary" onClick={this.showDrawer}>Rest Password</Button>
                            </Panel>
                        </Collapse>
                    </Form.Item>               
                </Form>
               
                <Drawer
                    title="Reset Password"
                    placement={"top"}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    height={'100%'}
                    closable={true}                    
                    >
                        <Form>
                            <Form.Item label="Old Password" style={{ marginLeft: '25%', marginRight: '25%' }}>
                                <Input.Password 
                                    id={"old_pwd"} 
                                    style={{ width: '100%'}} 
                                    type="password"
                                    />
                            </Form.Item>
                            <hr style={{ width: '50%', marginLeft: '25%', marginRight: '25%' }}/>
                            <Form.Item label="New Password" style={{ marginLeft: '25%', marginRight: '25%' }}>
                                <Input.Password 
                                    id={"pwd"} 
                                    style={{ width: '100%'}} 
                                    type="password"/>
                            </Form.Item>
                            <Form.Item label="Confirm New Password" style={{ marginLeft: '25%', marginRight: '25%'}}>
                                <Input.Password 
                                    id={"confirm_pwd"} 
                                    style={{ width: '100%'}} 
                                    type="password"/> 
                            </Form.Item>                                        
                            <Button 
                                type="primary"
                                htmlType="submit" 
                                style={{ width: '50%', marginLeft: '25%', marginRight: '25%', marginTop: '5%', marginBottom: '5%'}}
                                onClick ={this.onPasswordSubmit}>
                                Change Password
                            </Button>
                        </Form>
                        
                </Drawer>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    style={{width: '50%', marginLeft: '25%', marginRight: '25%', marginTop: '5%'}}
                    onClick={this.onSaveSubmit}>
                    Save
                </Button>
            </div>
            
        );
    }
}

const WrappedUpdateForm = Form.create()(EditAccountInfo);

export default WrappedUpdateForm;