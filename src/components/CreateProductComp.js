import React, {useContext, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import MainContext from "../context/MainContext";

const CreateProductComp = () => {

    const {updateProductTrigger, setUpdateProductTrigger} = useContext(MainContext)
    const picRef = useRef()
    const cityRef = useRef()
    const priceRef = useRef()
    const textRef = useRef()
    const [error, setError] = useState(undefined)

    const nav = useNavigate()
    function addProduct () {
        const newProduct = {
            photo: picRef.current.value,
            city: cityRef.current.value,
            price: priceRef.current.value,
            description: textRef.current.value
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newProduct)
        }
        fetch('http://localhost:4000/addproduct', options)
            .then(res => res.json())
            .then(data => {
                if (data.hasOwnProperty('reason')){
                    setError(data.reason)
                }  else {
                    setError(null)
                    alert('Product successfully created!')
                    setUpdateProductTrigger(!updateProductTrigger)
                    nav('/')
                    console.log(data)
                }
            })
    }
    return (
        <section className='fullPageWrap'>
            <div className='container row'>
                <div className="create-product-container">
                    <h1 className='create-product__title'>Upload Product</h1>
                    <div className="input-wrap create-product-input">
                        <div className="upload-description-wrap">
                            <label htmlFor="photo">Photo URL</label>
                            <input type="text" id='photo' placeholder='Provide product picture URL' ref={picRef}/>
                            <label htmlFor="city">City</label>
                            <input type="text" id='city' placeholder='City' ref={cityRef}/>
                            <label htmlFor="price">Price in $</label>
                            <input type="number" id='price' placeholder='Product price' ref={priceRef}/>
                            <label htmlFor="description">Product description</label>
                            <textarea id='description' className='input__description' placeholder='Write a detailed description' ref={textRef}/>
                            {error ?
                                <div className="error-window error-create-product">
                                    <p>{error}</p>
                                </div>
                                : null
                            }
                            <span className="line"/>
                        </div>
                        <div className='create-product__bottom row'>
                            <p className='to-login'><Link to='/'>Cancel</Link></p>
                            <p className='btn btn--create-product' onClick={addProduct}>Create</p>
                        </div>




                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateProductComp;