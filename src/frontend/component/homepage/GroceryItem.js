import React from 'react';
import Searchbar from './Searchbar';
import ItemDetail from '../../pages/itemDetail';
import { Carousel, List, Card, Typography, Icon, Modal } from 'antd';
const { Meta } = Card;
const { Title } = Typography;


const item_url = '/api/item';
const onsale_url = '/api/item/onsale';

class GroceryItem extends React.Component{
    state = {
        isFetching: true,
        itemData: [],
        onSaleData: [],
        error: null,
        onSubmitFoods: ''
    };

    getData = async () => {
        this.setState({ isFetching: true, });
        try {
            await Promise.all([
                fetch( item_url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                 } )
                .then(res => res.json())
                .then(msg => this.setState({ itemData: msg, }, () => console.log(msg)))
                ,
                fetch(onsale_url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(msg => this.setState({ onSaleData: msg, }, () => console.log(msg)))
            ]);
        } catch (error) {
            console.log(error);
            this.setState({ error, isFetching: false, });
        } finally {
            this.setState({ isFetching: false, });
        };
    };

    componentWillMount() {
        this.getData();
    };

    render() {
            return (
                <div style={{ paddingTop:"1vh", paddingBottom: "1vh", marginLeft: '15vw', marginRight: '15vw' }}>
                    {/* <Searchbar data={this.state.itemData}/> */}
                    <Title level={1} className='SubTitle OnSale'>On Sale!</Title>
                    <Carousel autoplay dotPosition="bottom" effect="fade" style={{ }}>
                        {this.state.onSaleData.map((item, key) => 
                        <div key = {key} style={{ }}>
                            <Title level={2} style={{ overflow:'hidden', textOverflow:'ellipsis', marginLeft:'auto', marginRight:'auto', marginTop:'15px', width:'55vw', textAlign:'center' }} >
                                {item.item_name}
                            </Title>
                            <img 
                                id={ item.item_id }
                                src={ process.env.PUBLIC_URL + '/images/groceryItem/' + item.img + '.png' }
                                style={{ marginLeft:'auto', marginRight:'auto', marginTop:'auto', marginBottom:'auto', height:'380px', maxWidth:'60vw', maxHeight:'380px' }}
                                alt=''>
                            </img>
                            <Title className='PromotionPrice' style={{  }} >
                                Regular Price: {item.regular_price} Now it's ONLY {item.promotion_price}
                            </Title>
                        </div>)}
                    </Carousel>
                    <Title level={1} className='SubTitle' >Our Items</Title>
                    <List grid={{
                            gutter: 12,
                            xs: 1,
                            sm: 2,
                            md: 2,
                            lg: 3,
                            xl: 3,  
                            xxl: 6,
                            }}
                        dataSource={this.state.itemData}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    hoverable
                                    style={{ width: 180, height: 280, }}
                                    cover={
                                        <img
                                            id={ item.item_id }
                                            src={ process.env.PUBLIC_URL + '/images/groceryItem/' + item.img + '.png' }
                                            style={{ width: '80%', marginLeft:'auto', marginRight:'auto', marginTop:'30px', marginBottom:'auto', maxHeight:'280' }}
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
                </div>
            );
        }
}

export default GroceryItem;