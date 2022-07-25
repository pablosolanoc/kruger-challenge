import { getQuery } from "api/querier";
import { employeeSlug, endPointRoute } from "constants/apiEndPoints";
import { VaccinationStatusFilterEnum } from "enums/vaccinationStatus";
import { VaccinationTypesEnum } from "enums/vaccinationTypes";
import { EmployeeDto } from "types/dtos/employeeDto";
import { VaccinationtypeType } from "types/filters";

export const addVaccinationStateFilter = (query: string, filter: string) => {
  if (filter !== VaccinationStatusFilterEnum.ALL) {
    return query + "?vaccinationstate=" + filter;
  }
  return query + "?";
};

export const addVaccinationTypeFilter = (
  query: string,
  filter: VaccinationtypeType
) => {
  if (filter.sputnik) {
    query = query + "&vaccine=" + VaccinationTypesEnum.SPUTNIK;
  }
  if (filter.astrazeneca) {
    query = query + "&vaccine=" + VaccinationTypesEnum.ASTRAZENECA;
  }
  if (filter.pfizer) {
    query = query + "&vaccine=" + VaccinationTypesEnum.PFIZER;
  }
  if (filter.jj) {
    query = query + "&vaccine=" + VaccinationTypesEnum.JJ;
  }
  if (!filter.sputnik && !filter.astrazeneca && !filter.pfizer && !filter.jj) {
    query = query + "&vaccine=" + VaccinationTypesEnum.NONE;
  }
  return query;
};

export const searchForExistingEmployee = async (new_employee: EmployeeDto) => {
  const identificationToSearch = new_employee.identification
    ? new_employee.identification?.toString()
    : "";

  const existingEmployee = await getQuery(
    addIdentificationFilterToQuery(
      `${endPointRoute}${employeeSlug}`,
      identificationToSearch
    )
  );
  console.log(existingEmployee);
  const isThereAEmployeeWithThatIdentification = existingEmployee.length > 0;
  return isThereAEmployeeWithThatIdentification;
};

export const addIdentificationFilterToQuery = (
  baseUrl: string,
  identification: string
) => {
  let allUrl = baseUrl;
  if (identification !== "") {
    allUrl = allUrl + "?identification=" + identification;
  }
  return allUrl;
};
