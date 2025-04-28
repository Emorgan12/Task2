"use client"

import { redirect } from "next/navigation";
import React from "react";

function SmartHome(){
    
    return(
        <>
        <div className="container">
            <h1>Smart Home Energy Management System</h1>
            <div className=" flex">
                <div className=" mr-60">
                    <div className="subsection">
                        <div className="mr-10">
                            <h1>Thermostat</h1>
                            <img alt="Smart Thermostat" src="thermostat.png" className="charger-img"/>
                        </div>
                        <p className="description">description goes here</p>
                    </div>
                    <div className="subsection">
                        <div className="mr-10 ">
                            <h1>Electric/Gas Meter</h1>
                            <img alt="Smart Electric Gas Meter" src="meter.png" className="charger-img"/>
                        </div>
                        <p className="description">description goes here</p>
                    </div>
                </div>
                <div className=" mt-50">
                    <div className="subsection">
                        <div>
                            <h1>Lightbulbs</h1>
                            <img alt="Smart Lightbulb" src="bulb.png" className="charger-img"/>
                        </div>
                        <p className="description">description goes here</p>
                    </div>
                    <div className="subsection">
                        <div>
                            <h1>Plugs</h1>
                            <img alt="Smart Plug" src="plug.png" className="charger-img"/>
                        </div>
                        <p className="description">description goes here</p>
                    </div>
                </div>
            </div>
        </div>
            <div className="flex items-center justify-center"><button onClick={() => {redirect('/appointment-book')}} className="book-btn">Book a consultation today</button></div>
    </>
    )
}

export default SmartHome