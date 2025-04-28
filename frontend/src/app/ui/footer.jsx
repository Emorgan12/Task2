import React from "react";
import Link from "next/link";

function Footer(){

    return(
        <footer>
            <ul>
                <li><Link target='_blank' href='https://footprint.wwf.org.uk/'>Carbon Footprint Calculator</Link></li>
                <li><Link target='_blank' href='https://consumption.selectra.co.uk/'>Energy Usage Calculator</Link></li>
            </ul>
            <ul>
                <li><Link href='/'>Who we are</Link></li>
                <li><Link href='/faq'>FAQ</Link></li>
            </ul>
            <ul>
                <li><Link href='accessibility-statement'>Accessibility Statement</Link></li>
                <li><Link href='privacy-policy'>Privacy Policy</Link></li>
            </ul>
            <ul>
                <li><Link target='_blank' href= 'mailto:info@rolsa.tech'>info@rolsa.tech</Link></li>
                <li><Link target="_blank" href= 'tel:004407777777777'>+44 07777 777777</Link></li>
            </ul>
        </footer>
    )
}

export const Foot = Footer;