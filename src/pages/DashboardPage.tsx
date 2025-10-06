import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Heading, Table, Base } from "smarthr-ui";
import { TableActions } from "../components/Table/TableActions";
import { JobTable } from "../components/Table/JobTable";
import { JobTableHeader } from "../components/Table/JobTableHeader";
import { EmptyState } from "../components/PageState/EmptyState";
import { JobDetailPanel } from "../components/JobDetailPanel";
import { filterJobs } from "../utils/jobFilter";
import type { Job } from "../types/types";
import { useJobs } from "../hooks/useJob";
import { Sidebar } from "../components/Layout/Sidebar";

export const DashboardPage = () => {
  const { jobData, isLoading, updateStatus, deleteJob } = useJobs();
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
              <div style={{ textAlign: "center", padding: "2rem" }}>
                データを読み込み中...
              </div>
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
            deleteJob(id);
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
