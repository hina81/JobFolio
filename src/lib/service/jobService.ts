import { v4 as uuidv4 } from "uuid";
import type { Job, JobStatus } from "../../types/types";
import { insertJob } from "../db/api";

export function createEmptyJob(overrides: Partial<Job> = {}): Job {
  return {
    id: uuidv4(),
    company: "",
    position: "",
    status: "未応募" as JobStatus,
    salary: "",
    source: "",
    deadline: "",
    requirements: "",
    notes: "",
    updated_at: new Date().toISOString(),
    deleted_flag: false,
    ...overrides,
  };
}

/** フォームデータからJobを生成 */
export function createJobFromForm(formData: Partial<Job>): Job {
  return {
    ...createEmptyJob(),
    ...formData,
  };
}

/** 新規応募を作成してDBに保存 */
export async function createNewApplication(): Promise<string> {
  const newJob = createEmptyJob();
  const result = await insertJob(newJob);
  return result.toJSON().id;
}
