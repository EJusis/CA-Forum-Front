import React, {useEffect, useState} from 'react';
import MyAccountCardComp from "./MyAccountCardComp";

const MyAccountComp = ({email}) => {
    const [myTopic, setMyTopic] = useState(null)

    useEffect(() => {
            fetch(`http://localhost:4000/getMyTopics/`+email)
                .then(res => res.json())
                .then(data => {
                    if (data.hasOwnProperty('reason')){
                        console.log(data.reason)
                    }  else {
                        setMyTopic(data)
                    }
                })
        },
        [])

    return (
        <div>
            <h1 className="title" style={{textAlign: 'center', margin: '10px 0'}}>Your created topics</h1>
            <div className="myAccount-card-wrap">
                {myTopic?.map((x,i) =>
                    <MyAccountCardComp key={i} topic={x} />
                )}


            </div>

        </div>
    );
};

export default MyAccountComp;