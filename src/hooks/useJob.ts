import { useState, useEffect, useCallback } from "react";
import type { Job, JobStatus } from "../types/types";
import { fetchJobs, updateJob, deleteJob } from "../lib/db/api";
import { createNewApplication } from "../lib/service/jobService";

export const useJobs = () => {
  const [jobData, setJobData] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const jobs = await fetchJobs();
      setJobData(jobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      console.error("Failed to load jobs:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStatus = async (id: string, newStatus: JobStatus) => {
    try {
      const updatedJob = await updateJob(id, { status: newStatus });
      setJobData((prev) =>
        prev.map((job) =>
          job.id === id
            ? { ...job, status: newStatus, updated_at: updatedJob.updated_at }
            : job
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update job status"
      );
      console.error("Failed to update job status:", err);
      await loadJobs();
    }
  };

  const removeJob = async (id: string) => {
    try {
      await deleteJob(id);
      setJobData((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete job");
      console.error("Failed to delete job:", err);
      await loadJobs();
    }
  };

  const createNewJob = async (): Promise<string> => {
    try {
      const newJobId = await createNewApplication();
      // 新しく作成されたジョブをリストに追加するため、最新データを再取得
      await loadJobs();
      return newJobId;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create new job");
      console.error("Failed to create new job:", err);
      throw err;
    }
  };

  const updateJobField = async <K extends keyof Job>(
    id: string,
    field: K,
    value: Job[K]
  ) => {
    try {
      const updates = { [field]: value };
      const updatedJob = await updateJob(id, updates);
      setJobData((prev) =>
        prev.map((job) =>
          job.id === id
            ? { ...job, ...updates, updated_at: updatedJob.updated_at }
            : job
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : `Failed to update ${field}`
      );
      console.error(`Failed to update ${field}:`, err);

      // エラー時は最新データを再取得
      await loadJobs();
    }
  };

  // 初期データ読み込み
  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // visibilitychange を監視し、タブがアクティブに戻った際に最新データを再取得する
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadJobs();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [loadJobs]);

  return {
    // データ
    jobData,
    isLoading,
    error,

    // 操作
    loadJobs,
    updateStatus,
    removeJob,
    createNewJob,
    updateJobField,

    // エラーリセット
    clearError: () => setError(null),
  };
};
