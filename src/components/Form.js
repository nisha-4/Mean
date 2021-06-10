import { React, useState } from 'react';
import "./Form.css";
import axios from "axios";

const Form = () => {
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [address, setAddress] = useState()

    const handleName = (e) => {

        setName(e.target.value)
    }
    const handleEmail = (e) => {

        setEmail(e.target.value)
    }
    const handlePhone = (e) => {
        setPhone(e.target.value)
    }
    const handleAddress = (e) => {

        setAddress(e.target.value)
    }
    const token = localStorage.getItem("token")
    const SubmitForm = async (e) => {
        console.log(token)
        e.preventDefault()
        axios({
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Authorization': `Bearer ${token}`
            },
            url: "http://localhost:4000/admin/createUser",
            data: {
                name, email, phone, address
            }
        }).then((response) => {
            alert("user registered")
            setName("");
            setEmail("")
            setPhone("")
            setAddress("")
        })
            .catch(error => console.log(error));
    };
    console.log(name, email, phone, address)
    return (
        <div>
            {/* tabs =====================*/}
            <div>

            </div>
            <div className="text-center form-signin">
                <form className="form" >
                    <h1 className="h3 mb-3 fw-normal">User Registeration form</h1>
                    <input
                        type="text"
                        name="name"
                        className="form-control top"
                        placeholder="User Name"
                        required autofocus
                        value={name}
                        onChange={handleName}
                    />
                    <input
                        type="text"
                        name="phone"
                        className="form-control middle"
                        placeholder="Phone"
                        required
                        value={phone}
                        onChange={handlePhone}
                    />
                    <input
                        type="text"
                        name="email"
                        className="form-control middle"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={handleEmail}
                    />
                    <input
                        type="text"
                        name="address"
                        className="form-control middle"
                        placeholder="Address"
                        required
                        value={address}
                        onChange={handleAddress}
                    />
                    <div className="checkbox mb-3">
                    </div>
                    <button
                        className="w-100 btn btn-lg btn-primary"
                        onClick={SubmitForm}
                    >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Form



