import { useState } from "react";
import { useCalendar } from "../../hooks/useCalendar";
import { useDateRange } from "../../hooks/useDateRange";
import { useScheduleSettings } from "../../hooks/useScheduleSettings";
import { ScheduleSidebar } from "../ScheduleSidebar";
import { ResultsView } from "../ResultView";
import { CalendarView } from "../CalendarView";
import styles from "./style.module.css";

export const ScheduleContainer = () => {
  const calendarHook = useCalendar();
  const dateRangeHook = useDateRange();
  const settings = useScheduleSettings();
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  // ダミー
  const dummyEvents = {
    "2025-11-05": [{ time: "10:00-11:30", title: "企業説明会" }],
    "2025-11-07": [{ time: "14:00-15:00", title: "OB訪問" }],
    "2025-11-12": [{ time: "13:00-14:30", title: "1次面接" }],
    "2025-11-15": [{ time: "10:00-12:00", title: "ゼミ発表" }],
    "2025-11-20": [{ time: "15:00-16:00", title: "研究室ミーティング" }],
  };
  const dummySlots = [
    { dateStr: "11月6日(水)", timeStr: "10:00～11:00" },
    { dateStr: "11月6日(水)", timeStr: "14:00～15:00" },
    { dateStr: "11月8日(金)", timeStr: "09:00～10:00" },
    { dateStr: "11月8日(金)", timeStr: "13:00～14:00" },
    { dateStr: "11月11日(月)", timeStr: "10:00～11:00" },
    { dateStr: "11月13日(水)", timeStr: "15:00～16:00" },
    { dateStr: "11月14日(木)", timeStr: "09:00～10:00" },
    { dateStr: "11月18日(月)", timeStr: "14:00～15:00" },
  ];

  const handleSearch = () => {
    setShowResults(true);
  };

  const copyToClipboard = () => {
    const formatOutput = () => {
      return dummySlots
        .map((slot) => `・${slot.dateStr} ${slot.timeStr}`)
        .join("\n");
    };

    navigator.clipboard.writeText(formatOutput());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      {/* メインカレンダーエリア */}
      <div className={styles.mainArea}>
        <div className={styles.innerContainer}>
          {/* <Heading tag="h1">日程調整アシスタント</Heading> */}

          <CalendarView
            calendarHook={calendarHook}
            dateRangeHook={dateRangeHook}
            events={dummyEvents}
          />

          {showResults && (
            <ResultsView
              slots={dummySlots}
              onCopy={copyToClipboard}
              copied={copied}
            />
          )}
        </div>
      </div>

      {/* 右サイドバー */}
      <ScheduleSidebar
        selectedRange={dateRangeHook.selectedRange}
        settings={settings}
        onSearch={handleSearch}
      />
    </div>
  );
};
