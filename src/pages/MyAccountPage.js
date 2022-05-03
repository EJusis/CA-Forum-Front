import React from 'react';
import {useParams} from "react-router-dom";
import MyAccountComp from "../components/MyAccountComp";

const MyAccountPage = () => {
    const {email} = useParams()
    return (
        <div>
            <MyAccountComp email={email}/>
        </div>
    );
};

export default MyAccountPage;