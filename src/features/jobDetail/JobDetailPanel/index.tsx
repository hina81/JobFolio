import { useState } from "react";
import {
  Heading,
  Button,
  Text,
  ActionDialog,
  FaUpRightAndDownLeftFromCenterIcon,
  FaAnglesRightIcon,
} from "smarthr-ui";
import type { Job } from "../../../types/types";
import { ReadOnlyField } from "../../../components/Base/ReadOnlyField";
import styles from "./style.module.css";

interface JobDetailPanelProps {
  job: Job;
  onClose: () => void;
  onDeleteJob: (id: string) => void;
  onNavigateToDetail: (id: string) => void;
}

export const JobDetailPanel = ({
  job,
  onClose,
  onDeleteJob,
  onNavigateToDetail,
}: JobDetailPanelProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    if (job) {
      onDeleteJob(job.id);
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!job) return null;

  return (
    <>
      {/* オーバーレイ */}
      <div
        className={`${styles.overlay} ${styles.overlayOpen}`}
        onClick={handleOverlayClick}
      />

      {/* パネル */}
      <div className={`${styles.panel} ${styles.panelOpen}`}>
        {/* アイコン */}
        <div className={styles.iconContainer}>
          <button
            className={styles.iconButton}
            onClick={onClose}
            title="パネルを閉じる"
          >
            <FaAnglesRightIcon size="S" />
          </button>
          <button
            className={styles.iconButton}
            onClick={() => onNavigateToDetail(job.id)}
            title="詳細ページへ遷移"
          >
            <FaUpRightAndDownLeftFromCenterIcon size="S" />
          </button>
        </div>

        {/* ヘッダー */}
        <div className={styles.header}>
          <div className={styles.headerActions}>
            <Heading tag="h2">{job.company}</Heading>
            <div className={styles.statusBadge}>{job.status}</div>
          </div>
        </div>

        {/* コンテンツ */}
        <div className={styles.content}>
          <div className={styles.fieldGrid}>
            <ReadOnlyField label="会社名" value={job.company} />
            <ReadOnlyField label="募集ポジション" value={job.position} />
            <ReadOnlyField label="想定年収" value={job.salary} />
            <ReadOnlyField label="応募経路" value={job.source} />
            <ReadOnlyField label="応募締切・面接日程" value={job.deadline} />
            <ReadOnlyField label="応募要件・スキル" value={job.requirements} />
            <ReadOnlyField label="メモ・備考" value={job.notes} />
          </div>

          {/* アクション */}
          <div className={styles.buttonGroup}>
            <Button variant="text" onClick={() => setShowDeleteDialog(true)}>
              削除
            </Button>
            <Button
              variant="primary"
              onClick={() => onNavigateToDetail(job.id)}
            >
              編集ページへ
            </Button>
          </div>
        </div>

        {/* 削除確認ダイアログ */}
        <ActionDialog
          isOpen={showDeleteDialog}
          title="選考を削除"
          actionText="削除"
          actionTheme="danger"
          onClickAction={handleDelete}
          onClickClose={() => setShowDeleteDialog(false)}
        >
          <Text>
            「{job.company}」の選考を削除しますか？
            <br />
            この操作は取り消せません。
          </Text>
        </ActionDialog>
      </div>
    </>
  );
};
