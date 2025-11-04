import { FaChevronLeftIcon, FaChevronRightIcon } from "smarthr-ui";
import styles from "./style.module.css";

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarHeader = ({
  year,
  month,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) => (
  <div className={styles.header}>
    <button onClick={onPrevMonth} className={styles.navButton}>
      <FaChevronLeftIcon className={styles.icon} />
    </button>

    <h2 className={styles.title}>
      {year}年 {month + 1}月
    </h2>

    <button onClick={onNextMonth} className={styles.navButton}>
      <FaChevronRightIcon className={styles.icon} />
    </button>
  </div>
);
