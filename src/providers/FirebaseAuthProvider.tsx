import type { User } from "firebase/auth";
import { signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { auth } from "../lib/firebase";
import { LoadingCover } from "../components/Base/Loading";
import { useLocation, useNavigate } from "react-router-dom";

const nonAuthPaths = ["/", "/login", "/signup"];
const provider = new GoogleAuthProvider();

const FirebaseAuthContext = createContext<{
  currentUser: User | null | undefined;
  uid: string | null | undefined;
  login: () => void;
  logout: () => Promise<void>;
  isAuthPath: boolean;
}>({
  currentUser: undefined,
  uid: undefined,
  login: async () => {},
  logout: async () => {},
  isAuthPath: false,
});

const FirebaseAuthProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const [uid, setUid] = useState<string | null | undefined>(undefined);
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const isAuthPath = useMemo(
    () => !nonAuthPaths.includes(pathname),
    [pathname]
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // ログイン不要なページではなにもしない
      if (!isAuthPath) {
        if (user) {
          setCurrentUser(user);
          setUid(user.uid);
        } else {
          setCurrentUser(null);
          setUid(null);
        }
        return;
      }

      if (!user) {
        setCurrentUser(null);
        setUid(null);
        navigate("/login");
        return;
      }

      setCurrentUser(user);
      setUid(user.uid);
    });
    return () => unsubscribe();
  }, [isAuthPath, navigate]);

  const login = async () => {
    await signInWithPopup(auth, provider);
    // const user = result.user;
    navigate("/");
  };

  const logout = useCallback(async () => {
    await signOut(auth);
    navigate("/login");
  }, [navigate]);

  return (
    <FirebaseAuthContext.Provider
      value={{ currentUser, uid, login, logout, isAuthPath }}
    >
      {currentUser === undefined ? <LoadingCover /> : null}
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthContext, FirebaseAuthProvider };
