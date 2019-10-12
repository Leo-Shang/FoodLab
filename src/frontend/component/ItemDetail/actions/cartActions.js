import {ADD_TO_CART} from './action-types/cart-actions'

export const addToCart = (id,quantity) =>{
    return{
        type:ADD_TO_CART,
        id,
        quantity
    }
}