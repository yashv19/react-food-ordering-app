import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getMeals } from '../../utils/api';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getAvailableMeals() {
            const loadedMeals = await getMeals();
            setMeals(loadedMeals);
            setIsLoading(false);
            setError(false);
        }
        getAvailableMeals().catch(error => {
            setIsLoading(false);
            setError(error.message);
        });
    }, []);

    if (isLoading) {
        return <h1 className={classes.LoadingText}>Loading...</h1>
    }
    else if (error) {
        return <h1 className={classes.ErrorText}>{error}</h1>
    }

    let mealsList = meals.map(
        meal => <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price} />);

    return (
        <section className={classes.meals}>
            <Card>
                {<ul>{mealsList}</ul>}
            </Card>
        </section>
    )
}

export default AvailableMeals;