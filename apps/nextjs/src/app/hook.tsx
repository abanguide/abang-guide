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
