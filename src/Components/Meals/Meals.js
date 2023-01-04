import React from "react";
import AvailableMeals from "./AvailableMeals";
import MenuSummary from "./MenuSummary";

const Meals = () => {
    return (
        <React.Fragment>
            <MenuSummary />
            <AvailableMeals />

        </React.Fragment>
    )
}

export default Meals;