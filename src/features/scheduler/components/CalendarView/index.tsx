import type { CalendarEvents } from "../../types";
import { CalendarGrid } from "../CalendarGrid";
import { CalendarHeader } from "../CalendarHeader";
import styles from "./style.module.css";

interface CalendarViewProps {
  calendarHook: UseCalendarReturn;
  dateRangeHook: UseDateRangeReturn;
  events: CalendarEvents;
}

export const CalendarView = ({
  calendarHook,
  dateRangeHook,
  events,
}: CalendarViewProps) => {
  const {
    year,
    month,
    daysInMonth,
    startingDayOfWeek,
    handlePrevMonth,
    handleNextMonth,
  } = calendarHook;

  return (
    <div className={styles.container}>
      <CalendarHeader
        year={year}
        month={month}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      {/* 曜日ヘッダー */}
      <div className={styles.weekHeader}>
        {["日", "月", "火", "水", "木", "金", "土"].map((day, i) => {
          const dayClass =
            i === 0
              ? `${styles.weekDay} ${styles.sunday}`
              : i === 6
              ? `${styles.weekDay} ${styles.saturday}`
              : styles.weekDay;

          return (
            <div key={day} className={dayClass}>
              {day}
            </div>
          );
        })}
      </div>

      <div className={styles.calendarGrid}>
        <CalendarGrid
          year={year}
          month={month}
          daysInMonth={daysInMonth}
          startingDayOfWeek={startingDayOfWeek}
          events={events}
          dateRangeHook={dateRangeHook}
        />
      </div>
    </div>
  );
};
