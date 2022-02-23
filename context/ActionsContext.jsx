import { createContext, useState } from 'react';

export const ActionsContext = createContext();

export const ActionsProvider = ({ children }) => {
  //Action -> 1: create, 2: modify, 3: delete
  const [ actionEmployeeFlag, setActionEmployeeFlag ] = useState(0);

  return (
    <ActionsContext.Provider
      value={{
        actionEmployeeFlag,
        setActionEmployeeFlag
      }}>
      {children}
    </ActionsContext.Provider>
  );
};
