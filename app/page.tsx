"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { FaClock, FaCalendarAlt, FaHourglassStart, FaHourglassHalf, FaHourglassEnd } from "react-icons/fa";

const TARGET_DATE_39_DAYS_KEY = "targetDate39Days";
const TARGET_DATE_END_OF_2024 = new Date(2024, 11, 31, 23, 59, 59); // End of 2024
const TARGET_DATE_CU_APPLICATION = new Date(2024, 11, 15, 23, 59, 59); // CU Application Date
const TARGET_DATE_CU_BOLDER_START = new Date(2024, 7, 1); // Start date for CU Boulder (August 1, 2024)

const getFutureDate = (days: number): Date => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

const Home = () => {
  const [timeLeft, setTimeLeft] = useState(new Date(getFutureDate(39)));
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDate = localStorage.getItem(TARGET_DATE_39_DAYS_KEY);
      const initialDate = storedDate ? new Date(storedDate) : getFutureDate(39);
      setTimeLeft(initialDate);
      
      localStorage.setItem(TARGET_DATE_39_DAYS_KEY, initialDate.toString());

      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          const updatedDate = new Date(prev.getTime() - 1000);
          localStorage.setItem(TARGET_DATE_39_DAYS_KEY, updatedDate.toString());
          return updatedDate;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const getTimeParts = (date: Date) => {
    const totalSecondsLeft = Math.max(Math.floor((date.getTime() - new Date().getTime()) / 1000), 0);
    const days = Math.floor(totalSecondsLeft / (3600 * 24));
    const hours = Math.floor((totalSecondsLeft % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSecondsLeft % 3600) / 60);
    const seconds = totalSecondsLeft % 60;

    return { days, hours, minutes, seconds, totalSecondsLeft };
  };

  const { days, hours, minutes, seconds, totalSecondsLeft } = getTimeParts(timeLeft);
  const { days: days2024, hours: hours2024, minutes: minutes2024, seconds: seconds2024 } = getTimeParts(TARGET_DATE_END_OF_2024);
  const { days: daysCU, hours: hoursCU, minutes: minutesCU, seconds: secondsCU } = getTimeParts(TARGET_DATE_CU_APPLICATION);
  
  // CU Boulder countdown
  const totalDurationBoulder = (TARGET_DATE_CU_APPLICATION.getTime() - TARGET_DATE_CU_BOLDER_START.getTime()) / 1000; // in seconds
  const progressBarWidthBoulder = totalDurationBoulder > 0
    ? ((totalDurationBoulder - (secondsCU + minutesCU * 60 + hoursCU * 3600 + daysCU * 86400)) / totalDurationBoulder) * 100
    : 0;

  const totalSecondsFor39Days = 39 * 24 * 60 * 60; // Total seconds for 39 days
  const progressBarWidth39 = ((totalSecondsFor39Days - totalSecondsLeft) / totalSecondsFor39Days) * 100;

  const totalDuration2024 = (TARGET_DATE_END_OF_2024.getTime() - new Date().getTime()) / 1000; // in seconds
  const progressBarWidth2024 = totalDuration2024 > 0
    ? ((365 * 24 * 60 * 60 - totalDuration2024) / (365 * 24 * 60 * 60)) * 100
    : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-r from-purple-600 to-pink-500 text-white relative overflow-hidden">
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <h1 className="text-5xl font-bold mb-8 drop-shadow-lg">Countdown Timers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* 39-Day Countdown */}
        <div
          className="bg-blue-900 rounded-lg p-10 shadow-2xl cursor-pointer transition-transform duration-300 hover:shadow-lg transform hover:scale-105"
          onClick={() => setConfetti(true)}
        >
          <div className="flex items-center mb-6">
            <FaClock className="mr-4 text-5xl" />
            <h2 className="text-6xl font-semibold">{days}d {hours}h {minutes}m {seconds}s</h2>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-4 mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-red-500 h-full transition-all duration-500" style={{ width: `${progressBarWidth39}%` }}></div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-4">Exam Timeline:</h3>

          <div className="flex justify-around text-lg">
            <div className="flex flex-col items-center">
              <FaHourglassStart className="text-4xl mb-1" />
              <span>{days} Days</span>
            </div>
            <div className="flex flex-col items-center">
              <FaHourglassHalf className="text-4xl mb-1" />
              <span>{hours} Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <FaHourglassEnd className="text-4xl mb-1" />
              <span>{minutes} Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <FaClock className="text-4xl mb-1" />
              <span>{seconds} Seconds</span>
            </div>
          </div>
          {timeLeft <= new Date() && <h3 className="text-xl mt-4 animate-pulse">Time&apos;s up! Good luck!</h3>}
        </div>

        {/* End of 2024 Countdown */}
        <div className="bg-green-900 rounded-lg p-10 shadow-2xl">
          <div className="flex items-center mb-6">
            <FaCalendarAlt className="mr-4 text-5xl" />
            <h2 className="text-6xl font-semibold">{days2024}d {hours2024}h {minutes2024}m {seconds2024}s</h2>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-4 mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-red-500 h-full transition-all duration-500" style={{ width: `${progressBarWidth2024}%` }}></div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-4">Year 2024 Countdown:</h3>
          <div className="flex justify-around text-lg">
            <div className="flex flex-col items-center">
              <FaHourglassStart className="text-4xl mb-1" />
              <span>{days2024} Days</span>
            </div>
            <div className="flex flex-col items-center">
              <FaHourglassHalf className="text-4xl mb-1" />
              <span>{hours2024} Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <FaHourglassEnd className="text-4xl mb-1" />
              <span>{minutes2024} Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <FaClock className="text-4xl mb-1" />
              <span>{seconds2024} Seconds</span>
            </div>
          </div>
          {TARGET_DATE_END_OF_2024 <= new Date() && <h3 className="text-xl mt-4 animate-pulse text-center">Time&apos;s up for 2024!</h3>}
        </div>

        {/* CU Boulder Countdown */}
        <div className="bg-red-900 rounded-lg p-10 shadow-2xl">
          <div className="flex items-center mb-6">
            <FaCalendarAlt className="mr-4 text-5xl" />
            <h2 className="text-6xl font-semibold">{daysCU}d {hoursCU}h {minutesCU}m {secondsCU}s</h2>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-4 mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-red-500 h-full transition-all duration-500" style={{ width: `${progressBarWidthBoulder}%` }}></div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-4">CU Boulder Application Submission Date:</h3>
          <div className="flex justify-around text-lg">
            <div className="flex flex-col items-center">
              <FaHourglassStart className="text-4xl mb-1" />
              <span>{daysCU} Days</span>
            </div>
            <div className="flex flex-col items-center">
              <FaHourglassHalf className="text-4xl mb-1" />
              <span>{hoursCU} Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <FaHourglassEnd className="text-4xl mb-1" />
              <span>{minutesCU} Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <FaClock className="text-4xl mb-1" />
              <span>{secondsCU} Seconds</span>
            </div>
          </div>
          {TARGET_DATE_CU_APPLICATION <= new Date() && <h3 className="text-xl mt-4 animate-pulse text-center">Application Date has passed!</h3>}
        </div>
      </div>

      <style jsx>{`
        .min-h-screen {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 20%, rgba(0, 0, 0, 0.1) 80%);
        }
      `}</style>
    </div>
  );
};

export default Home;
