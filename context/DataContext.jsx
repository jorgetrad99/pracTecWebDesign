import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState();
  const [rowsJSON, setRowsJSON] = useState([
    {
      name: "Jorge",
      surnames: "Jorge",
      dateOfBirth: "22/02/2022",
      age: 0,
      genre: "male",
      interests: {
          football: true,
          volleybal: true,
          other: "Basketball"
      }
  }
  ]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        rowsJSON,
        setRowsJSON,
      }}>
      {children}
    </DataContext.Provider>
  );
};
