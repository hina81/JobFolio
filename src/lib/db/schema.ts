import { JOB_STATUS_OPTIONS } from "../../types/types";

// Define your schema
export const jobSchema = {
  title: "job schema",
  version: 0,
  description: "Describes a job in your app",
  primaryKey: "id",
  type: "object",
  properties: {
    id: { type: "string", maxLength: 100 },
    company: { type: "string" },
    status: { type: "string", enum: JOB_STATUS_OPTIONS },
    deadline: { type: "string" },
    source: { type: "string" },
    salary: { type: "string" },
    position: { type: "string" },
    requirements: { type: "string" },
    notes: { type: "string" },
    updated_at: { type: "string", format: "date-time" },
    deleted_flag: { type: "boolean", default: false },
  },
  required: [
    "id",
    "company",
    "status",
    "deadline",
    "source",
    "salary",
    "updated_at",
  ],
};
