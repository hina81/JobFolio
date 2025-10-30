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
  // 強制保存フラグ
  const forceSaveRef = useRef(false);

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

    // 強制保存の場合はスキップ
    if (forceSaveRef.current) {
      forceSaveRef.current = false;
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

  // 強制保存用の共通処理
  const performForceSave = () => {
    const newValue = formatSaveValue(localValue);
    if (newValue !== formatSaveValue(inputValue)) {
      forceSaveRef.current = true; // デバウンス処理をスキップするフラグ
      onChange(fieldName, newValue);
    }
    onSave(fieldName);
  };

  const handleBlur = () => {
    performForceSave();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performForceSave();
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
