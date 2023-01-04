import { Fragment } from "react";
import mealsImage from '../../assets/restaurant.avif'
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {

    return (
        <Fragment>
            <header className={classes.header}>
                <h1>🍟 Snack Attack</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='a table with food'/>
            </div>
        </Fragment>
    )
}

export default Header;