"use client";

import React, { createContext, useContext, useState } from "react";

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

export function useFurnitureFreeformControls() {
  const [enable, setEnable] = useState<boolean[]>(Array());

  return {
    enable,
    setEnable,
  };
}
