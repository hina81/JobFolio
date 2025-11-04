import { useState } from "react";

export const useDateRange = () => {
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });

  const handleDateClick = (date) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: date, end: null });
    } else {
      if (date < selectedRange.start) {
        setSelectedRange({ start: date, end: selectedRange.start });
      } else {
        setSelectedRange({ start: selectedRange.start, end: date });
      }
    }
  };

  const isDateInRange = (date) => {
    if (!selectedRange.start) return false;
    if (!selectedRange.end)
      return date.getTime() === selectedRange.start.getTime();
    return date >= selectedRange.start && date <= selectedRange.end;
  };

  const isDateStart = (date) => {
    if (!selectedRange.start) return false;
    return date.getTime() === selectedRange.start.getTime();
  };

  const isDateEnd = (date) => {
    if (!selectedRange.end) return false;
    return date.getTime() === selectedRange.end.getTime();
  };

  return {
    selectedRange,
    handleDateClick,
    isDateInRange,
    isDateStart,
    isDateEnd,
  };
};
