import type { RxDocument } from "rxdb";
import type { Job } from "../../types/types";
import { getDB } from "./index";
import { v4 as uuidv4 } from "uuid";

/** Jobを新規作成 */
export const insertJob = async (job: Job): Promise<RxDocument<Job>> => {
  const db = await getDB();
  return db.jobs.insert(job);
};

export const createJob = async (
  jobData: Omit<Job, "id" | "updated_at" | "deleted_flag">
) => {
  const newJob: Job = {
    id: uuidv4(),
    updated_at: new Date().toISOString(),
    deleted_flag: false,
    ...jobData,
  };
  return insertJob(newJob);
};

/** Job一覧を取得（削除されていないもののみ） */
export const fetchJobs = async (): Promise<Job[]> => {
  const db = await getDB();
  const docs = await db.jobs
    .find({
      selector: {
        deleted_flag: { $ne: true },
      },
    })
    .exec();
  return docs.map((doc) => doc.toJSON());
};

/** 特定のJobを取得 */
export const fetchJobById = async (id: string): Promise<Job | null> => {
  const db = await getDB();
  const doc = await db.jobs.findOne({ selector: { id } }).exec();
  return doc ? doc.toJSON() : null;
};

/** Jobを更新 */
export const updateJob = async (
  id: string,
  updates: Partial<Omit<Job, "id">>
) => {
  const db = await getDB();
  const doc = await db.jobs.findOne({ selector: { id } }).exec();
  if (!doc) throw new Error("Job not found");

  const updatedDoc = await doc.patch({
    ...updates,
    updated_at: new Date().toISOString(),
  });
  return updatedDoc.toJSON();
};

/** Jobを削除（ソフトデリート） */
export const deleteJob = async (id: string) => {
  const db = await getDB();
  const doc = await db.jobs.findOne({ selector: { id } }).exec();
  if (!doc) throw new Error("Job not found");
  await doc.patch({
    deleted_flag: true,
    updated_at: new Date().toISOString(),
  });
};
