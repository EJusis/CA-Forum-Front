import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import {useEffect, useState} from "react";
import MainContext from "./context/MainContext";
import Navbar from "./components/Navbar";
import UploadProductPage from "./pages/UploadProductPage";
import SingleProductPage from "./pages/SingleProductPage";

function App() {
    const [user, setUser] = useState()
    const [product, setProduct] = useState([])
    const [updateProductTrigger, setUpdateProductTrigger] = useState(false)
    const [allDays, setAllDays] = useState([])
    const [selectedDay, setSelectedDay] = useState([])




    useEffect(() => {
        if (localStorage.getItem('trigger')) {
            fetch(`http://localhost:4000/localStorage/${localStorage.getItem('email')}`)
                .then(res => res.json())
                .then(data => {
                    setUser(data)
                })
        }
        fetch(`http://localhost:4000/getallproducts/`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:4000/getallproducts/`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
            })
    }, [updateProductTrigger])

    return (
        <div className="container">
            <MainContext.Provider value={{user, setUser, product, setProduct, updateProductTrigger, setUpdateProductTrigger, allDays, setAllDays, selectedDay, setSelectedDay}}>
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<HomePage/>}/>
                        <Route path='/signUp' element={<SignUpPage/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path='/createProduct' element={<UploadProductPage/>}/>
                        <Route path='/product/:id' element={<SingleProductPage/>}/>
                    </Routes>
                </BrowserRouter>
            </MainContext.Provider>


        </div>
    );
}

export default App;
