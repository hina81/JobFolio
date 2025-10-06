import type { Job } from "../types/types";
import { STATUS_CATEGORIES } from "../types/types";

export const filterJobs = (jobs: Job[], filter: string): Job[] => {
  if (filter === "all") {
    return jobs;
  }

  const category = STATUS_CATEGORIES[filter as keyof typeof STATUS_CATEGORIES];
  if (!category) {
    return jobs;
  }

  return jobs.filter((job) =>
    (category.statuses as readonly string[]).includes(job.status)
  );
};
