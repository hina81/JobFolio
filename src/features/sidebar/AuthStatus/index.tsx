import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  Text,
  FaRightFromBracketIcon,
  FaRightToBracketIcon,
} from "smarthr-ui";

import styles from "./style.module.css";
import { useFirebaseAuthContext } from "../../../hooks/useFirebaseAuthContext";
import { useNavigate } from "react-router-dom";

export const AuthStatus = () => {
  const { currentUser, logout } = useFirebaseAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      {currentUser ? (
        <Dropdown>
          <DropdownTrigger>
            <div className={styles.userInfo}>
              <Text size="s">{currentUser.displayName}</Text>
              <Text size="xs" color="gray">
                {currentUser.email}
              </Text>
            </div>
          </DropdownTrigger>

          <DropdownContent className={styles.dropdownContent}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              <FaRightFromBracketIcon className={styles.logoutIcon} />
              <span>ログアウト</span>
            </button>
          </DropdownContent>
        </Dropdown>
      ) : (
        <div className={styles.loginPrompt} onClick={handleLogin}>
          <div className={styles.loginIcon}>
            <FaRightToBracketIcon />
          </div>

          <Text size="xs" color="gray">
            クリックしてログイン
          </Text>
        </div>
      )}
    </>
  );
};
