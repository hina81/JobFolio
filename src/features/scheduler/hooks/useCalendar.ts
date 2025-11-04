import { useState } from "react";

export const useCalendar = (initialDate = new Date()) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const handlePrevMonth = () => {
    const { year, month } = getDaysInMonth(currentMonth);
    setCurrentMonth(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    const { year, month } = getDaysInMonth(currentMonth);
    setCurrentMonth(new Date(year, month + 1));
  };

  return {
    currentMonth,
    ...getDaysInMonth(currentMonth),
    handlePrevMonth,
    handleNextMonth,
  };
};
