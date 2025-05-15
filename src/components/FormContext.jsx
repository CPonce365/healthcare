import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const useFormData = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    setEntries((prev) => [...prev, entry]);
  };

  return (
    <FormContext.Provider value={{ entries, addEntry }}>
      {children}
    </FormContext.Provider>
  );
};
