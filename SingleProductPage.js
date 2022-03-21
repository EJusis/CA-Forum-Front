import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import MainContext from "../context/MainContext";
import {RangeCalendar} from '@mantine/dates';


const SingleProductPage = () => {
    const {allDays, setAllDays, selectedDay, setSelectedDay} = useContext(MainContext)
    const {id} = useParams()
    const [daysTrigger, setDaysTrigger] = useState(false)
    const [value, setValue] = useState([
        new Date(),
        new Date(),
    ]);
    const [yolo, setYolo] = useState(new Date())
    const [rangeCalTrigger, setRangeCalTrigger] = useState(false)
    const [singleProduct, setSingleProduct] = useState()
    console.log(singleProduct)

    useEffect(() => {
        fetch('http://localhost:4000/getsingleproduct/' + id)
            .then(res => res.json())
            .then(data => {
                setSingleProduct(data)
            })
    }, [])
    useEffect(() => {
        fetch('http://localhost:4000/getsingleproduct/' + id)
            .then(res => res.json())
            .then(data => {
                setSelectedDay(data)
            })
    }, [daysTrigger])


    function selectedDays() {
        function getDates(startDate, endDate) {
            const dates = []
            let currentDate = startDate
            const addDays = function (days) {
                const date = new Date(this.valueOf())
                date.setDate(date.getDate() + days)
                return date
            }
            while (currentDate <= endDate) {
                dates.push(currentDate)
                currentDate = addDays.call(currentDate, 1)
            }
            return dates
        }

        const dates = getDates(new Date(value[0].getFullYear(), value[0].getMonth(), value[0].getDate()), new Date(value[1].getFullYear(), value[1].getMonth(), value[1].getDate()))
        dates.forEach(function (date) {
            console.log()
        })
        setAllDays(dates)
        alert('Days confirmed!')
    }

    function bookdays() {
        const obj = {
            allDays: allDays,
            productId: singleProduct._id
        }
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        }
        fetch('http://localhost:4000/bookdays', options)
            .then(res => res.json())
            .then(data => {
                    setSelectedDay(data)
                setDaysTrigger(!daysTrigger)
            }
            )
    }


    return (
        <div className='container'>
            {singleProduct &&
            <div className="singleProduct-top row">
                <div className="product-description-img row">
                    <img src={singleProduct.photo} alt=""/>
                </div>
                <div className="product-description-data">
                    <h1 className="product-city">{singleProduct.city.slice(0,1).toUpperCase() + singleProduct.city.slice(1, singleProduct.city.length)}</h1>
                    <p className="product-description">{singleProduct.description}</p>
                    <h3 className="product-price">${singleProduct.price} <span>/ night</span></h3>


                    <div className="product-dates row" onClick={() => setRangeCalTrigger(true)}>
                        <div className="product-checkin row">
                            <p className='dates--title'>check-in</p>
                            <span>{value[0] && value[0].toLocaleDateString('de-DE')}</span>
                        </div>
                        <div className="product-checkin row">
                            <p className='dates--title'>check-out</p>
                            <span>{value[1] && value[1].toLocaleDateString('de-DE')}</span>
                        </div>
                    </div>
                    <div className='row set-dates' style={{display: rangeCalTrigger ? 'flex' : 'none'}}>
                        <RangeCalendar
                            value={value}
                            onChange={setValue}
                            allowLevelChange={false}
                            className='range-calendar'
                            styles={{
                                calendarBase: {backgroundColor: '#F1F1F1'},
                            }}
                            excludeDate={(date) => date.getDate() === yolo.getDate()}
                        />
                        <div className='row set-dates-button-wrap'>
                            <a className='btn btn-setdate'
                               onClick={() => setRangeCalTrigger(!rangeCalTrigger)}>Close</a>
                            <a className='btn btn-setdate' onClick={selectedDays}>Confirm days!</a>
                            <a className='btn btn-setdate' onClick={bookdays}>Book!</a>
                        </div>

                    </div>
                </div>
            </div>}
        </div>
    );
};

export default SingleProductPage;