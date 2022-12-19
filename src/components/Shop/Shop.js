import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css'

const Shop = () => {

    const products = useLoaderData();
    console.log('products here', products);
    // const [products, setProducts] = useState([]);
    // useEffect( () => {
    //     // fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json')
    //     fetch('products.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         // console.log(data)
    //         setProducts(data)
    //     })
    // }, []);

    useEffect( () => {
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            // console.log(id);
            const addedProduct = products.find(product => product.id === id)
            // console.log(addedProduct);
            if(addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct)
            }
        }
        setCart(savedCart);
    },[products])

    const [cart, setCart] = useState([]);

    const handleAddToCard = (selectedProduct) => {
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if(!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        // const newCart = [...cart, selectedProduct];
        setCart(newCart);
        addToDb(selectedProduct.id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Products 
                        product = {product} 
                        key = {product.id} 
                        handleAddToCard={handleAddToCard}
                        ></Products>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart} handleClearCart={handleClearCart}>
                    <Link to="orders">
                        <button type="" className='btn-review'>Review Order <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon></button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;