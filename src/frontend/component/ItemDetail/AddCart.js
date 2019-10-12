import React from 'react';
import '../css/AddCart.css';
import {connect} from 'react-redux';
import {addToCart} from './actions/cartActions';


class AddCart extends React.Component{
    state={id:1,quantity:0};
    
    onPlusQuantity=()=>{
        console.log(this.state.quantity);
        this.setState({quantity:this.state.quantity+1});
        
    }

    onMinusQuantity=()=>{
        const current = this.state.quantity;
        if (current === 0){
            return;
        }
        else{
            this.setState({quantity:this.state.quantity-1});
        }
    }

    onSubmitItem = (id)=>{
        this.props.addToCart(id,this.state.quantity);

    }

    render(){
        return(
        <section className="container">
        <div className="changable">
            <button className="button" onClick={this.onPlusQuantity}>
            <i class="plus icon"></i>
            </button>
            <input className="quantity" type="text" value={this.state.quantity}/>
            <button className="button" onClick={this.onMinusQuantity}>
            <i class="minus icon"></i>
            </button>
        </div>
        <div className="ui vertical animated button cart" tabindex="0" onClick={()=>this.onSubmitItem(this.props.items[0].id)}>
            <div className="hidden content">Add to Cart</div>
            <div className="visible content">
                <i className="shop icon"></i>
            </div>
        </div>
        </section>
        );
    };

};

const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
const mapDispatchToProps = (dispatch)=>{
    return{
        addToCart: (id,quantity)=>{dispatch(addToCart(id,quantity))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddCart);