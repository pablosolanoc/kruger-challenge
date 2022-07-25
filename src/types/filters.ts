export type VaccinationtypeType = {
  sputnik: boolean;
  astrazeneca: boolean;
  pfizer: boolean;
  jj: boolean;
};

export type FiltersType = {
  identification?: string;
  vaccinationstate: string;
  vaccinationtype: VaccinationtypeType;
  lowerDate: string;
  higherDate: string;
};
