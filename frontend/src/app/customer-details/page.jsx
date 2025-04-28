"use client"

import React, {useState} from "react";
import { BASEURL } from "../page"
import Cookies from 'js-cookie';
import { redirect } from "next/navigation";

function CustomerDetails(){

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')

    function HandleCreateCustomer(event){
        event.preventDefault()
        fetch(`${BASEURL}CreateAccount`, { method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body:
            JSON.stringify({ title, first_name, last_name, email, username, password})}).then(
                response => {
                    if (response.ok){
                        response.json().then(
                            customer => {
                                Cookies.set('user_id', customer.id)
                                redirect('/booking-success')
                            }
                        )
                    }
                    else{
                        response.json().then(
                            error => {
                                try{
                                    alert(`${data.detail[0].type}`)
                                }

                                catch{
                                alert(error.detail)
                                }
                            }
                        )
                    }
                }
            )
    }

    return(
        <>
            <div className="grid grid-cols-3 customer-details">
                <form onSubmit={HandleCreateCustomer}>
                    <select placeholder="title" onChange={(e) => setTitle(e.target.value)}>
                        <option value=''>-- Select --</option>
                        <option value='Mr.'>Mr.</option>
                        <option value='Mrs.'>Mrs.</option>
                        <option value='Master'>Master</option>
                        <option value='Miss'>Miss</option>
                        <option value='Ms.'>Ms.</option>
                        <option value='Mx.'>Mx.</option>
                    </select><br />
                    <input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                    <input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
                    <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)}/><br />
                    <button className="big-btn" type="submit">Complete Booking</button>
                </form>
                <p>Or</p>
                <div className="container">
                    {/* previous page cookie ensures correct route after next page */}
                    <button onClick={() => {Cookies.set('previous-page', 'appointment-book'); redirect('/login')}}>Login</button>
                </div>
            </div>
        </>
    )
}

export default CustomerDetails