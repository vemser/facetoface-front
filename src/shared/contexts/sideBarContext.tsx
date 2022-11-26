import React, { createContext, useContext, useState } from "react";

interface ISideBarContext {
  isOpen: boolean;
  toggleOpen: () => void;
}

interface IChildren {
  children: React.ReactNode;
}

const SideBarContext = createContext({} as ISideBarContext);

export const SideBarProvider: React.FC<IChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <SideBarContext.Provider value={{ isOpen, toggleOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBar = () => {
  return useContext(SideBarContext);
};
