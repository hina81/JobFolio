import { z } from "zod";

// 選考データの型定義
export interface Job {
  id: string;
  company: string;
  status: JobStatus;
  deadline: string;
  source: string;
  salary: string;
  position?: string;
  requirements?: string;
  notes?: string;
  updated_at: string;
  deleted_flag?: boolean; // 論理削除用フラグ
}

// Zodスキーマでステータスを定義
export const JobStatusSchema = z.enum([
  "未応募",
  "書類選考中",
  "コーディングテスト",
  "一次面接",
  "二次面接",
  "三次面接",
  "最終面接",
  "通過",
  "不採用",
]);

// 型定義をZodから自動生成
export type JobStatus = z.infer<typeof JobStatusSchema>;

// ステータスオプション配列をZodから自動生成
export const JOB_STATUS_OPTIONS = JobStatusSchema.options;

// ステータス分類の定義
export const STATUS_CATEGORIES = {
  all: {
    label: "すべて",
    statuses: JOB_STATUS_OPTIONS,
  },
  未応募: {
    label: "未応募",
    statuses: ["未応募"] as const,
  },
  書類選考中: {
    label: "書類選考中",
    statuses: ["書類選考中"] as const,
  },
  コーディングテスト: {
    label: "コーディングテスト",
    statuses: ["コーディングテスト"] as const,
  },
  面接: {
    label: "面接",
    statuses: ["一次面接", "二次面接", "三次面接", "最終面接"] as const,
  },
  通過: {
    label: "通過",
    statuses: ["通過"] as const,
  },
  不採用: {
    label: "不採用",
    statuses: ["不採用"] as const,
  },
} as const;
