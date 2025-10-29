import { useNavigate } from "react-router-dom";
import { useFirebaseAuthContext } from "../hooks/useFirebaseAuthContext";
import { LoginContainer } from "../features/auth/components/LoginContainer";

export const LoginPage = () => {
  const { currentUser } = useFirebaseAuthContext();
  const navigate = useNavigate();

  if (currentUser) {
    navigate("/");
  }

  return <LoginContainer />;
};
