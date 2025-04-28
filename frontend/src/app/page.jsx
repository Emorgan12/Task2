"use client"

import Image from "next/image";
import React, {useEffect} from "react";
const BaseURL = 'http://127.0.0.1:8000/'

export default function Home() {


  useEffect(() =>{
    alert('This site uses cookies which are strictly necessary for the site to function. By using this site, you agree to these cookies being stored in your browser')
  }, [])

  return (
    <p className="who-we-are">This page will be completed by the company. It will briefly explain who they are and what their company does.</p>
  );
}

export const BASEURL = BaseURL;
