import React from 'react';
import Faker from 'Faker';
import AddCart from '../component/ItemDetail/AddCart';
import PriceChart from '../component/ItemDetail/PriceChart';
import axios from 'axios';
import { async } from 'q';
import Table from '../component/ItemDetail/Table';
import PricePrediction from '../component/ItemDetail/PricePrediction';
import { Spin, Button, Modal } from 'antd';
// import { Button } from 'antd/lib/radio';

class itemDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visibility: false,
            item_id:this.props.item_id,
            item_img:'',
            item_name:'',
            item_price:'',
            item_unit:'$/kg',
            calories:0,
            fat:0,
            vitamin_a:0,
            vitamin_c:0,
            carbohydrate:0,
            calcium:0,
            iron:0,
            sodium:0,
            price_date:{
                price:[],
                date:[]
            }
        };
    }
    // +this.state.item_id.toString()


    getData = async () => {
        // console.log(this.state
        await fetch(`http://localhost:8080/api/item/${this.state.item_id}`)
            .then(response => { 
                Promise.resolve(response.json())
                .then(data=>{ 
                    var price_array = []
                    var date_array = []
                    data.map(dt =>{price_array.push(dt.regular_price);date_array.push(dt.posted_time)});
        
                    // console.log('this is price list:'+price_array)
                    // console.log(this.state.item_id+', '+data[0].item_name);
                    // console.log('this is date list:'+date_array)
                    this.setState({
                        item_img:data[0].img,
                        item_name:data[0].item_name,
                        item_price:data[0].regular_price,
                        calories:data[0].calories,
                        vitamin_a:data[0].vitamin_a,
                        vitamin_c:data[0].vitamin_c,
                        carbohydrate:data[0].carbohydrate,
                        calcium:data[0].calcium,
                        iron: data[0].iron,
                        sodium: data[0].sodium,
                        fat:data[0].fat,
                        price_date:{
                            price:price_array,
                            date:date_array
                        }

                    });
                    // console.log(data)
                                  
                })
               
            })
            .catch(err=> console.log(err));
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
    
    renderContent() {
        if(!this.state.visibility) {
            return(
                <Button type="primary" onClick={this.showModal}>
                    Details
                </Button>
            )
        } else {
            console.log(this.state.item_name);
            if(this.state.item_name===''){
                return ( <Spin tip="Don't worry GG Baker">
                {/* <Alert
                message="Alert message title"
                description="Further details about the context of this alert."
                type="info"
                /> */}
            </Spin>)
            } else {
                return(
                    <Modal
                        title={this.state.item_name}
                        visible={this.state.visibility}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        width={'maxWidth'}
                    >
                        <div className="container">
                            <div className="ui items">
                                <div className="item">
                                    <div className="ui small image">
                                        <img src={process.env.PUBLIC_URL + '/images/groceryItem/' + this.state.item_img + '.png'}/>
                                    </div>
                                <div className="content">
                                    <div className="header">{this.state.item_name}</div>
                                    <div className="meta">
                                        <span className="price">{this.state.item_price}</span>
                                        <span className="stay">{this.state.item_unit}</span>
                                    </div>
                                    <div className="description">
                                        <p>Nutrition:  {Faker.Lorem.paragraph()}</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                            <AddCart id={this.state.id} name={this.state.item_name}/>  
                            <PriceChart PriceDate = {this.state.price_date}/>
                            <PricePrediction PriceDate = {this.state.price_date}/>
                            <Table calories={this.state.calories} fat={this.state.fat} vitamin_a={this.state.vitamin_a} vitamin_c={this.state.vitamin_c}
                            carbohydrate={this.state.carbohydrate} calcium={this.state.calcium} iron={this.state.iron} sodium={this.state.sodium}/>
                        </div>
                    </Modal>
                );
            }
        }
    }

    render(){
        return(<div> {this.renderContent()}</div>)
    }
}

export default itemDetails;
