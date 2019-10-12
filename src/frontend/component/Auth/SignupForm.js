import React from 'react';
import ReactDOM from 'react-dom';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Select,
    Button,
    AutoComplete,
    Upload,
    message
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css'


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

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


class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        loading: false
    };

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

    // showModal = () => {
    //     this.setState({
    //         visible: true
    //     });
    // };

    // handleSubmit = e =>{
    //     console.log(e);
    //     this.setState({
    //         visible: false,
    //     });
    // };

    // handleCancel = e =>

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '1',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="1"> +1</Option>
            </Select>,
        );

        const { imageUrl } = this.state;

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginRight: 150, marginTop: 80, width: '80%' }}>
                <Form.Item style={{ marginLeft: '90%' }}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item
                    label={
                        <span>
                            User Name&nbsp;
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item label="Phone Number">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="Street Name">
                    {getFieldDecorator('street', {
                        rules: [{ required: true, message: 'Please input the street name!' }],
                    })(<Input style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="City Name">
                    {getFieldDecorator('city', {
                        rules: [{ required: true, message: 'Please input the city name!' }],
                    })(<Input style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="Provice Name">
                    {getFieldDecorator('province', {
                        rules: [{ required: true, message: 'Please input the province name!' }],
                    })(<Input style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="Apartment Number">
                    {getFieldDecorator('apt_num', {
                        rules: [{ required: false }],
                    })(<Input style={{ width: '100%' }} />)}

                </Form.Item>

                <Form.Item label="Buzz Code">
                    {getFieldDecorator('buzz', {
                        rules: [{ required: false }],
                    })(<Input style={{ width: '100%' }} />)}

                </Form.Item>

                <Form.Item label="Postal Code">
                    {getFieldDecorator('postal_code', {
                        rules: [{ required: true, message: 'Please input your recident postal code!' }],
                    })(<Input style={{ width: '100%' }} />)}

                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <Button type="primary" htmlType="cancel" style={{ marginLeft: 100 }}>
                        Cancel
                    </Button>
                </Form.Item>


            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

ReactDOM.render(<WrappedRegistrationForm />, document.getElementById('root'));

export default WrappedRegistrationForm;