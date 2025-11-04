import { useEffect } from "react";
import { ScheduleContainer } from "../features/scheduler/components/ScheduleContainer";

export const SchedulePage = () => {
  // ページ読み込み時にbodyのスクロールを無効にし、アンマウント時に復元
  useEffect(() => {
    // 現在のbodyのスタイルを保存
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // スクロールを無効化
    document.body.style.overflow = "hidden";

    // クリーンアップ関数で元に戻す
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return <ScheduleContainer />;
};
