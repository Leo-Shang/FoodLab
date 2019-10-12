import {List, Avatar, Button, Skeleton, Col, Row} from 'antd';
import React from 'react';
import reqwest from 'reqwest';
import '../component/css/OrderList.css'
import { async } from 'q';
import 'antd/dist/antd.css';
import { Descriptions } from 'antd';


class OrderList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    list: [],
    result:[],
    user_id:3
  };

    location() {
        window.navigator.geolocation.getCurrentPosition(
            (position)=>{
                this.setState({lat:position.coords.latitude, lng:position.coords.longitude});
                // console.log("lat: "+this.state.lat+" lng: "+this.state.lng)
            },
            err=>this.setState({errorMessage:err.message})
            
        );
    }
  
  componentDidMount() {
    this.getData();
    // this.handlelist();
  }
  getData () {
    reqwest({
      url: `http://localhost:8080/api/orderlist/${this.state.user_id}`,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
  
        this.setState({
            list: res
        }

        )}
    });
  };

  onSubmit(subtotal,total,tax){
      let data = {
          order_item:this.state.list,
          user_id:this.state.user_id,
          subtotal:subtotal,
          tax:tax,
          total:total,
          distance:0,
          shippment:10,


      }
       fetch(`http://localhost:8080/api/orderlist/${this.state.user_id}/post`,{
          method:'POST',
          mode: 'cors', 
          cache: 'no-cache', 
          credentials: 'same-origin',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
      }).then(response => alert(response.json()));
  }


  render() {

    var i = 0;
    var arry = this.state.list;
    let temp = []
    let subtotal = 0
    if (this.state.list.length !=0){
        var length = this.state.list.length;
        console.log("length:"+arry.length);
        console.log("detial:"+arry)
        
        var cur = -1;
        for(i; i<length; i++){
            // console.log(arry[i].regular_price);
            if(cur !== arry[i].item_id){
                temp.push(arry[i]);
                cur = arry[i].item_id
                subtotal= subtotal + arry[i].regular_price
            }
            else{
                cur = arry[i].item_id
            }
        }

        
    }

    let total = subtotal*1.12
    let tax = total-subtotal

    

    return (
      <div className = 'container'style={{paddingBottom: "2%", marginLeft: '15%', marginRight: '15%'}}>
       {temp.map(item =>{
           return(
            <div class="item">
            <img class="ui avatar image" src={item.img}/>
            <div class="content">
              <a class="header">{item.item_name}</a>
              <div class="description">Price: <a><b>{item.regular_price}</b></a> Quantity:{item.quantity}</div>
            </div>
            </div>
   )
       }
        )}

        <Descriptions title="Total">
    <Descriptions.Item label="subtotal">{subtotal}</Descriptions.Item>
    <Descriptions.Item label="Total">{total}</Descriptions.Item>
    <Descriptions.Item label="Delivery Fee:">{total}</Descriptions.Item>
    </Descriptions>
          <Row style={{marginTop: "5%"}}>
              <Col span={4} offset={20}>
    <Button className="button checkout" type="primary" onClick={this.onSubmit(subtotal,total,tax)} style={{  position: 'absolute', left: '180px' }}>
      Confirm
     </Button>
              </Col>
          </Row>
     </div>
    );
  }
}

export default OrderList