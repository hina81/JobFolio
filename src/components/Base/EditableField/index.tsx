import { Input, Text } from "smarthr-ui";
import type { Job, JobStatus } from "../../../types/types";

import styles from "./style.module.css";
import {
  formatDisplayValue,
  formatInputValue,
  formatSaveValue,
} from "../../../utils/fieldUtils";

interface EditableFieldProps {
  label: string;
  fieldName: keyof Job;
  value: string | number;
  isEditing: boolean;
  type?: "text" | "date";
  onEdit: (fieldName: keyof Job) => void;
  onSave: (fieldName: keyof Job) => void;
  onCancel: (fieldName: keyof Job) => void;
  onChange: (field: keyof Job, value: string | JobStatus) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  autoFocus?: boolean;
}

export const EditableField = ({
  label,
  fieldName,
  value,
  isEditing,
  type = "text",
  onEdit,
  onSave,
  onCancel,
  onChange,
  inputRef,
  autoFocus = false,
}: EditableFieldProps) => {
  const displayValue = formatDisplayValue(value);
  const inputValue = formatInputValue(value);

  return (
    <div
      className={`${styles.fieldItem} ${
        isEditing ? styles.editingFieldItem : ""
      }`}
    >
      <Text as="label" className={styles.label}>
        {label}
      </Text>
      {isEditing ? (
        <Input
          ref={inputRef}
          type={type}
          value={inputValue}
          onChange={(e) => {
            const newValue = formatSaveValue(e.target.value);
            onChange(fieldName, newValue);
          }}
          onBlur={() => onSave(fieldName)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave(fieldName);
            if (e.key === "Escape") onCancel(fieldName);
          }}
          autoFocus={autoFocus}
          className={styles.editingInputField}
        />
      ) : (
        <div className={styles.readOnlyField} onClick={() => onEdit(fieldName)}>
          {displayValue}
        </div>
      )}
    </div>
  );
};
