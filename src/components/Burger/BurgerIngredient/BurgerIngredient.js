import React, { Component } from 'react';

import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

// przez props dostaniemy informacje jakie skladniki wyrenderowac

// zadaniem tego komponentu jest decydowanie jakie skladniki wyswietlic na podstawie informacji (props) z komponentu Burger.js

// klasowy komponent tylko z powodu wykorzystania prop types

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

        // type do props jakiego oczekuje
        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ('meat'):
                ingredient = <div className={classes.Meat}></div>
                break;
            case ('cheese'):
                ingredient = <div className={classes.Cheese}></div>
                break;
            case ('salad'):
                ingredient = <div className={classes.Salad}></div>
                break;
            case ('bacon'):
                ingredient = <div className={classes.Bacon}></div>
                break;
            default:
                ingredient = null;
        }

        // ingredient to albo null, albo jeden z powyszych divow
        return ingredient;
    }

};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;