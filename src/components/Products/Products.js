import React from 'react';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'


const Products = (props) => {
    const {handleAddToCard, product} = props;
    const {img, name, price, seller, ratings} = product;
    console.log(img)

    return (
        <div className='product'>
            <img src={img} alt=""/>
            <div className='product-info'>
                <p className='product-name'>{name}</p>
                <p className='product-name'>Price: ${price}</p>
                <p><small>Manufacturer: {seller}</small></p>
                <p><small>Rating: {ratings} star</small></p>
            </div>
            <button onClick = {()=>handleAddToCard(product)} type="" className='btn-cart'>
                <p>Add to Cart <span><FontAwesomeIcon icon={faCartPlus} /></span></p>
            </button>
        </div>
    );
};

export default Products;