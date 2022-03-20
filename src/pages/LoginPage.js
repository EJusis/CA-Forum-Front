import React, {useState} from 'react';
import LoginComp from "../components/LoginComp";

const LoginPage = ({setUser}) => {
    return (
        <>
            <LoginComp setUser={setUser}/>
        </>
    );
};

export default LoginPage;