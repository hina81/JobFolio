import { Stack, Text, Heading, FaClockIcon, Input, Button } from "smarthr-ui";
import type { DateRange } from "../../types";
import { useScheduleSettings } from "../../hooks/useScheduleSettings";
import styles from "./style.module.css";

interface SidebarProps {
  selectedRange: DateRange;
  settings: ReturnType<typeof useScheduleSettings>;
  onSearch: () => void;
}

export const ScheduleSidebar = ({
  selectedRange,
  settings,
  onSearch,
}: SidebarProps) => {
  const {
    bufferBefore,
    setBufferBefore,
    bufferAfter,
    setBufferAfter,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  } = settings;

  return (
    <div className={styles.container}>
      <Stack gap={2}>
        {/* ヘッダー */}
        <div className={styles.header}>
          <Heading tag="h2">JobFolio</Heading>
          <Text className={styles.appDescription}>日程調整アシスタント</Text>
        </div>

        {/* 選択範囲表示 */}
        <div className={styles.selectedRange}>
          <Text className={styles.rangeTitle}>選択範囲</Text>
          {selectedRange.start ? (
            <div className={styles.rangeContent}>
              {selectedRange.start.toLocaleDateString("ja-JP")}
              {selectedRange.end && (
                <> - {selectedRange.end.toLocaleDateString("ja-JP")}</>
              )}
            </div>
          ) : (
            <Text className={styles.rangePlaceholder}>
              カレンダーから日付を選択してください
            </Text>
          )}
        </div>

        {/* 営業時間設定 */}
        <div>
          <Text className={styles.sectionTitle}>営業時間</Text>
          <Stack gap={1}>
            <div className={styles.formSection}>
              <Text className={styles.label}>開始時間</Text>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formSection}>
              <Text className={styles.label}>終了時間</Text>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={styles.input}
              />
            </div>
          </Stack>
        </div>

        {/* 時間設定 */}
        <div>
          <Text className={styles.sectionTitle}>時間設定</Text>
          <Stack gap={1}>
            <div className={styles.formSection}>
              <Text className={styles.label}>
                <FaClockIcon className={styles.labelIcon} />
                前の予定との間隔
              </Text>
              <div className={styles.numberInputContainer}>
                <Input
                  type="number"
                  value={bufferBefore.toString()}
                  onChange={(e) =>
                    setBufferBefore(parseInt(e.target.value) || 0)
                  }
                  min="0"
                  step="15"
                  className={styles.input}
                />
                <span className={styles.numberUnit}>分</span>
              </div>
            </div>

            <div className={styles.formSection}>
              <Text className={styles.label}>
                <FaClockIcon className={styles.labelIcon} />
                後の予定との間隔
              </Text>
              <div className={styles.numberInputContainer}>
                <Input
                  type="number"
                  value={bufferAfter.toString()}
                  onChange={(e) =>
                    setBufferAfter(parseInt(e.target.value) || 0)
                  }
                  min="0"
                  step="15"
                  className={styles.input}
                />
                <span className={styles.numberUnit}>分</span>
              </div>
            </div>
          </Stack>
        </div>

        {/* 検索ボタン */}
        <Button
          onClick={onSearch}
          disabled={!selectedRange.start}
          variant="primary"
          size="default"
          className={styles.searchButton}
        >
          空き時間を検索
        </Button>
      </Stack>
    </div>
  );
};
