import { Table, Td } from "smarthr-ui";
import style from "./style.module.css";
import type { Job, JobStatus } from "../../../types/types";
import { StatusSelector } from "../../Base/StatusSelector";
import { JobTableHeader } from "../JobTableHeader";

interface JobTableProps {
  jobs: Job[];
  onJobSelect?: (job: Job) => void;
  onStatusChange: (jobId: string, newStatus: JobStatus) => void;
}

export const JobTable = ({
  jobs,
  onJobSelect,
  onStatusChange,
}: JobTableProps) => {
  return (
    <Table className={style.table}>
      <JobTableHeader />
      <tbody>
        {jobs.map((job) => (
          <tr
            key={job.id}
            className={style.tableRow}
            onClick={() => onJobSelect?.(job)}
          >
            <Td className={`${style.cell} ${style.companyCell}`}>
              {job.company}
            </Td>
            <Td
              className={`${style.cell} ${style.statusCell}`}
              onClick={(e) => e.stopPropagation()}
            >
              <StatusSelector
                currentStatus={job.status}
                onStatusChange={(newStatus) =>
                  onStatusChange(job.id, newStatus)
                }
              />
            </Td>
            <Td className={`${style.cell} ${style.deadlineCell}`}>
              {job.deadline}
            </Td>
            <Td className={`${style.cell} ${style.sourceCell}`}>
              {job.source}
            </Td>
            <Td className={`${style.cell} ${style.salaryCell}`}>
              {job.salary}
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
