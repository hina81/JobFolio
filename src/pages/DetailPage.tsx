import { Base, Heading, Button, Text, ActionDialog } from "smarthr-ui";
import { useNavigate } from "react-router-dom";
import { useJobDetail } from "../hooks/useJobDetail";
import { StatusSelector } from "../components/Base/StatusSelector";
import { EditableField } from "../components/Base/EditableField";
import type { JobStatus } from "../types/types";
import { useState } from "react";

export const DetailPage = () => {
  const navigate = useNavigate();
  const {
    job,
    editingField,
    setJob,
    startEdit,
    cancelEdit,
    saveEdit,
    updateJob,
    deleteJob,
  } = useJobDetail();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    await deleteJob();
    setShowDeleteDialog(false);
  };

  if (!job) {
    return (
      <Base>
        <Text>選考が見つかりません。</Text>
      </Base>
    );
  }

  return (
    <Base style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <div style={styles.container}>
        {/* ヘッダー */}
        <div style={styles.header}>
          <div style={styles.headerActions}>
            <Heading tag="h1">{job.company}</Heading>
            <StatusSelector
              currentStatus={job.status}
              onStatusChange={(s: JobStatus) => updateJob({ status: s })}
            />
          </div>
        </div>

        {/* コンテンツ */}
        <div style={styles.content}>
          <div style={styles.fieldGrid}>
            <EditableField
              label="会社名"
              fieldName="company"
              value={job.company}
              isEditing={editingField === "company"}
              onEdit={startEdit}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={(f, v) => setJob({ ...job, [f]: v })}
              autoFocus={true}
            />
            <EditableField
              label="募集ポジション"
              fieldName="position"
              value={job.position || ""}
              isEditing={editingField === "position"}
              onEdit={startEdit}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={(f, v) => setJob({ ...job, [f]: v })}
            />
            <EditableField
              label="想定年収"
              fieldName="salary"
              value={job.salary}
              isEditing={editingField === "salary"}
              onEdit={startEdit}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={(f, v) => setJob({ ...job, [f]: v })}
            />
            <EditableField
              label="応募経路"
              fieldName="source"
              value={job.source}
              isEditing={editingField === "source"}
              onEdit={startEdit}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={(f, v) => setJob({ ...job, [f]: v })}
            />
            <EditableField
              label="応募締切・面接日程"
              fieldName="deadline"
              value={job.deadline}
              isEditing={editingField === "deadline"}
              type="date"
              onEdit={startEdit}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={(f, v) => setJob({ ...job, [f]: v })}
            />
            <EditableField
              label="応募要件・スキル"
              fieldName="requirements"
              value={job.requirements || ""}
              isEditing={editingField === "requirements"}
              onEdit={startEdit}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={(f, v) => setJob({ ...job, [f]: v })}
            />
            <EditableField
              label="メモ・備考"
              fieldName="notes"
              value={job.notes || ""}
              isEditing={editingField === "notes"}
              onEdit={startEdit}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={(f, v) => setJob({ ...job, [f]: v })}
            />
          </div>

          {/* アクション */}
          <div style={styles.buttonGroup}>
            <Button variant="text" onClick={() => navigate("/")}>
              ← ダッシュボードに戻る
            </Button>
            <div style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
              <Button variant="text" onClick={() => setShowDeleteDialog(true)}>
                削除
              </Button>
            </div>
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
    </Base>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
  },
  header: {
    marginBottom: "3rem",
    borderBottom: "1px solid #e9ecef",
    paddingBottom: "2rem",
  },
  headerActions: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    padding: "2rem 0",
    marginTop: "2rem",
  },
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    gap: "1rem 2rem",
    alignItems: "start",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-start",
    marginTop: "2rem",
    paddingTop: "2rem",
    borderTop: "1px solid #e9ecef",
  },
};
