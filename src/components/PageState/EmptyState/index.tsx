import { Td, Text } from "smarthr-ui";
import styles from "./style.module.css";

export const EmptyState = () => {
  return (
    <tr>
      <Td colSpan={6}>
        <div className={styles.container}>
          <Text className={styles.message}>
            オブジェクトはまだ登録されていません。
          </Text>
        </div>
      </Td>
    </tr>
  );
};
