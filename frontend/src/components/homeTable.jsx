// timetable.jsx
// timetable component for home page

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";

import { fullDay } from "@/hooks/useData";
import useDateTime from "@/hooks/useDateTime";
import { useNavigate } from "react-router-dom";

import { ArrowRight } from "lucide-react";

const HomeTable = ({header = true}) => {
  const { monthNum, dateOnly, monthName, time } = useDateTime();
  const [currentDate] = React.useState(dateOnly);

  const navigate = useNavigate();

  const times = fullDay(monthNum, parseInt(currentDate));
  const showThirdButton = monthName === "Ramadan";

  const headings = ["Fajr", "Zuhr", "Asr", "Maghrib", "Isha"];

  const beginsTimes = [times[1], times[4], times[5], times[7], times[8]];

  const otherTimes = [
    [times[0], "Suhoor End"],
    [times[2], "Sunrise"],
    [times[3], "Zawaal"],
    [times[6], "Sunset"],
    [times[10], "Jumu'ah"],
  ];

  const jamaatTimes = times.slice(9, 14);

// "HH:MM" or "HH:MM:SS" (24h) OR "h:MM AM/PM" (optionally with seconds) -> minutes since midnight
const toMinutes = (str) => {
  if (!str) return 0;
  const s = String(str).trim().toUpperCase();

  // 12-hour, e.g. "1:05 PM" or "01:05:30 am"
  let m = s.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*([AP]M)$/);
  if (m) {
    let h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    const ap = m[3];
    if (ap === "AM") {
      if (h === 12) h = 0;        // 12:xx AM -> 00:xx
    } else {
      if (h !== 12) h += 12;       // 1–11 PM -> +12
    }
    return h * 60 + min;
  }

  // 24-hour, e.g. "13:05" or "13:05:30"
  m = s.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (m) {
    const h = Math.min(parseInt(m[1], 10), 23);
    const min = Math.min(parseInt(m[2], 10), 59);
    return h * 60 + min;
  }

  // Fallback
  return 0;
};

// Determine current salah index based on the most recent Jamaat time
const getCurrentSalahIndex = () => {
  const nowMin = toMinutes(time);            // your time from useDateTime (12h or 24h)
  const jamaatMins = jamaatTimes.map(toMinutes);
  const n = jamaatMins.length;

  // find the last jamaat time that has already passed (<= now)
  let lastPassed = -1;
  for (let i = 0; i < n; i++) {
    if (nowMin >= jamaatMins[i]) lastPassed = i;
  }

  // If none passed yet (before Fajr Jamaat), current is Fajr (index 0)
  if (lastPassed === -1) return 0;

  // Otherwise, current is the one after the most recent Jamaat
  return (lastPassed + 1) % n; // after Isha -> wraps to Fajr
};

