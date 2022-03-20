import React from 'react';
import {useNavigate} from "react-router-dom";

const MappedProductComponent = ({x}) => {
    const nav = useNavigate()
    const singlePage = () => {
        nav(`/product/${x._id}`)
    }
    return (
        <div className='product-card row' onClick={singlePage}>
            <img src={x.photo} alt="" className="product-card-img"/>
            <div className="product-card--bottom">
                <h1 className='product-card--title'>{x.city}</h1>
                <p className='product-card--price'>Price per day: {x.price}$</p>
            </div>
        </div>
    );
};

export default MappedProductComponent;