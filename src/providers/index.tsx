import { StyleProvider } from "./StyleProvider";
import { LoadingProvider } from "./LoadingProvider";
import { FirebaseAuthProvider } from "./FirebaseAuthProvider";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props): React.ReactNode => {
  return (
    <StyleProvider>
      <LoadingProvider>
        <FirebaseAuthProvider>{children}</FirebaseAuthProvider>
      </LoadingProvider>
    </StyleProvider>
  );
};
