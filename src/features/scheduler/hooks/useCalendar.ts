import { useState } from "react";
import type { UseCalendarReturn } from "../types";

export const useCalendar = (initialDate = new Date()): UseCalendarReturn => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);

  const getDaysInMonth = (date: Date) => {
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
    ...getDaysInMonth(currentMonth),
    handlePrevMonth,
    handleNextMonth,
  };
};
