import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  fetchJobById,
  updateJob as updateJobInDB,
  deleteJob as deleteJobFromDB,
} from "../lib/db/api";
import type { Job } from "../types/types";

export const useJobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<keyof Job | null>(null);
  const originalValueRef = useRef<Job[keyof Job] | null>(null);

  const loadJob = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError(null);

      const found = await fetchJobById(id); // 新しいAPI層を使用
      if (!found) {
        navigate("/");
        return;
      }

      setJob(found);

      // 新規作成時、会社名にフォーカスを当てる
      if (searchParams.get("new") === "true" && !found.company) {
        setEditingField("company");
        originalValueRef.current = found.company;
        navigate(`/jobs/${id}`, { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load job");
      console.error("Failed to load job:", err);
      // エラー時はホームに戻る
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate, searchParams]);

  useEffect(() => {
    loadJob();
  }, [loadJob]);

  const updateJob = async (changes: Partial<Job>) => {
    if (!job) return;

    try {
      // 新しいAPI層を使用
      const updatedJob = await updateJobInDB(job.id, changes);

      // ローカル状態を更新
      setJob(updatedJob);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update job");
      console.error("Failed to update job:", err);

      // エラー時は最新データを再取得
      await loadJob();
    }
  };

  const startEdit = (field: keyof Job) => {
    if (!job) return;
    setEditingField(field);
    originalValueRef.current = job[field];
  };

  const cancelEdit = () => {
    if (!job || !editingField) return;

    // 元の値に戻す
    setJob({ ...job, [editingField]: originalValueRef.current });
    setEditingField(null);
  };

  const saveEdit = async () => {
    if (!job || !editingField) return;

    const current = job[editingField];
    const original = originalValueRef.current;

    if (current !== original) {
      await updateJob({ [editingField]: current });
    }

    setEditingField(null);
  };

  const updateJobField = async <JobField extends keyof Job>(
    field: JobField,
    value: Job[JobField]
  ) => {
    if (!job) return;

    try {
      const updates = { [field]: value } as Partial<Job>;
      const updatedJob = await updateJobInDB(job.id, updates);

      // ローカル状態を更新
      setJob(updatedJob);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : `Failed to update ${String(field)}`
      );
      console.error(`Failed to update ${String(field)}:`, err);

      // エラー時は最新データを再取得
      await loadJob();
    }
  };

  const deleteJob = async () => {
    if (!job) return;

    try {
      // 新しいAPI層を使用（ソフトデリート）
      await deleteJobFromDB(job.id);

      // ホームに戻る
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete job");
      console.error("Failed to delete job:", err);
    }
  };

  return {
    // データ
    job,
    isLoading,
    error,
    editingField,

    // 編集操作
    setJob,
    startEdit,
    cancelEdit,
    saveEdit,

    // API操作
    updateJob,
    updateJobField,
    deleteJob,
    loadJob,

    // エラーリセット
    clearError: () => setError(null),
  };
};
