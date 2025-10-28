import { useContext } from "react";
import { FirebaseAuthContext } from "../providers/FirebaseAuthProvider";

export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext);
