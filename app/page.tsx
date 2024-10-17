"use client";

import { useEffect, useState } from "react";

const TARGET_DATE_40_DAYS = new Date(Date.now() + 40 * 24 * 60 * 60 * 1000); // 40 days from now
const TARGET_DATE_END_OF_MONTH = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59); // End of current month
const TARGET_DATE_END_OF_YEAR = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59); // End of 2024

const getDaysUntilEndOfWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate days until the end of the week (Saturday)
  const daysUntilEndOfWeek = dayOfWeek === 6 ? 0 : 6 - dayOfWeek; // For Sunday start
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilEndOfWeek, 23, 59, 59);
};

const TARGET_DATE_WEEKLY = getDaysUntilEndOfWeek();

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    timer40Days: TARGET_DATE_40_DAYS,
    timerEndOfMonth: TARGET_DATE_END_OF_MONTH,
    timerWeekly: TARGET_DATE_WEEKLY,
    timerEndOfYear: TARGET_DATE_END_OF_YEAR,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => ({
        timer40Days: prev.timer40Days <= new Date() ? new Date() : new Date(prev.timer40Days.getTime() - 1000),
        timerEndOfMonth: prev.timerEndOfMonth <= new Date() ? new Date() : new Date(prev.timerEndOfMonth.getTime() - 1000),
        timerWeekly: prev.timerWeekly <= new Date() ? new Date() : new Date(prev.timerWeekly.getTime() - 1000),
        timerEndOfYear: prev.timerEndOfYear <= new Date() ? new Date() : new Date(prev.timerEndOfYear.getTime() - 1000),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeParts = (date) => {
    const totalSeconds = Math.floor((date.getTime() - new Date().getTime()) / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  const { days: days40, hours: hours40, minutes: minutes40, seconds: seconds40 } = getTimeParts(timeLeft.timer40Days);
  const { days: daysEndOfMonth, hours: hoursEndOfMonth, minutes: minutesEndOfMonth, seconds: secondsEndOfMonth } = getTimeParts(timeLeft.timerEndOfMonth);
  const { days: daysWeekly, hours: hoursWeekly, minutes: minutesWeekly, seconds: secondsWeekly } = getTimeParts(timeLeft.timerWeekly);
  const { days: days2024, hours: hours2024, minutes: minutes2024, seconds: seconds2024 } = getTimeParts(timeLeft.timerEndOfYear);

  const currentDate = new Date();
  const weekOfMonth = Math.ceil(currentDate.getDate() / 7); // Current week of the month
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
      <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">Countdown Timers</h1>
      <h2 className="text-2xl mb-4">Current Month: {currentMonth}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl w-full">
        {/* 40-Day Timer */}
        <div className="bg-blue-600 rounded-lg p-8 shadow-lg transform transition-all duration-300 hover:scale-105 relative overflow-hidden">
          <h2 className="text-4xl font-semibold">{days40}d {hours40}h {minutes40}m {seconds40}s</h2>
          <p className="text-sm uppercase tracking-wide">40-Day Countdown</p>
          <p className="text-xs mt-2">Countdown to your exam! Good luck!</p>
          <div className="absolute inset-0 bg-blue-300 opacity-30 rounded-lg blur-md"></div>
        </div>
        
        {/* End of Month Timer */}
        <div className="bg-green-600 rounded-lg p-8 shadow-lg transform transition-all duration-300 hover:scale-105 relative overflow-hidden">
          <h2 className="text-4xl font-semibold">{daysEndOfMonth}d {hoursEndOfMonth}h {minutesEndOfMonth}m {secondsEndOfMonth}s</h2>
          <p className="text-sm uppercase tracking-wide">Countdown to Month End: {currentMonth}</p>
          <p className="text-xs mt-2">Finish all tasks before the month ends!</p>
          <div className="absolute inset-0 bg-green-300 opacity-30 rounded-lg blur-md"></div>
        </div>

        {/* Weekly Timer */}
        <div className="bg-yellow-600 rounded-lg p-8 shadow-lg transform transition-all duration-300 hover:scale-105 relative overflow-hidden">
          <h2 className="text-4xl font-semibold">{daysWeekly}d {hoursWeekly}h {minutesWeekly}m {secondsWeekly}s</h2>
          <p className="text-sm uppercase tracking-wide">Week {weekOfMonth} of the Month</p>
          <p className="text-xs mt-2">Stay focused! Keep up with your weekly goals.</p>
          <div className="absolute inset-0 bg-yellow-300 opacity-30 rounded-lg blur-md"></div>
        </div>

        {/* Year End Timer */}
        <div className="bg-red-600 rounded-lg p-8 shadow-lg transform transition-all duration-300 hover:scale-105 relative overflow-hidden">
          <h2 className="text-4xl font-semibold">{days2024}d {hours2024}h {minutes2024}m {seconds2024}s</h2>
          <p className="text-sm uppercase tracking-wide">Countdown to 2024</p>
          <p className="text-xs mt-2">Prepare for the new year!</p>
          <div className="absolute inset-0 bg-red-300 opacity-30 rounded-lg blur-md"></div>
        </div>
      </div>

      {timeLeft.timer40Days <= new Date() && (
        <h3 className="text-xl mt-8 animate-pulse">40-Day Timer: Time&apos;s up! Good luck!</h3>
      )}
      {timeLeft.timerEndOfMonth <= new Date() && (
        <h3 className="text-xl mt-8 animate-pulse">Month End Timer: Time&apos;s up!</h3>
      )}
      {timeLeft.timerWeekly <= new Date() && (
        <h3 className="text-xl mt-8 animate-pulse">Weekly Timer: Time&apos;s up!</h3>
      )}
      {timeLeft.timerEndOfYear <= new Date() && (
        <h3 className="text-xl mt-8 animate-pulse">Year End Timer: Time&apos;s up!</h3>
      )}
    </div>
  );
}
