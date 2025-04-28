"use client"

import react, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { BASEURL } from "../page";
import { redirect } from "next/navigation"

function Navbar (){

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() =>{
        const id = Cookies.get('user_id')
        fetch(`${BASEURL}GetAccount/${id}`, { method: 'GET'}).then(
            response =>{
                if(response.ok){
                    setLoggedIn(true)
                }
            }
        )
    }, [])
    return(
        <nav>
            <ul>
                <li><Link href='/'><img alt='Logo' src='logo.png' id="logo"></img></Link></li>
                <li><Link href='/appointment-book'>Book an appointment</Link></li>
                <li><Link href='/green-energy-products'>Green Energy Products</Link></li>
                {loggedIn ? (<Link href='/profile'><img alt='Your Profile' src='profile-icon.png'/></Link>) :
                (
                    <button onClick= {() => {redirect('/login')}}id='login-button'>Login</button>
                )}
            </ul>
        </nav>
    )
}

export const NavBar = Navbar;