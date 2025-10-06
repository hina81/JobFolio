import { Text } from "smarthr-ui";
import styles from "./style.module.css";
import { formatDisplayValue } from "../../../utils/fieldUtils";

interface ReadOnlyFieldProps {
  label: string;
  value: string | undefined;
}

export const ReadOnlyField = ({ label, value }: ReadOnlyFieldProps) => (
  <>
    <Text as="label" className={styles.label}>
      {label}
    </Text>
    <div className={styles.readOnlyField}>{formatDisplayValue(value)}</div>
  </>
);
