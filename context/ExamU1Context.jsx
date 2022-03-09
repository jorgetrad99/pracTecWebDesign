import { createContext, useState } from 'react';

export const ExamU1Context = createContext();

export const ExamU1Provider = ({ children }) => {
  const [data, setData] = useState();
  const [rowsJSON, setRowsJSON] = useState([
    /* {
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
  } */
  ]);

  return (
    <ExamU1Context.Provider
      value={{
        data,
        setData,
        rowsJSON,
        setRowsJSON,
      }}>
      {children}
    </ExamU1Context.Provider>
  );
};
