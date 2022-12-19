import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, NavLink, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'

const Orders = () => {
    const {products, initialCart} = useLoaderData();
    const [cart, setCart] = useState(initialCart);
    // console.log(products)
    const handleRemoveItem = (id) => {
        // console.log(id)
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="orders-container">'
                {/* show only cart items */}
                {
                    cart.map(product => <ReviewItem key = {product.key} product={product} handleRemoveItem={handleRemoveItem}></ReviewItem>)
                }
                {
                    cart.length === 0 && <h2 className='text-center'>No Items For Review. Please <Link to='/'>Shop More</Link></h2>
                }
            </div>    
            <div className="cart-container">
                <Cart handleClearCart= {handleClearCart} cart = {cart}>
                    <Link to='/shipping'>
                        <button  className='btn-review' type="">Proceed Shipping <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon></button>
                    </Link>
                </Cart>
            </div>    
        </div>
    );
};

export default Orders;