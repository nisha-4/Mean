import { React, useState, useEffect } from 'react'
import Users from "./Users"
import axios from "axios"
import "./List.css"

const List = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState("")

    const token = localStorage.getItem("token")
    const header = `Authorization:Bearer ${token}`;
    useEffect(() => {
        const fetchUsers = async () => {
            console.log(token)
            const res = await axios({
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Bearer ${token}`
                },
                url: "http://localhost:4000/admin/allUsers",
            }).then((res) => {
                setUsers(res.data.data[0]);
                console.log(res.data.data[0]);
            })
                .catch(error => console.log(error));
        };
        fetchUsers();

    }, []);
    const getUser = async (e) => {
        setUser(e.target.value)
        deleteUser()
        deleteUser()

    }

    const deleteUser = async (e) => {
        console.log(user)
        const res = await axios({
            method: "delete",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Authorization': `Bearer ${token}`
            },
            url: `http://localhost:4000/admin/deleteUser/${user}`,
        }).then((res) => {
            console.log(res)
            setUser(res.data.data[0]._id)
            window.location.reload()
            setUser(e.target.value)
        })
            .catch(error => console.log(error));
    };


    return (
        <div className="list">
            <div className="head">
                <h2>Name</h2>
                <h2>Email</h2>
                <h2>Phone</h2>
                <h2>Address</h2>
            </div>
            <div className="user-list">
                {
                    users != [] ?
                        users.map(user => {
                            return (
                                <div className="user">
                                    <div className="userAndBtn">
                                        <button value={user._id} onClick={getUser}>X</button>

                                        <Users
                                            name={user.name}
                                            email={user.email}
                                            phone={user.phone}
                                            address={user.address}
                                        />
                                    </div>

                                </div>
                            )
                        }) : <h2>no users found</h2>
                }
            </div>
        </div>
    )
}

export default List
