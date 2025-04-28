"use client"

import React, { use, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BASEURL } from "../page";
import Calendar from "react-calendar";
import ReactCalendar from "rc-calendar";
import "@vaadin/time-picker/theme/lumo/vaadin-time-picker.js";
import Link from "next/link";
import { redirect } from "next/navigation";

function AppointmentBook(){

    const [date, setDate] = useState('1970-01-01')
    const [time, setTime] = useState('')
    const [appointment_type, setType] = useState('')
    const [product, setProduct] = useState('')
    const [consultation_id, setConsultation] = useState('')
    const [isDisabled, setDisabled] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [consultations, setConsultations] = useState([])

    useEffect(() =>{
        if (appointment_type == 'Installation')
            setDisabled(false)
        else
            setDisabled(true)
    })

    useEffect(() =>{
        const installs = []
        const id = Cookies.get('user_id')
                fetch(`${BASEURL}GetAccount/${id}`, { method: 'GET'}).then(
                    response =>{
                        if(response.ok){
                            setLoggedIn(true)
                        }
                    }
                )
        fetch(`${BASEURL}GetCustomerAppointment/${id}`).then(
            response => {
                if(response.ok){
                    response.json().then(
                        data =>
                        {
                            data.forEach((consultation, index) => {
                                if(consultation.appointment_type == 'Installation')
                                    installs.push(index)
                            });
                            installs.forEach((install) => {
                                delete data[install]
                            })
                            
                            setConsultations(data)
                        }
                    )
                }
            }
        )
    }, [])

    const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate()
    const addMonths = (input, months) => {
    const date = new Date(input)
    date.setDate(1)
    date.setMonth(date.getMonth() + months)
    date.setDate(Math.min(input.getDate(), getDaysInMonth(date.getFullYear(), date.getMonth()+1)))
    return date
    }

    const addHours = (input, hours) => {
        const date = new Date(input)
        date.setHours(date.getHours() + hours)
        return date
    }

    const HandleDateRange = (date) =>{
        if(date > addMonths(new Date(), 6))
            return true
        else if(date < addHours(new Date(), 24))
            return true
        else
            return false
    }

    const GetConsultationAdress = (event) =>{
        event.preventDefault()
        fetch(`${BASEURL}GetAppointment/${consultation_id}`).then(
            response => {
                if(response.ok){
                    response.json().then( data => {
                        Cookies.set('address_id', data.address_id)
                        redirect('/booking-success')
                    })
                }
                else{
                    response.json().then( error => {
                        alert(error.detail)
                    })
                }
            }
        )
    }
        

    const handleRedirect = (event) =>{
        event.preventDefault()
        if(date != '1970-01-01')
            Cookies.set('date', date)
        else{
            alert('date is a required field')
            return
        }
        if(time != '')
            Cookies.set('time', time)
        else{
            alert('time is a required field')
            return
        }
        if(appointment_type != '')
            Cookies.set('appointment-type', appointment_type)
        else{
            alert('appointment type is a required field')
            return
        }
        if(product != '')
            Cookies.set('product', product)
        else{
            alert('Product is a required field')
            return
        }
        if (appointment_type == 'Installation'){
            if(consultation_id != ''){
                Cookies.set('consultation-id', consultation_id)
                GetConsultationAdress(event)
            }
            else{
                alert('Consultation is a required field')
                return
            }
        }
        
        if(loggedIn){
            redirect('/address-select')
        }
        else{
            Cookies.set('previous-page', 'appointment-book')
            redirect('/create-address')
        }
            
    
    }

    return(
        <form className=" grid grid-cols-2"> 
            <div>
                <ReactCalendar disabledDate={(value) => HandleDateRange(value)} onChange={(value, event) => {setDate(value._d.toISOString().split('T')[0])}}/>
                <vaadin-time-picker onChange={(event) => {setTime(event.target.value)}}  placeholder="Time" step={60*30} min="9:00" max="17:00" />               
            </div>
            <div>
                <select onChange={(e) => setType(e.target.value)}>
                    <option value=''>Appointment Type</option>
                    <option value='Consultation'>Consultation</option>
                    <option value='Installation'>Installation</option>
                </select>
                <select onChange={(e) => setProduct(e.target.value)}>
                    <option value=''>Product</option>
                    <option value='EV charger'>Electric Vehicle Charger</option>
                    <option value='Solar Panels'>Solar Panels</option>
                    <option value='Smart Home Management System'>Smart Home Management System</option>
                </select>
                <select placeholder="Consultation ID" disabled={isDisabled} onChange={(e) => setConsultation(e.target.value)}>
                    <option value=''>-- Select --</option>
                    {consultations.map(consultation =>
                        <option value={consultation.id}>{consultation.product} {consultation.date}</option>
                    )}
                        
                </select><br />
               <button onClick={handleRedirect} className="appointment-btn">Your Address --{'>'}</button>
            </div>
        </form>
    )
}

export default AppointmentBook