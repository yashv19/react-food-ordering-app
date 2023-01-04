import React, {useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    if (action.type=== 'ADD') {
        let updatedItems;
        let existingItem = state.items.find(item => item.id === action.item.id);
        let existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
        if (existingItem) {
            let updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        else {
            updatedItems = [...state.items, action.item];
        };
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    else if(action.type === 'REMOVE') {
        let item = state.items.find(item => item.id === action.id);
        let itemIndex = state.items.findIndex(item => item.id === action.id);
        if (item.amount > 1) {
            item.amount--;
        }
        else {
            state.items.splice(itemIndex, 1);
        }
        const updatedTotalAmount = state.totalAmount - item.price;
        return {
            items: state.items,
            totalAmount: updatedTotalAmount
        }
    }
    else if(action.type === 'CLEAR') {
        return defaultCartState;
    }
    return defaultCartState;
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);


    const addItemHandler = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        })
    };
    const removeItemHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        })
    };
    const clearCartHandler = () => {
        dispatchCartAction({
            type: 'CLEAR'
        })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler,
    };

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
};

export default CartProvider;