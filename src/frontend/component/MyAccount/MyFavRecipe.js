import React from 'react';
// import Recipe from './RecipesItems'
import 'antd/dist/antd.css';
import {Card, List, Row} from 'antd';
import { Typography, Empty } from 'antd';
const { Title } = Typography;

class MyFavRecipe extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            recipeData: []
        };
    }

    componentDidMount() {
        const id = this.props.location.state.id;
        console.log("id is :" + id);
        fetch(`/api/personalinfo/${id}/favoriterecipe`)
            .then(res => res.json())
            .then(recipeData => this.setState({recipeData}, () => console.log("Favorite Recipe Callback: ", recipeData)));
    }

    render(){
        // const hasRec = this.state.recipeData.length === 0;

        return (
            <div style={{paddingBottom: "2%", marginLeft: '15%', marginRight: '15%'}}>
                <Row>
                    <Row>
                        <Title level={4} style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10vh'}}>My Favorite Recipe</Title>
                    </Row>

                    <Row>
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
                                      >
                                      </Card>
                                      <Title className='RecipeCardTitle'>{item.recipe_name}</Title>
                                  </List.Item>
                              )}
                        />
                    </Row>
                </Row>
            </div>
        );
    }
}

export default MyFavRecipe;