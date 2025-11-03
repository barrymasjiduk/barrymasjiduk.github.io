// mainTable.jsx
// mainTable component for home page

import * as React from "react";
import { Button } from "../components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  } from "../components/ui/table";

import { fullDay, getMonthLength } from "@/hooks/useData";
import useDateTime from "../hooks/useDateTime";

//15 cols, first all begining times, zawaal etc, then jamaat.
const Timetable = () => {
  const {monthNum} = useDateTime();
  const {months} = useDateTime();
  const {dateOnly} = useDateTime();

  const cantPray = "#8c0409"
  const suhoorEnd = "#451d01"
  const jamaatColour = "#1f0dbd"
  const beginColour = "#157007"
  const headings = [
    ["Date", 1],
    ["Suhoor\nEnd", 0, suhoorEnd],
    ["Fajr", 0, beginColour],
    ["Sunrise", 0, cantPray],
    ["Zawaal", 0, cantPray],
    ["Zuhr", 0, beginColour],
    ["Asr", 0, beginColour],
    ["Sunset", 0, cantPray],
    ["Maghrib", 0, beginColour],
    ["Isha", 1, beginColour],
    ["Fajr", 0, jamaatColour],
    ["Zuhr", 0, jamaatColour],
    ["Asr", 0, jamaatColour],
    ["Maghrib", 0, jamaatColour],
    ["Isha", 0, jamaatColour],
  ];

  //useState that manages the changing months to see different monthly calenders
  //useState for the date, so that it changes reactively as date changes to show current date on timetable
  const [currentMonth, setCurrentMonth] = React.useState(monthNum);
  const [currentDate] =  React.useState(dateOnly);

  const items = [
    { color: suhoorEnd, label: "Stop eating before Suhoor end when fasting" },
    { color: beginColour, label: "Mandatory Salah to be perfomed daily" },
    { color: cantPray, label: "No Salah should be performed at these times" },
  ];

  //retrieves a 2D array of all the times for the month
  const times = React.useMemo(() => {
    const monthTimes = [];
    const daysInMonth = getMonthLength(currentMonth);
    for (let day = 1; day <= daysInMonth; day++) {
      monthTimes.push(fullDay(currentMonth, day));
    }
    return monthTimes;
  }, [currentMonth]);

  const isSpecialDate = (month, day) => {
    const year = new Date().getFullYear();

    // Ensure month is 0-based
    const m = month > 11 ? 11 : month < 0 ? 0 : month;
    const isZeroBased = months[0] === "January";
    const monthIndex = isZeroBased ? m : m - 1;

    // 1️⃣ Leap Day (Feb 29)
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    if (monthIndex === 1 && day === 29 && isLeap) return true;

    // 2️⃣ Find last Sunday in March (BST starts → mark all days after)
    if (monthIndex === 2) {
      const lastDayOfMarch = new Date(year, 3, 0).getDate(); // 31
      const lastSundayOfMarch = new Date(year, 2, lastDayOfMarch);
      while (lastSundayOfMarch.getDay() !== 0) {
        lastSundayOfMarch.setDate(lastSundayOfMarch.getDate() - 1);
      }
      if (day >= lastSundayOfMarch.getDate()) return true;
    }

    // 3️⃣ Find last Sunday in October (BST ends → mark all days after)
    if (monthIndex === 9) {
      const lastDayOfOctober = new Date(year, 10, 0).getDate(); // 31
      const lastSundayOfOctober = new Date(year, 9, lastDayOfOctober);
      while (lastSundayOfOctober.getDay() !== 0) {
        lastSundayOfOctober.setDate(lastSundayOfOctober.getDate() - 1);
      }
      if (day >= lastSundayOfOctober.getDate()) return true;
    }

    return false;
  };


  return (
    <div className="text-black">

      {/* Title + divider */}
      <div className="max-w-5xl mx-auto px-4 py-5 pt-5">
        <h1 className="font-bold text-xl text-primary md:text-4xl">
          Salah Timetable{" "}
          <span className="text-sm text-gray-600 font-normal md:text-lg">
            for the month of {months[currentMonth]}
          </span>
        </h1>
        <hr className="border-t-3 border-primary" />
      </div>

      {/* Scaled table */}
      <div className="md:overflow-visible overflow-x-hidden">
        <div className="flex justify-center">
          {/* Zoom on small screens; normal from md+ */}
          <div className="inline-block [zoom:0.44] md:[zoom:1]">
            
          <div className="flex gap-4 justify-center py-4">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>

            <Table className="text-center">
              {/* Header + caption */}
              <TableCaption>{months[currentMonth]} Prayer Times</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead colSpan={1}></TableHead>
                  <TableHead colSpan={9} className="font-bold md:text-2xl text-lg text-primary text-center">
                    Beginning Times
                  </TableHead>
                  <TableHead colSpan={5} className="font-bold md:text-2xl text-lg text-primary text-center">
                    Jamaat Times
                  </TableHead>
                </TableRow>

                <TableRow className="border-1 border-b-black">
                  {headings.map((heading, index) => (
                    <TableHead
                      key={index}
                      className={`text-[10px] md:text-sm text-center ${heading[1] ? "border-r-1 border-black" : ""}`}
                    >
                      {heading[0]}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {times.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className={
                      rowIndex + 1 === parseInt(currentDate) && currentMonth === monthNum ? "bg-primary text-white" : ""
                    }
                  >
                    {/* Date */}
                    <TableCell className="text-[10px] md:text-xs border-r-1 border-black">
                      {rowIndex + 1}
                      {isSpecialDate(currentMonth, rowIndex + 1) && <span className="text-red-600">*</span>}
                    </TableCell>

                    {/* Times */}
                    {row.map((cell, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        style={
                          headings[cellIndex + 1][2] && rowIndex + 1 !== parseInt(currentDate) || headings[cellIndex + 1][2] && currentMonth !== monthNum
                            ? { color: headings[cellIndex + 1][2] }
                            : undefined
                        }
                        className={`text-[10px] md:text-xs leading-tight ${cellIndex === 8 ? "border-r-1 border-black" : ""}`}
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Month manager */}
            <div className="flex items-center justify-center gap-4 my-4">
              <Button onClick={() => setCurrentMonth((prev) => Math.max(prev - 1, 0))}>Prev</Button>
              <h1 className="font-semibold">{months[currentMonth]}</h1>
              <Button onClick={() => setCurrentMonth((prev) => Math.min(prev + 1, months.length - 1))}>Next {}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Timetable;
