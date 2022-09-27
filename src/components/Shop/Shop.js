import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css'

const Shop = () => {

    const [products, setProducts] = useState([]);
    useEffect( () => {
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json')
        // fetch('products.json')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setProducts(data)
        })
    }, [])

    const [cart, setCart] = useState([]);
    const handleAddToCard = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;