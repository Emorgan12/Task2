"use client"

import { redirect } from "next/navigation";
import React from "react";

function SolarPanels(){
    
    return(
        <>
            <div className="container">
                <h1>Solar Panels</h1>
                <div className=" flex">
                    <div className=" mr-60">
                        <div className="subsection">
                            <div className="mr-10">
                                <h1>Monocrystalline (Mono-SI)</h1>
                                <img alt="Monocrystalline Solar Panel" src="mono-si.png" className="charger-img"/>
                            </div>
                            <p className="description">description goes here</p>
                        </div>
                        <div className="subsection">
                            <div className="mr-10 ">
                                <h1>Polycrystalline (p-Si)</h1>
                                <img alt="Polycrystalline Solar Panel" src="p-si.png" className="charger-img"/>
                            </div>
                            <p className="description">description goes here</p>
                        </div>
                    </div>
                    <div className=" mt-50">
                        <div className="subsection">
                            <div>
                                <h1>Thin-Film (A-SI)</h1>
                                <img alt="Thin-Film Solar Panel" src="a-si.png" className="charger-img"/>
                            </div>
                            <p className="description">description goes here</p>
                        </div>
                        <div className="subsection">
                            <div>
                                <h1>Concentrated PV Cell (CVP)</h1>
                                <img alt="Concentrated Photovoltaics Cell Solar Panel" src="cvp.png" className="charger-img"/>
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

export default SolarPanels