import React, { useRef, useState } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        let enteredAmount = amountInputRef.current.value;
        if (enteredAmount.trim().length === 0 || +enteredAmount < 1 || +enteredAmount > 5) {
            setAmountIsValid(false);
            return;
        }
        setAmountIsValid(true);
        props.onAddToCart(+enteredAmount);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amountInputRef} label="Amount" input={{
                id: `amount_${props.id}`,
                type: "number",
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}
            />
            <button>Add</button>
            {!amountIsValid && <p style={{color: "red"}}>Please enter a valid amount</p>}
        </form>
    )
}

export default MealItemForm;