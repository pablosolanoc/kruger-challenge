import React, { createContext, useContext, useMemo, useState } from "react";
import { EmployeeDto } from "types/dtos/employeeDto";

interface EditingEmployeeProviderProps {
  children: React.ReactNode;
}

export interface EditingEmployeeContextProps {
  editingEmployee: boolean;
  employeeBeignEdited: EmployeeDto;
  setEmployeeBeignEdited: React.Dispatch<React.SetStateAction<EmployeeDto>>;
}

export const EditingEmployeeContext = createContext(
  {} as EditingEmployeeContextProps
);

function EditingEmployeeProvider({ children }: EditingEmployeeProviderProps) {
  const [employeeBeignEdited, setEmployeeBeignEdited] = useState(
    {} as EmployeeDto
  );

  const value = {
    editingEmployee: Object.keys(employeeBeignEdited).length > 0,
    employeeBeignEdited: employeeBeignEdited,
    setEmployeeBeignEdited: setEmployeeBeignEdited,
  };

  return (
    <EditingEmployeeContext.Provider value={value}>
      {children}
    </EditingEmployeeContext.Provider>
  );
}

export const useEditingEmployee = () => useContext(EditingEmployeeContext);

export default EditingEmployeeProvider;
