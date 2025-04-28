"use client"

import React from "react";
import { useEffect } from "react";
import { BASEURL } from "../page";
import Cookies from "js-cookie";
import { useState } from "react";
import { redirect } from "next/navigation";

function Addresses(){
    
    const [addresses, setAddresses] = useState([])

    useEffect(() =>{
        const id = Cookies.get('user_id')
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
        <div>
            <div className="appointment-address-view grid grid-cols-2">
                {addresses.length != 0 ? (addresses.map( address =>
                    <div>
                        <p>{address.unit_number || 'N/A'}</p>
                        <p>{address.line_1}</p>
                        <p>{address.line_2 || 'N/A'}</p>
                        <p>{address.city}</p>
                        <p>{address.postcode}</p>
                    </div>)
                    ) : (<p>No Addresses Linked to this account</p>)
                }
            </div>
            <div className="flex justify-center"><button onClick={() => {redirect('/create-address')}}className="address-btn">Create an address</button></div>
        </div>       
    )
}

export default Addresses