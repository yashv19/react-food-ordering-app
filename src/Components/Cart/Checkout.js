import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = props => {
    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        zipcode: true,
        city: true,
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const zipcodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredZipcode = zipcodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredZipcodeIsValid = isFiveChars(enteredZipcode);

        setFormValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            zipcode: enteredZipcodeIsValid,
            city: enteredCityIsValid,
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredZipcodeIsValid;

        if (!formIsValid) return;

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            zipcode: enteredZipcode,
            city: enteredCity,
        })

    }
    return <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${formValidity.name ? '' : classes.invalid}`}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef} />
            {!formValidity.name && <p>Please enter a valid name</p>}
        </div>
        <div className={`${classes.control} ${formValidity.street ? '' : classes.invalid}`}>
            <label htmlFor='street'>Street Address</label>
            <input type='text' id='street' ref={streetInputRef} />
            {!formValidity.street && <p>Please enter a valid street address</p>}
        </div>
        <div className={`${classes.control} ${formValidity.zipcode ? '' : classes.invalid}`}>
            <label htmlFor='zipcode'>Zip Code</label>
            <input type='text' id='zipcode' ref={zipcodeInputRef} />
            {!formValidity.zipcode && <p>Please enter a valid zip code</p>}
        </div>
        <div className={`${classes.control} ${formValidity.city ? '' : classes.invalid}`}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef} />
            {!formValidity.city && <p>Please enter a valid city</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit} >Confirm</button>
        </div>
    </form>
};

export default Checkout;