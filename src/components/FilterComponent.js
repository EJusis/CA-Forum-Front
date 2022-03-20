import React, {useContext, useRef, useState} from 'react';
import MainContext from "../context/MainContext";

const FilterComponent = () => {
    const cityRef = useRef()
    const minPrice = useRef()
    const maxPrice = useRef()
    const [error, setError] = useState(undefined)
    const {setProduct} = useContext(MainContext)

    function filterProduct() {
        const filter = {
            filterCity: cityRef.current.value,
            minPrice: minPrice.current.value,
            maxPrice: maxPrice.current.value
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(filter)
        }
        fetch('http://localhost:4000/filterproduct', options)
            .then(res => res.json())
            .then(data => {
                if (data.hasOwnProperty('reason')){
                    setError(data.reason)
                } else {
                    setError(null)
                    setProduct(data)
                }})
    }

    return (
        <div>
            <div className='filter--container row'>
                <div className="filter--unit">
                    <label htmlFor="city">By city</label>
                    <input type="text" id='city' placeholder='Search by city' className='input__search-city' ref={cityRef}/>
                </div>

                <div className="filter--unit">
                    <label htmlFor="price">By price</label>
                    <div className="row price-range">
                        <input type="number" id='price' placeholder='Min price' ref={minPrice}/>
                        <input type="number" id='price' placeholder='Max price' ref={maxPrice}/>
                    </div>
                </div>
                <p className='btn btn--filter__inner' onClick={filterProduct}>Filter</p>
            </div>
            {error ?
                <div className="error-window filter__error">
                    <p>{error}</p>
                </div>
                : null
            }
        </div>

    );
};

export default FilterComponent;