"use client"

import React, { useState } from "react";
import { BASEURL } from "../page";
import Link from "next/link";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

function Login(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLogin(event){
        event.preventDefault()
        fetch(`${BASEURL}login?username=${username}&password=${password}`, {
            method: 'GET'
            })
            .then( response => { if(response.ok)
            {
                response.json().then(data =>{
                    Cookies.set('user_id', data)
                    const previousPage = Cookies.get('previous-page')
                    if(previousPage == 'appointment-book')
                        redirect('/booking-successful')
                    redirect('/')
                }
            )}

            
    })}

    return(
        <>
                <form onSubmit={handleLogin} className="container">
                    <input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                    <input type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                <p className="mt-3">Don't have an account? <Link className=" underline" href='/Signup'>Sign up here</Link></p>
                </form>
        </>
    )
}

export default Login