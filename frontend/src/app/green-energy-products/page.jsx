"use client"

import { redirect } from "next/navigation";
import React from "react";

function Products(){

    return(
        <>
        <div id='green'>
            <button onClick={() => {redirect('/ev-chargers')}}>Electric Vehicle Chargers</button>
            <button onClick={() => {redirect('/solar-panels')}}>Solar Panels</button>
            <button onClick={() => {redirect('/smart-home')}}>Smart Home Energy Managment</button>
        </div>
        </>
    )
}

export default Products