import faker from 'Faker';
import {ADD_TO_CART} from '../actions/action-types/cart-actions'
const initState = {
    items:[
        {id:1, title:'Tomato',nutrition:"xxxxxx",price:1200,img:faker.Image.food(),quantity:0},
        {id:2, title:'Potato',nutrition:"xxxxxx",price:800,img:faker.Image.food(),quantity:0},
        {id:3, title:'Lettuce',nutrition:"xxxxxx",price:2200,img:faker.Image.food(),quantity:0},
        {id:4, title:'Carrot',nutrition:"xxxxxx",price:999,img:faker.Image.food(),quantity:0},
        {id:5, title:'Onion',nutrition:"xxxxxx",price:777,img:faker.Image.food(),quantity:0},
        {id:6, title:'Spanich',nutrition:"xxxxxx",price:888,img:faker.Image.food(),quantity:0}
    ],

    addedItems:[],
    total:0
}


const cartReducer = (state = initState,action)=>{
    if(action.type === ADD_TO_CART){
        let addedItem = state.items.find(item=>item.id ===action.id)
        console.log("addeditem:"+addedItem);
        let existed_item =state.addedItems.find(item=>action.id===item.id)
        if(existed_item)
        {
            addedItem.quantity +=action.quantity;
            addedItem.total = addedItem.price*addedItem.quantity;
            console.log(addedItem.total);
            return {
                ...state,
                total:state.total + addedItem.total
            }
        }
        else{
            addedItem.quantity = action.quantity;
            addedItem.total = addedItem.price*addedItem.quantity
            let newTotal =state.total + addedItem.total
            console.log(newTotal);
            return{
                ...state,
                addedItems: [...state.addedItems,addedItem],
                total:newTotal

            }
        }
    }
    else{
        return state;
    }
    
}


export default cartReducer;