const currentSalahIndex = getCurrentSalahIndex();


  return (
    <div className="flex items-center justify-center ">
      <div className="items-center py-5 px-4 gap-5 text-black overflow-x-auto ">
        {header &&
        <div className="flex flex-col pb-2">
          <div className="flex items-center justify-between">
            {/* Title */}
            <h1 className="text-xl md:text-3xl font-bold text-primary">
              Today's Salah Times
            </h1>

            {/* Live badge */}
            
            <button
              onClick={() => navigate("/live")}
              className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1.5 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Listen Live
              <ArrowRight className="w-4 h-4" />
            </button>
            
          </div>

          <hr className="border-t-3 border-primary mt-1" />
        </div>
        }
        {/* DESKTOP / TABLET (original) */}
        <div className="hidden md:block">
          <Table className="table-auto border-separate border-spacing-0 rounded-lg overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                {headings.map((heading, index) => (
                  <TableHead key={index} colSpan={2} className="text-center text-[13px]">
                    {heading}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableHead className="text-center text-[13px] text-primary">
                  Begins
                </TableHead>
                {beginsTimes.map((time, index) => (
                  <TableCell
                    key={index}
                    colSpan={2}
                    className={`text-center text-[13px] ${
                      index === currentSalahIndex ? "bg-primary text-white rounded-t-md" : ""
                    }`}
                  >
                    {time}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableHead className="text-center text-[13px] text-primary ">
                  Jam'aat
                </TableHead>
                {jamaatTimes.map((time, index) => (
                  <TableCell
                    key={index}
                    colSpan={2}
                    className={`text-center text-[13px] ${
                      index === currentSalahIndex ? "bg-primary text-white rounded-b-md" : ""
                    }`}
                  >
                    {time}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* MOBILE (transposed) */}
        <div className="block md:hidden">
          <div className="flex flex-row gap-3">
            {/* Table */}
            <div className="flex-1">
              <Table className="table-auto border-separate border-spacing-0 rounded-lg overflow-hidden w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left text-[13px]"></TableHead>
                    <TableHead className="text-center text-[13px]">Begins</TableHead>
                    <TableHead className="text-center text-[13px]">Jam'aat</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {headings.map((label, i) => (
                    <TableRow key={label}>
                      <TableHead className="text-left text-[13px] text-primary">{label}</TableHead>
                      <TableCell
                        className={`text-center text-[13px] ${
                          i === currentSalahIndex ? "bg-primary text-white rounded-l-md" : ""
                        }`}
                      >
                        {beginsTimes[i]}
                      </TableCell>
                      <TableCell
                        className={`text-center text-[13px] ${
                          i === currentSalahIndex ? "bg-primary text-white rounded-r-md" : ""
                        }`}
                      >
                        {jamaatTimes[i]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Other times cards */}
            <div className="flex flex-col justify-start gap-2 w-[120px]">
              {otherTimes.map(([val, label], i) => (
                <div
                  key={`${label}-${i}`}
                  className={`${(() => {
                    switch (i) {
                      case 0:
                        return "bg-[#451d01]";
                      case 4:
                        return "bg-[#3d8644]";
                      default:
                        return "bg-[#8c0409]";
                    }
                  })()} rounded-md text-white text-[11px] px-2 py-1 flex flex-col items-center text-center`}
                >
                  <span className="opacity-90 font-bold">{label}</span>
                  <span className="font-bold">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* OTHER TIMES — compact cards (desktop, same style as mobile) */}
        <div className="mt-2 hidden md:flex">
          <div className="flex flex-row flex-wrap gap-2">
            {otherTimes.map(([val, label], i) => (
              <div
                key={`${label}-${i}`}
                className={`${(() => {
                  switch (i) {
                    case 0:
                      return "bg-[#451d01]";
                    case 4:
                      return "bg-[#3d8644]";
                    default:
                      return "bg-[#8c0409]";
                  }
                })()} rounded-md text-white text-[11px] px-3 py-2 flex flex-col items-center text-center w-[140px]`}
              >
                <span className="opacity-90 font-bold">{label}</span>
                <span className="font-bold">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {header &&
        <div className="flex flex-row gap-1 pt-2">
          <Button
            className="w-full sm:w-auto flex-1 md:text-sm text-[10px] whitespace-normal text-center px-2 py-2"
            onClick={() => navigate("/timetable")}
          >
            View Full Timetable
          </Button>
          <Button
            className="w-full sm:w-auto flex-1 md:text-sm text-[10px] whitespace-normal text-center px-2 py-2"
            onClick={() => navigate("/timetable")}
          >
            Download Timetable PDF
          </Button>
          {showThirdButton && (
            <Button
              className="w-full sm:w-auto flex-1 md:text-sm text-[10px] whitespace-normal text-center px-2 py-2"
              onClick={() => navigate("/special-page")}
            >
              Download Ramadan Timetable PDF
            </Button>
          )}
        </div>
        }
      </div>
    </div>
  );
};

export default HomeTable;
