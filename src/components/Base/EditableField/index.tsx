import { Input, Text } from "smarthr-ui";
import type { Job, JobStatus } from "../../../types/types";
import styles from "./style.module.css";
import {
  formatDisplayValue,
  formatInputValue,
  formatSaveValue,
} from "../../../utils/fieldUtils";
import { useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";

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

  // ローカル状態を管理
  const [localValue, setLocalValue] = useState(inputValue);
  const [debouncedValue] = useDebounce(localValue, 500);

  // 初回実行を防ぐためのref
  const isInitialMount = useRef(true);

  // 外部からのvalue変更時にローカル状態を同期
  useEffect(() => {
    setLocalValue(inputValue);
  }, [inputValue]);

  // デバウンス後の処理（初回実行を除く）
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // 元の値と異なる場合のみonChangeを呼ぶ
    if (debouncedValue !== inputValue) {
      const newValue = formatSaveValue(debouncedValue);
      onChange(fieldName, newValue);
    }
  }, [debouncedValue, fieldName, onChange, inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    // Blur時は最新のローカル値で保存
    const newValue = formatSaveValue(localValue);
    if (newValue !== formatSaveValue(inputValue)) {
      onChange(fieldName, newValue);
    }
    onSave(fieldName);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Enter時は最新のローカル値で保存
      const newValue = formatSaveValue(localValue);
      if (newValue !== formatSaveValue(inputValue)) {
        onChange(fieldName, newValue);
      }
      onSave(fieldName);
    }
    if (e.key === "Escape") {
      // Escape時は元の値に戻す
      setLocalValue(inputValue);
      onCancel(fieldName);
    }
  };

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
          value={localValue} // ローカル状態を表示
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
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
