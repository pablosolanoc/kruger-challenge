import React, { createContext, useContext, useMemo, useState } from "react";
import { FiltersType, VaccinationtypeType } from "types/filters";
import { VaccinationStatusFilterEnum } from "enums/vaccinationStatus";

interface FiltersProviderProps {
  children: React.ReactNode;
}

export type FiltersContextProps = FiltersType & {
  setDateLowerFilter: React.Dispatch<React.SetStateAction<string>>;
  setDateHigherFilter: React.Dispatch<React.SetStateAction<string>>;
  setVaccinationStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  setVaccineTypeFilter: React.Dispatch<
    React.SetStateAction<VaccinationtypeType>
  >;
};

export const FiltersContext = createContext({} as FiltersContextProps);

function FiltersProvider({ children }: FiltersProviderProps) {
  const [dateLowerFilter, setDateLowerFilter] = useState("");
  const [dateHigherFilter, setDateHigherFilter] = useState("");
  const [vaccinationStatusFilter, setVaccinationStatusFilter] = useState(
    VaccinationStatusFilterEnum.ALL as string
  );
  const [vaccineTypeFilter, setVaccineTypeFilter] = useState({
    sputnik: true,
    astrazeneca: true,
    pfizer: true,
    jj: true,
  });

  const value = {
    vaccinationstate: vaccinationStatusFilter,
    lowerDate: dateLowerFilter,
    higherDate: dateHigherFilter,
    vaccinationtype: vaccineTypeFilter,
    setDateLowerFilter: setDateLowerFilter,
    setDateHigherFilter: setDateHigherFilter,
    setVaccinationStatusFilter: setVaccinationStatusFilter,
    setVaccineTypeFilter: setVaccineTypeFilter,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}

export const useFilters = () => useContext(FiltersContext);

export default FiltersProvider;
