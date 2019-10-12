import React from 'react';
// import Routes from './Routes';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Recipe from './Recipe';
import GroceryItem from './GroceryItem';
import { Menu} from 'antd';

class Nav extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} 
                                style={{ paddingBottom: "1.3vh", marginLeft: '5vw', marginRight: '5vw', display: 'flex', 
                                                justifyContent:'center', alignItems:'center', textAlign:'center', fontSize:'1.1em' }} mode="horizontal">
                    <Menu.Item key="groceryItems" style={{ width:'48%' }}>
                        <Link to="/products/groceryItems">Grocery List</Link>
                    </Menu.Item>
                    <Menu.Item key="orderhisreciptory" style={{ width:'48%' }}>
                        <Link to="/products/recipe">Recipe</Link>
                    </Menu.Item>
                </Menu>
                    <Route exact path="/products/groceryItems" component={GroceryItem} />
                    <Route exact path="/products/recipe" component={Recipe} />
            </BrowserRouter>
        );
    }

    state = {
        current: 'groceryItems',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
        current: e.key,
        });
    };
}

export default Nav;