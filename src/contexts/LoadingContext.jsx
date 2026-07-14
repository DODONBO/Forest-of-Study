import { createContext, useContext, useState } from "react";

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [loadingCount, setLoadingCount] = useState(0);

  const startLoading = () => {
    setLoadingCount((prev) => prev + 1);
  };

  const endLoading = () => {
    setLoadingCount((prev) => Math.max(prev - 1, 0));
  };

  const isLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        startLoading,
        endLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading은 LoadingProvider 내부에서 사용해야 합니다.");
  }

  return context;
}