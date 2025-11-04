import { FlexBox } from "../../../components/Base/FlexBox";
import { Button } from "smarthr-ui";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuthContext } from "../../../hooks/useFirebaseAuthContext";
import { LoadingCover } from "../../../components/Base/Loading";

export const WithAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthPath } = useFirebaseAuthContext();
  const navigate = useNavigate();

  if (isAuthPath === undefined) {
    return <LoadingCover />;
  }

  if (isAuthPath === false) {
    return (
      <FlexBox gap={64} justify="flex-start" pt={64}>
        <p>Googleアカウントが連携されていません</p>
        <Button
          variant="primary"
          size="default"
          onClick={() => navigate("/login")}
        >
          Google連携ページへ
        </Button>
      </FlexBox>
    );
  }

  return <>{children}</>;
};
