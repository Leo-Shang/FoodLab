import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Input } from 'antd';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import PaymentInfo from './PaymentInfo';


class SecurityInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            input_password: "",
            visible: true,
            redirect: false,
            passwordCorrect: false,
            modal_text : "Please input your password to verify!",
        };
    }

    componentDidMount() {
        const id = this.props.location.state.id;
        fetch(`/api/personalinfo/${id}/securityinfo`)
            .then(res => res.json())
            .then(data => this.setState({data}, () => console.log("Security Info Callback: ", data)));
    }

    renderRedirect = () => {
        if (this.state.data.password === this.state.input_password) {
            console.log("Password matched");
            const id = this.props.location.state.id;
            console.log("id security: " + id);
            return (<BrowserRouter>
                <Redirect to={{
                    pathname: `/personalinfo/${id}/paymentinfo`,
                    state: {
                        id: id,
                    }
                }} />
                <Route exact path="/personalinfo/:id/paymentinfo" component={PaymentInfo} />
            </BrowserRouter> );
        }
    };
    
    showModal = () => {
        this.setState({
          visible: true,
        });
    };
    
    handleOk = () => {
        var input_password = document.getElementById("password").value;
        console.log(input_password);
        console.log(typeof input_password);

        this.setState({input_password: input_password});

        if (input_password !== this.state.data.password) {
            this.setState({modal_text: "Wrong Password"})
            //this.state.modal_text = "Wrong Password";
            document.getElementById("prompt_text").style.color = "red";
            document.getElementById("prompt_text").style.animation = "shake";
        } else {
            setTimeout(() => {
                this.setState({
                    visible: false
                });
            }, 100);
        }


    };

    handleCancel = () => {
        this.setState({
          visible: false,
        });
        
    };

    // onChange = value => {
    //     var pw = String(value);
    //     this.setState({ password: pw});
    // };

    render() {
        const { visible, modal_text } = this.state;
        return (
            <div>
                <Modal
                  title="Please Input Your FoodLab Account Password"
                  visible={visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                    <p id={"prompt_text"}>{modal_text}</p>
                    <Input.Password id={"password"} placeholder="Input your password"/>
                </Modal>
                {this.renderRedirect()}
            </div>
        );
    }
}

export default SecurityInfo;