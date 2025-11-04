import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Heading, Table, Base } from "smarthr-ui";

import { JobTable } from "../features/table/components/JobTable";
import { JobTableHeader } from "../features/table/components/JobTableHeader";
import { EmptyState } from "../components/PageState/EmptyState";
import { JobDetailPanel } from "../features/jobDetail/JobDetailPanel";
import { filterJobs } from "../utils/jobFilter";
import type { Job } from "../types/types";
import { useJobs } from "../hooks/useJob";
import { Sidebar } from "../features/sidebar/Sidebar";
import { TableActions } from "../features/table/TableActions";
import { LoadingCover } from "../components/Base/Loading";

export const DashboardPage = () => {
  const { jobData, isLoading, updateStatus, removeJob } = useJobs();
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const navigate = useNavigate();

  const filteredJobData = useMemo(
    () => filterJobs(jobData, currentFilter),
    [jobData, currentFilter]
  );

  return (
    <Base style={{ minHeight: "100vh" }}>
      <div style={{ display: "flex" }}>
        {/* サイドバー */}
        <Sidebar
          jobData={jobData}
          onNavigate={setCurrentSection}
          onFilterByStatus={setCurrentFilter}
          currentSection={currentSection}
          currentFilter={currentFilter}
        />

        {/* メイン */}
        <div
          style={{
            marginLeft: "280px",
            flex: 1,
            padding: "2rem",
            minHeight: "100vh",
          }}
        >
          <Stack gap={2}>
            <Heading tag="h1">選考管理ダッシュボード</Heading>
            <TableActions />

            {isLoading ? (
              <LoadingCover />
            ) : filteredJobData.length > 0 ? (
              <JobTable
                jobs={filteredJobData}
                onJobSelect={setSelectedJob}
                onStatusChange={updateStatus}
              />
            ) : (
              <Table>
                <JobTableHeader />
                <tbody>
                  <EmptyState />
                </tbody>
              </Table>
            )}
          </Stack>
        </div>
      </div>

      {/* 右ペイン */}
      {selectedJob && (
        <JobDetailPanel
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onDeleteJob={(id) => {
            removeJob(id);
            setSelectedJob(null);
          }}
          onNavigateToDetail={(id) => {
            setSelectedJob(null);
            navigate(`/jobs/${id}`);
          }}
        />
      )}
    </Base>
  );
};
