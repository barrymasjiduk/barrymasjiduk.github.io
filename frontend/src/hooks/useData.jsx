// useData.jsx
// All raw data localized for faster, smoother access
// Access functions using: import { functionName } from "../hooks/useData.jsx"

import data from "../assets/data.json";

// Converts 24-hour time (e.g., "14:30") to 12-hour format with AM/PM
export function convertTo12Hour(timeStr) {
  if (!timeStr) return null;
  const [hourStr, minuteStr] = timeStr.split(":");
  let hour = parseInt(hourStr, 10);
  const minutes = minuteStr.padStart(2, "0");

  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert "0" to "12"

  return `${hour}:${minutes} ${period}`;
}

// Returns masjid address
export function address() {
  return data.rawdata.association;
}

// Returns array of services and their availability from mawaqit
export function services() {
  return [
    ["Women Space", data.rawdata.womenSpace],
    ["Janaza Prayer", data.rawdata.janazaPrayer],
    ["Aid Prayer", data.rawdata.aidPrayer],
    ["Children Courses", data.rawdata.childrenCourses],
    ["Adult Courses", data.rawdata.adultCourses],
    ["Ramadan Meal", data.rawdata.ramadanMeal],
    ["Handicap Accessibility", data.rawdata.handicapAccessibility],
    ["Ablutions", data.rawdata.ablutions],
    ["Parking", data.rawdata.parking],
  ];
}

// Returns other info section
export function other() {
  return data.rawdata.otherInfo;
}

// Gets a specific prayer time and returns it in 12-hour format
// Prayer index: 0=Fajr, 1=Shuruq, 2=Zuhr, 3=Asr, 4=Maghrib, 5=Isha
export function getPrayerTime(month, day, prayerIndex) {
  const time = data.rawdata.calendar[month][String(day)][prayerIndex];
  return convertTo12Hour(time);
}

// Gets a specific jamaat time and returns it in 12-hour format
// Prayer index: 0=Fajr, 1=Zuhr, 2=Asr, 3=Maghrib, 4=Isha
export function getJamatTime(month, day, prayerIndex) {
  const time = data.rawdata.iqamaCalendar[month][String(day)][prayerIndex];
  return convertTo12Hour(time);
}

// Zawaal time is 6 minutes before Zuhr (index 2), returned in 12-hour format
export function zawal(month, day) {
  const timeStr = data.rawdata.calendar[month][String(day)][2]; // Zuhr time
  if (!timeStr) return null;

  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  date.setMinutes(date.getMinutes() - 6);

  return convertTo12Hour(`${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`);
}

// Sunset is 3 minutes before maghrib beginning time, returns sunset time
export function sunset(month, day) {
  const timeStr = data.rawdata.calendar[month][String(day)][4]; // Maghrib time
  if (!timeStr) return null;

  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  date.setMinutes(date.getMinutes() - 3);

  return convertTo12Hour(`${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`); 
}

// Suhoor end time is 5 minutes before Fajr (index 0), returned in 12-hour format
export function suhoorEnd(month, day) {
  const timeStr = data.rawdata.calendar[month][String(day)][0]; // Fajr time
  if (!timeStr) return null;

  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  date.setMinutes(date.getMinutes() - 5);

  return convertTo12Hour(`${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`);
}

// returns a full list of all the times for the day
export function fullDay(month, day) {
  const full = [];
  for (let i = 0; i < 6; i++) {
    if (i === 0) {
      full.push(suhoorEnd(month, day));
    }
    if (i === 2) {
      full.push(zawal(month, day));
    }
    if (i === 4) {
      full.push(sunset(month, day))
      full.push(getPrayerTime(month, day, i))
      continue;
    }
    full.push(getPrayerTime(month, day, i));
  }
  for (let i = 0; i < 5; i++) {
    full.push(getJamatTime(month, day, i));
  }
  return full;
}

// retuns a full list of beginning times for a given day
export function fullBegin(month, day){
  const full = [];
  for (let i = 0; i < 6; i++) {
    if(i==1){
        continue
    }
    full.push(getPrayerTime(month, day, i));
  }
  return full;
}

// retuns a full list of jamaat times for a given day
export function fullJamat(month, day){
  const full = [];
  for (let i = 0; i < 5; i++) {
    full.push(getJamatTime(month, day, i));
  }
  return full;
}

// Returns raw calendar data for a given month
// calendarMonth(0)["4"][0] = Fajr time on 4th January
export function calendarMonth(month) {
  return data.rawdata.calendar[month];
}

// Returns raw iqama calendar data for a given month
// iqamaCalendar(0)["4"][0] = Fajr jamaat time on 4th January
export function iqamaCalendar(month) {
  return data.rawdata.iqamaCalendar[month];
}

// Returns the length of a given month, how many days, useful to avoid leap year issues and 30 vs 31 vs 28 on the timetable
export function getMonthLength(month) {
  const days = data.rawdata.calendar[month];
  const length = Object.keys(days).length;
  return length;
}