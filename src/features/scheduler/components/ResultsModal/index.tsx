import {
  Button,
  Text,
  Stack,
  FaCopyIcon,
  FaCheckIcon,
  FaTimesIcon,
} from "smarthr-ui";
import styles from "./style.module.css";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  slots: Array<{ dateStr: string; timeStr: string }>;
  outputFormat: string;
  onCopy: () => void;
  copied: boolean;
}

export const ResultsModal = ({
  isOpen,
  onClose,
  slots,
  outputFormat,
  onCopy,
  copied,
}: ResultsModalProps) => {
  const formatOutput = () => {
    switch (outputFormat) {
      case "bullets":
        return slots.map((slot) => `・${slot.dateStr} ${slot.timeStr}`);
      case "numbers":
        return slots.map(
          (slot, i) => `${i + 1}. ${slot.dateStr} ${slot.timeStr}`
        );
      case "plain":
        return slots.map((slot) => `${slot.dateStr} ${slot.timeStr}`);
      case "formal":
        return slots.map(
          (slot, i) => `【候補${i + 1}】${slot.dateStr} ${slot.timeStr}`
        );
      default:
        return slots.map((slot) => `${slot.dateStr} ${slot.timeStr}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* ヘッダー */}
        <div className={styles.header}>
          <Text size="xl" weight="bold">
            検索結果
          </Text>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimesIcon />
          </button>
        </div>

        {/* ボディ */}
        <div className={styles.body}>
          <Stack gap={1.5}>
            <Text size="s" color="TEXT_GREY">
              選択した期間内で空いている時間枠：{slots.length}件
            </Text>

            <div className={styles.resultsContainer}>
              {formatOutput().map((formattedSlot, index) => (
                <div key={index} className={styles.resultItem}>
                  <Text>{formattedSlot}</Text>
                </div>
              ))}
            </div>
          </Stack>
        </div>

        {/* フッター */}
        <div className={styles.footer}>
          <div className={styles.buttonGroup}>
            <Button variant="secondary" onClick={onClose}>
              閉じる
            </Button>
            <Button variant="primary" onClick={onCopy}>
              {copied ? (
                <>
                  <FaCheckIcon />
                  コピー済み
                </>
              ) : (
                <>
                  <FaCopyIcon />
                  コピー
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
