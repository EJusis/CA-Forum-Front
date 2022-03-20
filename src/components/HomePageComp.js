import React, {useContext, useState} from 'react';
import MappedProductComponent from "./MappedProductComponent";
import MainContext from "../context/MainContext";
import FilterComponent from "./FilterComponent";
import SignUpComp from "./SignUpComp";


const HomePageComp = () => {
    const {product, user} = useContext(MainContext)
    const [filterTrigger, setFilterTrigger] = useState(false)
    return (
        <>
            {!Boolean(user) && <SignUpComp/>}
            <div className="container">
                <p className='btn btn--filter' style={{display: !user ? 'none' : 'block'}} onClick={() => setFilterTrigger(!filterTrigger)}>Start your search</p>
                {filterTrigger && <FilterComponent/>}
                <div style={{display: user ? 'block' : 'none'}}>
                    <h1 className="homepage__title">
                        Inspiration for your next booking
                    </h1>
                    <div className="products-map-wrap row">
                        {product.map?.((x, i) =>
                            <MappedProductComponent key={i} x={x}/>
                        )}
                    </div>
                </div>

            </div>
        </>
    );
};

export default HomePageComp;