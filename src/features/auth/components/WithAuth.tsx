import { FlexBox } from "../../../components/Base/FlexBox";
import { Base, Button } from "smarthr-ui";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuthContext } from "../../../hooks/useFirebaseAuthContext";

export const WithAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthPath } = useFirebaseAuthContext();
  const navigate = useNavigate();

  if (isAuthPath === undefined) {
    return <Base>読み込み中...</Base>;
  }

  if (isAuthPath === false) {
    return (
      <FlexBox gap={64} justify="flex-start" pt={64}>
        <p>Googleアカウントが連携されていません</p>
        <Button
          variant="primary"
          size="default"
          onClick={() => navigate("/token")}
        >
          Google連携ページへ
        </Button>
      </FlexBox>
    );
  }

  return <>{children}</>;
};
