import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { EmployeeDto } from "types/dtos/employeeDto";

interface UserProviderProps {
  children: React.ReactNode;
}

export type UserContextProps = {
  user: EmployeeDto;
  isThereUserLoggedIn: boolean;
  setUser: Dispatch<SetStateAction<EmployeeDto>>;
};

export const UserContext = createContext({} as UserContextProps);

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState({} as EmployeeDto);
  const isThereUserLoggedIn = Object.keys(user).length > 0;

  const value = {
    user: user,
    isThereUserLoggedIn: isThereUserLoggedIn,
    setUser: setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);

export default UserProvider;
