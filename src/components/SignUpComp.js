import React, {useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

const SignUpComp = () => {
    const emailRef = useRef()
    const pass1Ref = useRef()
    const pass2Ref = useRef()
    const adminRef = useRef()
    const [error, setError] = useState(undefined)
    const nav = useNavigate()

    function addUser() {
        const newObj = {
            email: emailRef.current.value,
            pass1: pass1Ref.current.value,
            pass2: pass2Ref.current.value,
        }
        console.log(newObj)
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newObj)
        }
        fetch('http://localhost:4000/adduser', options)
            .then(res => res.json())
            .then(data => {
                if (data.hasOwnProperty('reason')){
                    setError(data.reason)
                }  else {
                    setError(null)
                    alert('Account successfully registered!')
                    nav('/login')
                }
            })

    }


    return (
        <section className='fullPageWrap'>
            <div className='container logreg row'>
                <div className="picture-aside picture-signup">
                    <div className="img1"/>
                </div>
                <div className="text-aside">
                    <h1 className='signup__title'>Register your account</h1>
                    <div className="input-wrap signup-input">
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' placeholder='Please enter your email' ref={emailRef}/>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' placeholder='Please enter your password' ref={pass1Ref}/>
                        <label htmlFor="password2">Confirm Password</label>
                        <input type="password" id='password2' placeholder='Confirm your password' ref={pass2Ref}/>
                        <div className='signup__bottom  row'>
                            <p className='to-login'><Link to='/login'>Already Registered?</Link></p>
                            <p className='btn' onClick={addUser}>Submit</p>
                        </div>
                        {error ?
                            <div className="error-window">
                                <p>{error}</p>
                            </div>
                            : null
                        }

                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUpComp;