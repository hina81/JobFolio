import { useState, useEffect, useCallback } from "react";
import { db } from "../lib/db";
import type { Job, JobStatus } from "../types/types";

export const useJobs = () => {
  const [jobData, setJobData] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const jobs = await db.applications
        .filter((job) => !job.deleted_flag)
        .toArray();
      setJobData(jobs);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStatus = async (id: string, newStatus: JobStatus) => {
    await db.applications.update(id, {
      status: newStatus,
      updated_at: new Date().toISOString(),
    });
    setJobData((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
    );
  };

  const deleteJob = async (id: string) => {
    await db.applications.update(id, {
      deleted_flag: true,
      updated_at: new Date().toISOString(),
    });
    setJobData((prev) => prev.filter((job) => job.id !== id));
  };

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // visibilitychange を監視し、タブがアクティブに戻った際に最新データを再取得する(useJobs 内でデータ同期処理を完結させる)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") loadJobs();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [loadJobs]);

  return { jobData, isLoading, loadJobs, updateStatus, deleteJob };
};
