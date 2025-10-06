import Dexie, { type EntityTable } from "dexie";
import type { Job } from "../types/types";
import { v4 as uuidv4 } from "uuid";

const db = new Dexie("JobApplicationDatabase") as Dexie & {
  applications: EntityTable<Job, "id">;
};

// Schema declaration:
db.version(1).stores({
  applications:
    "id, company, position, status, salary, source, deadline, requirements, notes, updated_at, deleted_flag",
});

// IndexedDBを初期化する関数
export const initializeDB = async () => {
  try {
    await db.open();
  } catch (error) {
    console.error("Failed to initialize IndexedDB:", error);
  }
};

// UUID生成
export const generateUUID = (): string => {
  return uuidv4();
};

// 新規アプリケーション作成関数
export const createNewApplication = async (): Promise<string> => {
  const newId = generateUUID();
  const newJob: Job = {
    id: newId,
    company: "",
    position: "",
    status: "未応募",
    salary: "",
    source: "",
    deadline: "",
    requirements: "",
    notes: "",
    updated_at: new Date().toISOString(),
    deleted_flag: false,
  };

  await db.applications.add(newJob);
  return newId;
};

export { db };
