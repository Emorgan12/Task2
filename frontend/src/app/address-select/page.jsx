"use client"

import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { BASEURL } from "../page";
import { redirect } from "next/navigation";

function AddressSelect(){

    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    // runs once when page is loaded
    useEffect(() =>{
        // checks user is logged in
        const id = Cookies.get('user_id')
        fetch(`${BASEURL}GetAccount/${id}`, { method: 'GET'}).then(
            response =>{
                if(response.ok){
                    setLoggedIn(true)
                }
            }
        )

        // gets user address(es)
        fetch(`${BASEURL}GetCustomerAddress/${id}`).then(
            response =>{
                if(response.ok)(
                    response.json().then(data => {
                        setAddresses(data)
                    })
                )

            } 
        )
        
    },[])

    return(
        <>
            {loggedIn ? (
                <div className="container">
                    {addresses.length != 0 ? (
                        <div>
                            <select onChange={(e) => {setSelectedAddress(e.target.value)}}>
                                <option value=''>Select An Address</option>
                                {addresses.map(address => (
                                    <option key={address.id} value={address.id}>{address.line_1}</option>
                                ))}
                            </select>
                            <button onClick={() => {Cookies.set('address_id', selectedAddress); redirect('/booking-success')}} className=" text-5xl">Select Address</button>
                        </div>) : (
                        <p>No Addresses Found</p>
                    )}
                    <div className="container"><button onClick={() => {Cookies.set('previous-page', 'appointment-book');redirect('/create-address')}} className=" text-5xl">Create an address</button></div>
                </div>
            ) : (
                <p className="big-txt">You must be logged in to view this page</p>
            )}
        </>
    )
}

export default AddressSelect