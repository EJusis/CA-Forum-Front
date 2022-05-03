import React from 'react';
import { Button } from '@mantine/core';

const OwnerPostComp = ({singleTopic, setOpened}) => {

    return (
        <div className='ownerPost-container'>
            <div className="ownerPost-top">
                <p style={{fontSize: '12px'}}>Posted by: <span style={{fontSize: '13px'}}>u/{singleTopic?.owner.email}</span></p>
                <div className="ownerPost-avatar">
                    <img src={singleTopic?.owner.avatar} alt=""/>
                </div>
            </div>
            <h1 className='ownerPost-header'>{singleTopic?.title}</h1>
            <div className="ownerPost-icon-wrap">
                <img src={singleTopic?.photo[0]} alt=""/>
            </div>
            <div className="ownerPost-description-wrap">
                {singleTopic?.description}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci animi, aperiam aspernatur consequatur dignissimos doloribus eos, est exercitationem expedita facilis hic ipsum minus modi molestiae nisi odit optio perspiciatis praesentium provident quod recusandae rem sint. Alias commodi consequuntur dolore fuga itaque libero, minus quam unde? Consequatur nam omnis repudiandae.
            </div>
            <Button
                onClick={() => setOpened(true)}
                variant="light" size="md" uppercase style={{backgroundColor: '#2E375D', color: '#FFF', margin: '10px 0'}}>
                + Add comment
            </Button>
        </div>
    );
};

export default OwnerPostComp;