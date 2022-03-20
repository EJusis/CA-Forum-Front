import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import MainContext from "../context/MainContext";

const Navbar = () => {
    const {user, setUser} = useContext(MainContext)
    const nav = useNavigate()
    const [adminTrigger, setAdminTrigger] = useState(false)

    function logOut() {
        localStorage.clear();
        setUser(undefined)
        nav('/login')
        setAdminTrigger(false)
    }

    useEffect(() => {
        if (user) {
            user.isAdmin ? setAdminTrigger(true) : setAdminTrigger(false)
        }
    }, [user])
    return (
        <div className='navbar row'>
            <a onClick={() => nav('/')}>
                <img src="https://logodix.com/logo/324487.png" className='logo' alt=""/>
            </a>
            {user &&
            <p>Logged as: {user.email} ({adminTrigger ? 'admin' : 'guest'})</p>
            }

            <div className="navbar-buttons row">
                <p className='btn btn--header'
                   style={{display: adminTrigger ? 'block' : 'none'}}
                   onClick={() => nav('/createProduct')}>Upload</p>
                <p className='btn btn--header' onClick={logOut} style={{display: !user ? 'none' : 'block'}}>Logout</p>
            </div>

        </div>
    );
};

export default Navbar;