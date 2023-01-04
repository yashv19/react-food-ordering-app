import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import CartItem from './CartItem/CartItem';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import axios from 'axios';

const Cart = props => {
    const [checkingOut, setCheckingOut] = useState(false);
    const [orderSubmitting, setOrderSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const cartContext = useContext(CartContext);
    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

    const hasItems = cartContext.items.length > 0;
    const addItemHandler = item => {
        const incrementItem = {
            ...item,
            amount: 1
        }
        cartContext.addItem(incrementItem);
    };
    const removeItemHandler = id => {
        cartContext.removeItem(id);
    };

    const orderHandler = () => {
        setCheckingOut(true);
    }
    const submitOrderHandler = (userData) => {
        setSubmitError(false);
        setOrderSubmitting(true);
        setTimeout(() => {
            setOrderSubmitting(false);
            setSubmitted(true);
            setCheckingOut(false);
            cartContext.clearCart();
        }, 500);
    }

    const cartItems = cartContext.items.map(item => <CartItem key={item.id} amount={item.amount} name={item.name} price={item.price} onRemove={removeItemHandler.bind(null, item.id)} onAdd={addItemHandler.bind(null, item)} />);

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    let modalView;
    if (submitted) {
        modalView = <h1>Submitted!</h1>
    }
    else if (submitError) {
        modalView =
            <h1>Error submitting order: {submitError} </h1>

    }
    else if (orderSubmitting) {
        modalView = <h1>Submitting...</h1>
    }

    return (
        <Modal onClose={props.onClose}>
            <ul className={classes['cart-items']}>{cartItems}</ul>
            {modalView}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {!checkingOut && modalActions}
            {checkingOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
        </Modal>
    )
};

export default Cart;