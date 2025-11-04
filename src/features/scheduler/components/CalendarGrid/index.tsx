import type { CalendarData, CalendarEvents } from "../../types";
import { CalendarDay } from "../CalendarDay";
import styles from "./style.module.css";

interface CalendarGridProps
  extends Pick<
    CalendarData,
    "year" | "month" | "daysInMonth" | "startingDayOfWeek"
  > {
  events: CalendarEvents;
  dateRangeHook: UseDateRangeReturn;
}

export const CalendarGrid = ({
  year,
  month,
  daysInMonth,
  startingDayOfWeek,
  events,
  dateRangeHook,
}: CalendarGridProps) => {
  const { handleDateClick, isDateInRange, isDateStart, isDateEnd } =
    dateRangeHook;

  const days = [];

  // 空白セル（前月分）
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className={styles.emptyCell}></div>);
  }

  // 日付セル
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const hasEvents = events[dateKey];
    const inRange = isDateInRange(date);
    const isStart = isDateStart(date);
    const isEnd = isDateEnd(date);
    const dayOfWeek = (startingDayOfWeek + day - 1) % 7;

    days.push(
      <CalendarDay
        key={day}
        day={day}
        dateKey={dateKey}
        events={hasEvents}
        inRange={inRange}
        isStart={isStart}
        isEnd={isEnd}
        dayOfWeek={dayOfWeek}
        onClick={() => handleDateClick(date)}
      />
    );
  }

  return <div className={styles.grid}>{days}</div>;
};
