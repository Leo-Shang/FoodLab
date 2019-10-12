import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Comments from "../component/instruction/Comments";
import Steps from "../component/instruction/Steps";
import Favourite from "../component/instruction/Favourite";
import ItemDetail from '../pages/itemDetail';
import {List, Card, Typography, Modal, Button} from 'antd';

const { Meta } = Card;
const { Title } = Typography;

class Instruction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: false,
            isFetching: false,
            data: [],
            error: null,
            id: this.props.item_id,
        };
    }

    getData = async () => {
        const id = this.state.id;
        this.setState({ isFetching: true, });
        try {
            await Promise.all([
                fetch(`http://localhost:8080/api/recipe/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                } )
                    .then(res => res.json())
                    .then(msg => this.setState({ data: msg, }, () => console.log(msg)))
            ]);
        } catch (error) {
            console.log(error);
            this.setState({ error, isFetching: false, });
        } finally {
            this.setState({ isFetching: false, });
        };
    };

    componentDidMount() {
        this.getData();
    };

    // modals function
    showModal = () => {
        this.setState({
          visibility: true,
        });
    };

    handleOk = () => {
        this.setState({
            visibility: false,
        });
    };
    
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visibility: false,
        });
    };

    render() {
        if(!this.state.visibility) {
            return(
                <Button type="primary" onClick={this.showModal}>
                    Details
                </Button>
            )
        } else {
            

            //let items = [...new Set(this.state.data.item_name)];

            // console.log(items);

            return (
                <Modal
                        title={this.state.item_name}
                        visible={this.state.visibility}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        width={'maxWidth'}
                >
                    <div>
                            <h2>Items</h2>
                            <hr />
                            <List
                                grid={{
                                    gutter: 12,
                                    column: 4,
                                    xxl: 6,
                                }}
                                dataSource={this.state.data}
                                renderItem={item => (
                                    <List.Item>
                                        <Card
                                            style={{ width: 150, height: 200 }}
                                            actions={[<Link to='api/itemdetail/' />]}
                                            cover={
                                                <img
                                                    id={ item.recipe_id }
                                                    src={ process.env.PUBLIC_URL + '/images/groceryItem/' + item.recipe_id+'.png' }
                                                    style={{ maxWidth:'95%', position:'absolute', top:0, bottom:0, left:0, right:0, margin:'auto' }}
                                                    alt=''
                                                />
                                            }
                                            actions={[<ItemDetail item_id={item.item_id} visibility={false}/>]}
                                        >
                                            <Meta title={item.item_name} className='CardTitle'/>

                                        </Card>
                                    </List.Item>
                                )}
                            />
                            <hr />
                            <Steps id={this.state.id}/>
                            <hr />
                            <Comments id={this.state.id}/>
                    </div>
                </Modal>
            )
        }
    }
}

export default Instruction;