"use client"

import { redirect } from "next/navigation";
import React from "react";

function Chargers(){

    return(
        <>
            <div className=" flex">
                <div className=" mr-60">
                    <h1 className="head mt-10">For Private Use</h1>
                    <div className="subsection">
                        <div className="mr-10">
                            <h1>3KW</h1>
                            <img alt="3 Kilowatt Electric Charger" src="3kw.png" className="charger-img"/>
                        </div>
                        <p className="description">description goes here</p>
                    </div>
                    <div className="subsection">
                        <div className="mr-10 ">
                            <h1>7KW</h1>
                            <img alt="7 Kilowatt Electric Charger" src="7kw.png" className="charger-img"/>
                        </div>
                        <p className="description">description goes here</p>
                    </div>
                </div>
                <div className=" mt-50">
                    <h1 className="head">For Public Use</h1>
                    <div className="subsection">
                        <div>
                            <h1>22KW</h1>
                            <img alt="22 Kilowatt Electric Charger" src="22kw.png" className="charger-img"/>
                        </div>
                        <p className="description">description goes here</p>
                    </div>
                    <div className="subsection">
                        <div>
                            <h1>50KW</h1>
                            <img alt="50 Kilowatt Electric Charger" src="50kw.png" className="charger-img"/>
                        </div>
                        <p className="description">description goes here</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center"><button onClick={() => {redirect('/appointment-book')}} className="book-btn">Book a consultation today</button></div>
        </>

    )
}

export default Chargers