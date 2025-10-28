import type { ReactNode } from "react";
import { createContext, useState, useCallback } from "react";

const LoadingContext = createContext<{
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

const LoadingProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const startLoading = useCallback(() => setLoading(true), []);

  const stopLoading = useCallback(() => setLoading(false), []);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
