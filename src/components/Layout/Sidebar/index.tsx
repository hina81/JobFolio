import { Stack, Heading, Badge, Text } from "smarthr-ui";
import { NewApplicationButton } from "../../Base/NewApplicationButton";
import type { Job } from "../../../types/types";
import { STATUS_CATEGORIES } from "../../../types/types";
import style from "./style.module.css";

interface SidebarProps {
  jobData: Job[];
  onNavigate: (section: string) => void;
  onFilterByStatus: (status: string) => void;
  currentSection?: string;
  currentFilter?: string;
}

export const Sidebar = ({
  jobData,
  onFilterByStatus,
  currentFilter = "all",
}: SidebarProps) => {
  // ステータス別の統計を動的に計算
  const getStatusCount = (categoryKey: string) => {
    if (categoryKey === "all") {
      return jobData.length;
    }

    const category =
      STATUS_CATEGORIES[categoryKey as keyof typeof STATUS_CATEGORIES];
    if (!category) return 0;

    return jobData.filter((job) =>
      (category.statuses as readonly string[]).includes(job.status)
    ).length;
  };

  // フィルタリスト作成
  const statusFilters = Object.entries(STATUS_CATEGORIES).map(
    ([key, category]) => ({
      key,
      label: category.label,
      count: getStatusCount(key),
    })
  );

  return (
    <div className={style.container}>
      <Stack gap={2}>
        {/* ロゴ・アプリ名 */}
        <div className={style.header}>
          <Heading tag="h2">JobFolio</Heading>
          <Text className={style.appDescription}>就活管理ダッシュボード</Text>
        </div>

        {/* 選考追加ボタン */}
        <div className={style.buttonContainer}>
          <NewApplicationButton size="s" />
        </div>

        {/* ステータス別フィルタ */}
        <div>
          <Text className={style.sectionTitle}>ステータス別フィルター</Text>
          <Stack gap={0.25}>
            {statusFilters.map((filter) => (
              <div
                key={filter.key}
                onClick={() => onFilterByStatus(filter.key)}
                className={`${style.filterItem} ${
                  filter.key === currentFilter
                    ? style.filterItemActive
                    : style.filterItemInactive
                }`}
              >
                <Text className={style.filterLabel}>{filter.label}</Text>
                <Badge>{filter.count}</Badge>
              </div>
            ))}
          </Stack>
        </div>
      </Stack>
    </div>
  );
};
