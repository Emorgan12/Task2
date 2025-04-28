"use client"

import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { BASEURL } from "../page";

function Appointments(){

    const [appointments, setAppointments] = useState([])

    useEffect(() =>{
            //get user appointments
            const id = Cookies.get('user_id')
            fetch(`${BASEURL}GetCustomerAppointment/${id}`).then(
                response =>{
                    if(response.ok)(
                        response.json().then(data => {
                            setAppointments(data)
                        })
                    )
    
                } 
            )
        },[])

    return(
        <div>
            <h1 className=" text-center m-10">Appointments</h1>
            {appointments.length != 0 ?
                (<div>
                    <div className="grid grid-cols-2 appointment-address-view">
                        {appointments.map(appointment =>
                            <div key={appointment.id}>
                                <p>{appointment.staff_member}</p>
                                <p>{appointment.date} {appointment.time}</p>
                                <p>{appointment.appointment_type}</p>
                                <p>{appointment.product}</p>
                            </div>
                        )}
                    </div>
                    <div className=" flex justify-center"><button className="address-btn">Book Appointment</button></div>
                </div>)
                :(
                    <h1>No Appointments Found</h1>
                )
            }
        </div>
    )
}

export default Appointments