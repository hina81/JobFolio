import type { CalendarEvent } from "../../types";
import styles from "./style.module.css";

interface CalendarDayProps {
  day: number;
  dateKey: string;
  events: CalendarEvent[] | undefined;
  inRange: boolean;
  isStart: boolean;
  isEnd: boolean;
  dayOfWeek: number;
  onClick: () => void;
}

export const CalendarDay = ({
  day,
  events,
  inRange,
  isStart,
  isEnd,
  dayOfWeek,
  onClick,
}: CalendarDayProps) => {
  const buttonClass = [
    styles.dayButton,
    inRange
      ? isStart || isEnd
        ? styles.rangeEdge
        : styles.inRange
      : styles.default,
    dayOfWeek === 0 ? styles.sunday : dayOfWeek === 6 ? styles.saturday : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button onClick={onClick} className={buttonClass}>
      <div className={styles.dayNumber}>{day}</div>
      {events && (
        <div className={styles.eventList}>
          {events.map((event, i) => (
            <div
              key={i}
              className={`${styles.eventItem} ${
                inRange ? styles.eventInRange : styles.eventOutRange
              }`}
              title={`${event.time} ${event.title}`}
            >
              {event.time}
            </div>
          ))}
        </div>
      )}
    </button>
  );
};
