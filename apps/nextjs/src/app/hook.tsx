"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

interface ShowListContextType {
  showList: boolean;
  setShowList: (value: boolean) => void;
}

const ShowListContext = createContext<ShowListContextType | undefined>(
  undefined,
);

export function useShowList() {
  const context = useContext(ShowListContext);
  if (context === undefined) {
    throw new Error("useShowList must be used within a ShowListProvider");
  }
  return context;
}

export function ShowListProvider({ children }: { children: React.ReactNode }) {
  const [showList, setShowList] = useState(true);

  return (
    <ShowListContext.Provider value={{ showList, setShowList }}>
      {children}
    </ShowListContext.Provider>
  );
}

export function useOrbitControls() {
  const [enable, setEnable] = useState(false);

  return {
    enable,
    setEnable,
  };
}

interface FreeFormControlContextType {
  enable: boolean[];
  setEnable: (value: boolean[]) => void;
}

const FreeFormContext = createContext<FreeFormControlContextType | undefined>(
  undefined,
);

export function useFurnitureFreeformControls() {
  const context = useContext(FreeFormContext);

  if (context === undefined) {
    throw new Error(
      "useFurnitureFreeformControls must be used within a FurnitureFreeFormProvider",
    );
  }

  return context;
}

export function FurnitureFreeFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enable, setEnable] = useState<boolean[]>(Array());

  return (
    <FreeFormContext.Provider value={{ enable, setEnable }}>
      {children}
    </FreeFormContext.Provider>
  );
}
