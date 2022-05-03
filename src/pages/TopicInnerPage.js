import React from 'react';
import TopicInnerComp from "../components/TopicInnerComp";
import {useParams} from "react-router-dom";

const TopicInnerPage = () => {
    const {id} = useParams()
    return (
        <div>
            <TopicInnerComp id={id}/>
        </div>
    );
};

export default TopicInnerPage;