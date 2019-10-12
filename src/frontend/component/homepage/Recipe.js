import React from 'react';
import Instruction from '../../pages/Instruction';
import { List, Card, Typography } from 'antd';
const { Title } = Typography;

const recipe_url = '/api/recipe';

class Recipe extends React.Component{
    state = {
        isFetching: false,
        recipeData: [],
        error: null,
    };

    getData = async () => {
        this.setState({ isFetching: true, });
        try {
            await Promise.all([
                fetch( recipe_url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                 } )
                .then(res => res.json())
                .then(msg => this.setState({ recipeData: msg, }, () => console.log(msg)))
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

    render() {
        return (
            <div style={{ paddingTop:"1vh", paddingBottom: "1vh", marginLeft: '15vw', marginRight: '15vw' }}>
                {/* <Searchbar onSubmit={this.onSubmitFoods}/> */}
                <Title level={1} className='SubTitle' >Our Recipes</Title>
                <List grid={{
                        gutter: 12,
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 3,
                        xl: 3,  
                        xxl: 6,
                        }}
                    dataSource={this.state.recipeData}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                hoverable
                                style={{ width: 180, height: 200, marginBottom:'10px' }}
                                cover={
                                    <img
                                        id={ item.recipe_id }
                                        src={ process.env.PUBLIC_URL + '/images/recipe/' + item.recipe_id+'.png' }
                                        style={{ maxWidth:'95%', position:'absolute', top:0, bottom:0, left:0, right:0, margin:'auto' }}
                                        alt=''
                                    />
                                }
                                actions={[<Instruction item_id={item.recipe_id} visibility={false}/>]}
                                >
                            </Card>
                            <Title className='RecipeCardTitle'>{item.recipe_name}</Title>
                        </List.Item>
                    )}
                />
                {/* <Title level={4} style={{paddingLeft: "2%"}}>History</Title>
                    <List grid={{ gutter:16, column:4 }} dataSource={this.state.data}>{this.state.isFetching ? 'Fetching data...':''} />
                    </List>
                <Title level={4} style={{paddingLeft: "2%"}}>Our Items</Title>
                    <List grid={{ gutter:16, column:4 }} dataSource={this.state.data}>{this.state.isFetching ? 'Fetching data...':''} />
                    </List> */}
            </div>
        );
    }
}

export default Recipe;