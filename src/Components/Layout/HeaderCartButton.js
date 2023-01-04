import React, {useContext, useEffect, useState} from "react";
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const cartContext = useContext(CartContext);
    const [buttonBump, setButtonBump] = useState(false);
    let buttonClasses = `${classes.button} ${buttonBump ? classes.bump : ''}`;
    const {items} = cartContext;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setButtonBump(true);
        const timer = setTimeout(() => {
            setButtonBump(false);
        }, 300);

        return (() => {
            clearTimeout(timer);
        })
    }, [items])

    const numCartItems = cartContext.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    return (
        <button className={buttonClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                My Cart
            </span>
            <span className={classes.badge}>
                {numCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;