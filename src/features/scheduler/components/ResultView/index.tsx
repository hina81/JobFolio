import { FaCheckIcon, FaCopyIcon } from "smarthr-ui";
import type { TimeSlot } from "../../types";
import styles from "./style.module.css";

interface ResultsViewProps {
  slots: TimeSlot[];

  onCopy: () => void;
  copied: boolean;
}

export const ResultsView = ({
  slots,

  onCopy,
  copied,
}: ResultsViewProps) => {
  const formatOutput = () => {
    return slots.map((s) => `・${s.dateStr} ${s.timeStr}`).join("\n");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>候補日程（{slots.length}件）</h3>
        <button onClick={onCopy} className={styles.copyButton}>
          {copied ? (
            <FaCheckIcon className={styles.icon} />
          ) : (
            <FaCopyIcon className={styles.icon} />
          )}
          {copied ? "コピー完了！" : "コピー"}
        </button>
      </div>

      <div className={styles.output}>
        <pre className={styles.pre}>{formatOutput()}</pre>
      </div>
    </div>
  );
};
