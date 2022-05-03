import React, {useContext, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import MainContext from "../context/MainContext";

const CreateProductComp = () => {

    const {updateProductTrigger, setUpdateProductTrigger, user, topic, setTopic} = useContext(MainContext)
    const picRef = useRef()
    const textRef = useRef()
    const titleRef = useRef()
    const [error, setError] = useState(undefined)

    const nav = useNavigate()
    function addTopic () {
        const newTopic = {
            photo: picRef.current.value,
            description: textRef.current.value,
            title: titleRef.current.value,
            owner: {
                email: user.email,
                avatar: user.avatar
            },
            creationTime: new Date()
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newTopic)
        }
        fetch('http://localhost:4000/addTopic', options)
            .then(res => res.json())
            .then(data => {
                if (data.hasOwnProperty('reason')){
                    setError(data.reason)
                }  else {
                    setUpdateProductTrigger(!updateProductTrigger)
                    setError(null)
                    nav('/')

                }
            })
    }
    return (
        <section className='fullPageWrap'>
            <div className='container row'>
                <div className="create-product-container">
                    <h1 className='create-product__title'>Create Topic</h1>
                    <div className="input-wrap create-product-input">
                        <div className="upload-description-wrap">
                            <label htmlFor="title">Title</label>
                            <input type="text" id='title' placeholder='How will you name the new topic?' ref={titleRef}/>
                            <label htmlFor="photo">Icon</label>
                            <input type="text" id='photo' placeholder='Provide picture URL' ref={picRef}/>
                            <label htmlFor="description">What is bugging you?</label>
                            <textarea id='description' className='input__description' placeholder='Open your heart to the internet' ref={textRef}/>
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
                            <p className='btn btn--create-product' onClick={addTopic}>Create</p>
                        </div>




                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateProductComp;