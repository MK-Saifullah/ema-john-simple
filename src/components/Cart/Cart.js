import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const {cart} = props;
    return (
        <div className='cart-history'>
        <h5>Order Summery: {cart.length} </h5>
    </div>
    );
};

export default Cart;