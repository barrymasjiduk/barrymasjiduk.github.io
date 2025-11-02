// screen.jsx
// screen page for masjid screen

import * as React from "react";
import HomeTable from "@/components/homeTable";
import useDateTime from "@/hooks/useDateTime";


const Screen = () => {
  const { formattedGregorian, formattedHijri, time} = useDateTime();

  return (
    <div className="scale-160 xl:200 2xl:scale-300 flex items-center justify-center h-screen w-screen flex-col">
        <div className="">
            
            <div className="grid grid-cols-2 items-center">
                <h1 className="text-xl md:text-3xl font-bold text-primary">
                    Today's Salah Times
                    <hr className="border-t-3 border-primary mt-1" />
                </h1>
                
                <div className="text-right">
                    <div className="text-md text-black font-semibold ">{formattedHijri}</div>
                    <div className="text-md text-black font-semibold">{formattedGregorian}</div>
                    <div className="text-xl text-primary font-bold">{time}</div>
                </div>
            </div>

            <HomeTable header={false} />
        </div>
    </div>
  );
};

export default Screen;