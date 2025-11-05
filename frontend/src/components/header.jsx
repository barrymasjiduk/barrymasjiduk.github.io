// header.jsx
// displays logo, title, and current date/time in both Gregorian and Hijri formats

import * as React from "react";
import useDateTime from "../hooks/useDateTime";

import barry from '@/assets/barry.png'

const Header = () => {
    const { formattedGregorian, formattedHijri, time} = useDateTime();
    
    return (
      <header className="bg-primary py-4">
        <div className="grid grid-cols-3 items-center px-4">
          {/* Logo */}
          <img src={barry} className="w-13 md:w-30" alt="Barry Logo" />
  
          {/* Title */}
          <h1 className=" text-white text-lg font-bold md:text-6xl">
            Barry Masjid
          </h1>
  
          {/* Date & Time */}
          <div className="text-white text-right">
            <div className="text-[12px] md:text-2xl font-bold">{time}</div>
          </div>
        </div>
        <div className="text-white text-center align-middle mt-2">
          <div className="text-[10px] md:text-lg">{formattedHijri} | {formattedGregorian}</div>
        </div>
      </header>
    );
  };  

export default Header;
