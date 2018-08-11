import React from 'react'

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

// zadaniem tego komponentu jest wyswietlanie wszystkich skladnikow,

// props.ingredient jaki dostajemy to obiekt, nie tablica, nie mozemy przez niego mapowac, poki go nie przekonwertujemy

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
        // Object.keys bierze same klucze z podanego obiektu (tutaj state z BurgerBuilder.js)
        // igKey to salad, cheese, meat bez jego ilosci, sam klucz
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/> // unikalny klucz np. salad1, cheese2
        });
        // powyzsza linijka tworzy ilosc elementow undefined do kazdego klucza skladnika w ilosci zaleznej ze state w BurgerBuilder.js
        // czyli przykladowo jesli cheese: 2 - [undefined, undefined]
        // meat: 1 - [undefined]

    }).reduce((arr, el) => {
        // arr - previous value, el - current value
        return arr.concat(el);
        // dodaje kazdy element do wartosci z poprzedniej iteracji, tworzac 1 tablice ze wszystkich podtablic z iloscia skladnikow
    }, []);

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;