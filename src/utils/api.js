
export const getMeals = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let availableMeals = [
                {
                    id: 1,
                    name: 'Butternut squash',
                    description: 'The whole squash is only 40 calories',
                    price: 20.00,
                },
                {
                    id: 2,
                    name: 'Regular squash',
                    description: 'If you dont like butter, then try the regular squash. 20 calories',
                    price: 10.00,
                },
                {
                    id: 3,
                    name: 'Potato bake',
                    description: 'Not a baked potato.',
                    price: 15.00,
                },
                {
                    id: 4,
                    name: 'Chicken',
                    description: 'Cant promise it will be dead',
                    price: 14.00,
                },
                {
                    id: 5,
                    name: 'Mango',
                    description: 'This is dessert',
                    price: 100.00,
                }
            ]
            resolve(availableMeals);
        }, 1000)   
    });
}