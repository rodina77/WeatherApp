"use client";

import { useState } from "react";
import axios from "axios";
import { UseGeoLocation } from "./Hooks/useGeoLocation";
import Navbar from "./components/navBar/NavBar";
import HomePage from "./home/page";

export default function Home() {

  return (
    
    <div>
      <Navbar/>
      <HomePage/>
       
    </div>

  );
}
