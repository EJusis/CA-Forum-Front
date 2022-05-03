import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import {useEffect, useState} from "react";
import MainContext from "./context/MainContext";
import Navbar from "./components/Navbar";
import UploadProductPage from "./pages/UploadProductPage";
import TopicInnerPage from "./pages/TopicInnerPage";
import MyAccountPage from "./pages/MyAccountPage";


function App() {
    const [user, setUser] = useState()
    const [topic, setTopic] = useState()
    const [updateProductTrigger, setUpdateProductTrigger] = useState(false)




    useEffect(() => {
        if (localStorage.getItem('trigger')) {
            fetch(`http://localhost:4000/localStorage/${localStorage.getItem('email')}`)
                .then(res => res.json())
                .then(data => {
                    setUser(data)
                })
        }
        fetch(`http://localhost:4000/getAllTopics/`)
            .then(res => res.json())
            .then(data => {
                setTopic(data)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:4000/getAllTopics/`)
            .then(res => res.json())
            .then(data => {
                setTopic(data)
            })
    }, [updateProductTrigger])

    return (
        <div className="container">
            <MainContext.Provider value={{user, setUser, updateProductTrigger, setUpdateProductTrigger, topic, setTopic}}>
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route path='/' element={<HomePage/>}/>
                        <Route path='/signUp' element={<SignUpPage/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path='/createProduct' element={<UploadProductPage/>}/>
                        <Route path='/topic/:id' element={<TopicInnerPage/>}/>
                        <Route path='/myAccount/:email' element={<MyAccountPage/>}/>
                    </Routes>
                </BrowserRouter>
            </MainContext.Provider>


        </div>
    );
}

export default App;
