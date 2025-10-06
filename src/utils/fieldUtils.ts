// 表示用: undefined/空文字/nullを"未入力"に変換
export const formatDisplayValue = (
  value: string | number | undefined | null
): string => {
  if (value === null || value === undefined || value === "") return "未入力";
  return String(value);
};

// 入力用: undefined/空文字/"未入力"/nullを空文字に変換
export const formatInputValue = (
  value: string | number | undefined | null
): string => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    value === "未入力"
  )
    return "";
  return String(value);
};

// UI保存用: 空文字をそのまま返す
export const formatSaveValue = (value: string): string => value;

// DB保存用: 空文字/undefined/"未入力"/nullをnullに変換
export const formatForDatabase = (
  value: string | undefined | null
): string | null => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    value === "未入力"
  )
    return null;
  return value;
};

// DB取得用: nullを"未入力"に変換
export const formatFromDatabase = (
  value: string | null | undefined
): string => {
  return value || "未入力";
};
