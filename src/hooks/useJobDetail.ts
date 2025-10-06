import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { db } from "../lib/db";
import type { Job } from "../types/types";

export const useJobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [editingField, setEditingField] = useState<keyof Job | null>(null);
  const originalValueRef = useRef<Job[keyof Job] | null>(null);

  useEffect(() => {
    const loadJob = async () => {
      if (!id) return;

      const found = await db.applications.get(id);
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
    };

    loadJob();
  }, [id, navigate, searchParams]);

  const updateJob = async (changes: Partial<Job>) => {
    if (!job) return;
    const updated = {
      ...job,
      ...changes,
      updated_at: new Date().toISOString(),
    };
    await db.applications.update(job.id, updated);
    setJob(updated);
  };

  const startEdit = (field: keyof Job) => {
    if (!job) return;
    setEditingField(field);
    originalValueRef.current = job[field];
  };

  const cancelEdit = () => {
    if (!job || !editingField) return;
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

  const deleteJob = async () => {
    if (!job) return;
    await updateJob({ deleted_flag: true });
    navigate("/", { replace: true });
  };

  return {
    job,
    editingField,
    setJob,
    startEdit,
    cancelEdit,
    saveEdit,
    updateJob,
    deleteJob,
  };
};
