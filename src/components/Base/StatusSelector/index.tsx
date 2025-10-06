import {
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  FaAngleDownIcon,
} from "smarthr-ui";
import type { JobStatus } from "../../../types/types";
import { JOB_STATUS_OPTIONS } from "../../../types/types";
import styles from "./style.module.css";

interface StatusSelectorProps {
  currentStatus: JobStatus;
  onStatusChange: (newStatus: JobStatus) => void;
}

export const StatusSelector = ({
  currentStatus,
  onStatusChange,
}: StatusSelectorProps) => {
  const handleStatusClick = (status: JobStatus) => {
    onStatusChange(status);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className={styles.badgeContainer}>
          <Badge>{currentStatus}</Badge>
          <FaAngleDownIcon size="S" />
        </div>
      </DropdownTrigger>

      <DropdownContent className={styles.dropdownContent}>
        {/* ステータス一覧 */}
        {JOB_STATUS_OPTIONS.map((status) => (
          <div
            key={status}
            className={styles.dropdownItem}
            onClick={() => handleStatusClick(status)}
          >
            <Badge>{status}</Badge>
          </div>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
