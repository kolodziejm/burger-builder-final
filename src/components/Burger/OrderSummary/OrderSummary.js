import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // To moze byc komponent funkcyjny!

    render () {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map((igKey => {
            return (<li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>)
        }))

        return (

        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{this.props.price.toFixed(2)}</strong> zł</p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </React.Fragment>
        );
    }
    
   
    // ingredients dostaniemy w formie obiektu, przez ktory nie mozemy mapowac, musimy to zamienic
    // <li>Meat: 1</li>
};

export default OrderSummary;