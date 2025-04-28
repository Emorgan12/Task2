"use client"

import Link from "next/link";
import React, { useState } from "react";
import { BASEURL } from "../page";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

function Signup(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')

    function handleSignup(event){
        event.preventDefault()
        if(!username || !title || !first_name || !last_name || !password || !email){
            alert("All inputs are required")
        }
        else{

            fetch(`${BASEURL}CreateAccount`,{ method:'POST', headers:{
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                username, title, first_name, last_name, password, email
            }) }).then(
                response => {
                    if(response.ok){
                        response.json().then( data => {
                            Cookies.set('user_id', data.id )
                            const previousPage = Cookies.get('previous-page')
                            if(previousPage == 'appointment-book')
                                redirect('/booking-success')
                            redirect('/')})
                        }
                    else{
                        response.json().then(
                            error =>{
                                alert(error.detail)
                            }
                        )
                    }
                    }
                )
        }
    }

    return(
        <div className="container"> 
            <form className="sign-up" onSubmit={handleSignup}>
                <select placeholder="title" onChange={(e) => setTitle(e.target.value)}>
                    <option value=''>-- Select --</option>
                    <option value='Mr.'>Mr.</option>
                    <option value='Mrs.'>Mrs.</option>
                    <option value='Master'>Master</option>
                    <option value='Miss'>Miss</option>
                    <option value='Ms.'>Ms.</option>
                    <option value='Mx.'>Mx.</option>
                </select><br />
                <div className="one-line">
                    <input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                    <input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <input type='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                <input type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link href='/login' className="underline">Log in here</Link></p>
            </form>
        </div>
    )
}

export default Signup