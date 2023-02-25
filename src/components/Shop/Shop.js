import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css'

/*
count : loaded
per page (size) : 10
pages: count /perPage
currentPage(page)
*/

const Shop = () => {

    // const {products, count} = useLoaderData();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0)
    console.log('products here', products);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${page}&size=${size}`)
        .then(res => res.json())
        .then(data => {
            setCount(data.count)
            setProducts(data.products)
        })
    }, [page, size])

    const pages = Math.ceil(count/ size);

    useEffect( () => {
        const storedCart = getStoredCart();
        const savedCart = [];
        const ids = Object.keys(storedCart)
        console.log(ids)
        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(ids)
        })
        .then(res => res.json())
        .then(data => {
            console.log('By ids', data)
            for (const id in storedCart) {
                // console.log(id);
                const addedProduct = data.find(product => product._id === id)
                // console.log(addedProduct);
                if(addedProduct) {
                    const quantity = storedCart[id];
                    addedProduct.quantity = quantity;
                    savedCart.push(addedProduct)
                }
            }
            setCart(savedCart);
        })

    },[products])

    const [cart, setCart] = useState([]);

    const handleAddToCard = (selectedProduct) => {
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if(!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        // const newCart = [...cart, selectedProduct];
        setCart(newCart);
        addToDb(selectedProduct._id)
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
                        key = {product._id} 
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
            {/* For pagination */}
            <div className='pagination'>
                <p>Currently selected page: {page} & size: {size}</p>
                {
                    [...Array(pages).keys()].map(number => <button
                    key={number}
                    className = {page === number && 'selected'}
                    onClick = {() => setPage(number)}
                    >{number}</button>)
                }
                <select onChange={event => setSize(event.target.value)} >
                    <option value="5">5</option >
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;