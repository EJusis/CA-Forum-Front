import React, {useContext, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import MainContext from "../context/MainContext";

const LoginComp = () => {
    const {setUser, user} = useContext(MainContext)

    const emailRef = useRef()
    const passRef = useRef()
    const stayLoggedRef = useRef()
    const [error, setError] = useState(undefined)
    const nav = useNavigate()

    function loginUser() {
        const user = {
            email: emailRef.current.value,
            pass: passRef.current.value,
            stayLogged: stayLoggedRef.current.checked
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }
        fetch('http://localhost:4000/loginuser', options)
            .then(res => res.json())
            .then(data => {
                if (data.hasOwnProperty('reason')){
                    setError(data.reason)
                } else {
                    setError(null)
                    setUser(data.isInDB)
                    if (user.stayLogged) {
                        localStorage.setItem("trigger", user.stayLogged)
                        localStorage.setItem("email", user.email)
                        nav('/')
                    } else {
                        localStorage.clear();
                        nav('/')
                    }
                }
            })
    }


    return (
        <section className='fullPageWrap'>
            <div className='container logreg row'>

                <div className="text-aside">
                    <h1 className='login__title'>Sign in</h1>
                    <div className="input-wrap login-input">
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' placeholder='Please enter your email' ref={emailRef}/>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' placeholder='Please enter your password' ref={passRef}/>
                        <div className="login__checkbox row">
                            <label className="switch">
                                <input type="checkbox" ref={stayLoggedRef}/>
                                    <span className="slider round"/>
                            </label>
                            <label>Stay signed in?</label>
                        </div>
                        <div className='signup__bottom  row'>

                            <p className='btn' onClick={loginUser}>Login</p>
                        </div>
                    </div>
                    {error ?
                        <div className="error-window">
                            <p>{error}</p>
                        </div>
                        : null
                    }
                </div>
                <div className="picture-aside picture-signup">
                    <div className="img2"/>
                </div>
            </div>
        </section>
    );
};

export default LoginComp;