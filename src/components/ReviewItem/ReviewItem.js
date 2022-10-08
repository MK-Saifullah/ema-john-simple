import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ReviewItem.css'

const ReviewItem = ({product, handleRemoveItem}) => {
    const {name, price, img, quantity,shipping, id} = product;
    return (
        <div className='review-item'>
            <div>
                <img src={img} alt=''/>
            </div>
            <div className='review-details-container'>
                <div className='review-details'>
                    <p>{name}</p>
                    <p><small>Total Price: ${price}</small></p>
                    <p><small>Shipping: ${shipping}</small></p>
                    <p><small>Total items: {quantity}</small></p>
                </div>
                <div className='delete-container'>
                    <button onClick = {()=> handleRemoveItem(id)} className='btn-icon' type=""><FontAwesomeIcon className="icon-detail" icon={faTrashAlt}></FontAwesomeIcon></button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;