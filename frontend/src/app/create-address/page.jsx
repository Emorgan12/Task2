"use client"

import React, {useState, useEffect} from "react";
import Cookies from 'js-cookie'
import { BASEURL } from "../page";
import { redirect } from "next/navigation";

function Create_address(){

    const [customer_id, setId] = useState(null)
    const [unit_number, setUnitNum] = useState('')
    const [line_1, setLine1] = useState('')
    const [line_2, setLine2] = useState('')
    const [city, setCity] = useState('')
    const [postcode, setPostcode] = useState('')
    const [next, setNext] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    
        useEffect(() =>{
            const id = Cookies.get('user_id')
            fetch(`${BASEURL}GetAccount/${id}`, { method: 'GET'}).then(
                response =>{
                    if(response.ok){
                        response.json().then( user => {
                            setId(user.id)
                            setLoggedIn(true)
                        })
                    }
                })
        }, [])

        const handleAddressCreate = (event) => {
            event.preventDefault()
            
            //prevent error from missing unit number
            if (!unit_number){
                setUnitNum('')
            }

            //prevent error from missing line 2
            if(!line_2){
                setLine2('')
            }

            //ensures all required fields are filled out
            if(!line_1 || !city || !postcode){
                alert('Fill out all required fields')
            }

            //if null check does not fails, create address
            else{
                fetch(`${BASEURL}CreateAddress`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({
                        unit_number, line_1, line_2, city, postcode, customer_id
                    })
                }).then(response => {
                        if (response.ok) {
                            response.json().then(data => {
                                if(Cookies.get('previous-page') == 'appointment-book'){
                                    Cookies.set('address_id', data.id)
                                    if (loggedIn)
                                        redirect('/booking-success')
                                    else
                                        redirect('/customer-details')
                                
                                }
                                redirect('/addresses')
                            })
                        }
                        else{
                            response.json().then(error => {
                                try{
                                alert(error.detail[0].msg)
                                }
                                catch{
                                    alert(error.detail)
                                }
                            })
                        }
                    })
                }
            }
        
        

    return(
        <form className="container" onSubmit={handleAddressCreate}>
            <input placeholder="Unit Number" onChange={(e) => setUnitNum(e.target.value)}/>
            <input  placeholder="Line 1*" onChange={(e) => setLine1(e.target.value)}/>
            <input placeholder="Line 2" onChange={(e) => setLine2(e.target.value)}/>
            <input placeholder="City*" onChange={(e) => setCity(e.target.value)}/>
            <input placeholder="Postcode*" onChange={(e) => setPostcode(e.target.value)}/><br />
            <button type="submit" className=" text-5xl">Create Address</button>
            <p> * = Required</p>
        </form>
    )
}

export default Create_address