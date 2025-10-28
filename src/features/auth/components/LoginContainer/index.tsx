import { Button } from "smarthr-ui";
import { FlexBox } from "../../../../components/Base/FlexBox";
import styles from "./style.module.css";
import { useContext } from "react";
import { FirebaseAuthContext } from "../../../../providers/FirebaseAuthProvider";

// const Links = () => {
//   return (
//     <div className={styles.links}>
//       <TextLink href="/signup">新規登録はこちら</TextLink>
//     </div>
//   );
// };

const Heading = () => {
  return (
    <div className={styles.headingContainer}>
      <p className={styles.description}>
        「めんどくさい！」を卒業
        <br />
        応募・面接・スケジュール管理を一気に解決
      </p>
      <div className={styles.heading}>
        <h1 className={styles.title}>JobFolio</h1>
      </div>
    </div>
  );
};

const LoginButton = () => {
  const { login } = useContext(FirebaseAuthContext);
  return (
    <Button
      variant="primary"
      size="default"
      onClick={login}
      className={styles.googleButton}
    >
      Googleでログイン
    </Button>
  );
};

export const LoginContainer = () => {
  return (
    <div className={styles.container}>
      <FlexBox gap={24} justify="flex-start" pt={48} pb={50}>
        <Heading />
        <LoginButton />
      </FlexBox>
    </div>
  );
};
