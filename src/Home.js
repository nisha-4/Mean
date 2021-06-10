import { React, useState } from 'react';
import "./Home.css";
import Form from "./components/Form";
import List from "./components/List";
import { Route, Redirect, useHistory } from 'react-router-dom';


const Home = () => {
    const [view, setView] = useState(true)
    let history = useHistory()
    const gotoList = (e) => {
        setView(false)
        console.log("list")
    }
    const gotoForm = (e) => {
        setView(true)
    }
    const logout = (e) => {
        localStorage.clear();
        history.push("/")
    }

    return (
        <div>
            <div className="navbar">
                <button onClick={gotoForm}>Form</button>
                <button onClick={gotoList}>List</button>
                <button onClick={logout}>Log out</button>
            </div>
            {
                view ? <Form /> : <List />
            }
        </div>
    )
}

export default Home
