import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const {cart, handleClearCart, children} = props;
    // console.log(cart);

    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for (const product of cart){
        quantity = quantity + product.quantity;
        total = total + (product.price * product.quantity);
        shipping = shipping + product.shipping;
    }
    const tax = parseFloat((total * 0.1).toFixed(2));
    // console.log(tax);
    const grandTotal = ((total+shipping) + (tax)).toFixed(2);
    return (
        <div className='cart-history'>
            <h2>Order Summery </h2>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${total}</p>
            <p>Total Shipping: ${shipping}</p>
            <p>Tax: ${tax}</p>
            <hr/>
            <strong>Grand Total: ${grandTotal} </strong>
            
            {/* <br/><br/> */}
            <p> <button  className='btn-all' type="" onClick={handleClearCart}>Clear <FontAwesomeIcon className="icon-detail" icon={faTrashAlt}></FontAwesomeIcon> </button>
                <p>{children}</p>
                </p>
        </div>
    );
};

export default Cart;