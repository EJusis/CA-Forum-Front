import React, {useContext, useState} from 'react';
import MainContext from "../context/MainContext";
import SignUpComp from "./SignUpComp";
import TopicComp from "./TopicComp";


const HomePageComp = () => {
    const {topic, user} = useContext(MainContext)
    const [filterTrigger, setFilterTrigger] = useState(false)
    return (
        <>
            {!Boolean(user) && <SignUpComp/>}
            <div className="container">
                <div style={{display: user ? 'block' : 'none'}}>
                    <h1 className="homepage__title">
                        There's lots to discuss
                    </h1>
                </div>
                {topic?.map((x, i) =>
                    <TopicComp item={x} key={i}/>
                )}


            </div>
        </>
    );
};

export default HomePageComp;