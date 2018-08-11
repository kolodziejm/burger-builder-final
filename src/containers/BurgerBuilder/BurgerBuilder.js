import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

// zadaniem tego containera jest zarzadzanie skladnikami, podanie informacji ze state komponentowi burger, ktory poradzi sobie z nimi

export class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onInitIngredients()
    }

    updatePurchaseState = (ingredients) => {
        // kopia tablicy - salad: 0, meat: 0 ...
        const sum = Object.keys(ingredients )
            .map(igKey => {
                //igkey = "salad" "bacon" "cheese"..
                return ingredients[igKey];
                // dodane wartosc
            }).reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0;

        // const purchasable = Object.values(updatedIngredients).some(quantity => quantity > 0);
    }

   
    purchasehandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
            // proste przekierowanie na strone auth
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }; // kopia ze state

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
            // klucz ze state = true lub false jak ujemny
        }
        // KEY TO salad/meat ...
        // for in sluzy do iterowania przez wlasciwosci obiektu
        // {salad: true, meat: false} ...

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <React.Fragment>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    isAuth={this.props.isAuthenticated}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchasehandler}/>
                </React.Fragment>
                );
                orderSummary =  <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
                />
        }

        return (
            <React.Fragment>
                <Modal 
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

// w mapStateToProps definiujemy jak maja sie nazywac nasze kawalki state'u
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}


const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
