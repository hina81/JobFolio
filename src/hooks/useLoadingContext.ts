import { useContext } from "react";
import { LoadingContext } from "../providers/LoadingProvider";

export const useLoadingContext = () => useContext(LoadingContext);
