import React from 'react';
import { FaComments } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const TopicComp = ({item}) => {
    const nav = useNavigate()
    return (
        <div className='singleTopic-container'>
            <div className="singleTopic-left-wrap">
                <h1 style={{fontSize: '30px'}}>{item.title}</h1>
                <p className='btn btn--header' style={{fontSize: '16px'}}
                onClick={() => nav(`/topic/${item._id}`)}
                >+ Join</p>
            </div>
            <div className="singleTopic-middle-wrap">
                <h3>u/{item.owner.email}</h3>
                <div className="user-avatar-wrap">
                    <img src={item.owner.avatar} alt=""/>
                </div>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center', fontSize: '20px'}}>
                    <FaComments />
                    <h3>{item.posts.length}</h3>
                </div>
            </div>
            <div className='singleTopic-icon-wrap'>
                <img src={item.photo[0]} alt=""/>
            </div>
        </div>
    );
};

export default TopicComp;