"use client"

import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BASEURL } from "../page";
import { redirect } from "next/navigation";

function Profile(){

    const [user, setUser] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')
    const [username, setUsername] = useState('')
    const [id, setId] = useState('')
    const [isMrSelected, setMrSelected] = useState('')
    const [isMrsSelected, setMrsSelected] = useState('')
    const [isMsSelected, setMsSelected] = useState('')
    const [isMissSelected, setMissSelected] = useState('')
    const [isMasterSelected, setMasterSelected] = useState('')
    const [isMxSelected, setMxSelected] = useState('')

    const handleClick = () => {
        setIsDisabled(!isDisabled)
    };
    
    const UpdateDetails = (event) =>{
        event.preventDefault()
        console.log('id: ', id)
        setUsername(user.username)
        if (title == '' || !title)
            setTitle(user.title)
        if(first_name == '' || !first_name)
            setFirstName(user.first_name)
        if(last_name == '' || !first_name)
            setLastName(user.last_name)
        if(email == '' || !email)
            setEmail(user.email)
        fetch(`${BASEURL}updateAccount`, {method : 'PUT', headers:{
            'Content-Type': 'application/json'
        }, body: JSON.stringify({username, title, first_name, last_name, email, id})})

        setIsDisabled(!isDisabled)
    }
    
    const handleLogout = () =>{
        Cookies.remove('user_id')
        redirect('/')
    }
    
    useEffect(() =>{
        const id = Cookies.get('user_id')
        fetch(`${BASEURL}GetAccount/${id}`, { method: 'GET'}).then(
            response =>{
                if(response.ok){
                    setLoggedIn(true)
                    response.json().then(data => {
                        setUser(data)
                        setId(data.id)
                        //set selected title to user's current title
                        if(data.title == 'Mr.')
                            setMrSelected('selected')
                        if(data.title == 'Mrs.')
                            setMrsSelected('selected')
                        if(data.title == 'Ms.')
                            setMsSelected('selected')
                        if(data.title == 'Miss')
                            setMissSelected('selected')
                        if(data.title == 'Mx.')
                            setMxSelected('selected')
                        if(data.title == 'Master')
                            setMasterSelected('selected')
                    })
                }
            }
        )
    }, [])
    
    return(
        <>
            { loggedIn? (
                <div className=" grid grid-cols-2">
                    <div className="user-details">
                        <h1>{user.username}'s Profile</h1>
                        <select id='user-title' disabled={isDisabled} onChange={(e) => setTitle(e.target.value)}>
                                <option selected={isMrSelected} value='Mr.'>Mr.</option>
                                <option selected={isMrsSelected} value='Mrs.'>Mrs.</option>
                                <option selected={isMasterSelected}value='Master'>Master</option>
                                <option selected={isMissSelected} value='Miss'>Miss</option>
                                <option selected={isMsSelected} value='Ms.'>Ms.</option>
                                <option selected={isMxSelected} value='Mx.'>Mx.</option>
                        </select><br />
                        <input defaultValue={user.first_name} disabled={isDisabled} onChange={(e) => setFirstName(e.target.value)}/><br />
                        <input defaultValue={user.last_name} disabled={isDisabled} onChange={(e) => setLastName(e.target.value)}/><br />
                        <input defaultValue= {user.email}  disabled={isDisabled} onChange={(e) => setEmail(e.target.value)}/><br/>
                        {isDisabled ? (<button  type='button' className='user-btn' onClick={handleClick}>Change Details</button>) : (<button className="user-btn" onClick={UpdateDetails}>Save</button>)}
                        <button className='user-btn' onClick={handleLogout}>Log Out</button>
                    </div>
                    <div className="container m-0 p-0">
                        <button onClick={() => redirect('/appointments')} className="big-btn">Appointments</button>
                        <button onClick={() => redirect('/addresses')} className="big-btn">Addresses</button>
                    </div>
                </div>
            ) : (<h1>You must be loggged in to view this page</h1>)}
        </>
        
    )
}

export default Profile