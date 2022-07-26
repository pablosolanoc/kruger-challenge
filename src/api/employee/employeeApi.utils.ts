import { getQuery } from "api/querier";
import { employeeSlug, endPointRoute } from "constants/apiEndPoints";
import { VaccinationStatusFilterEnum } from "enums/vaccinationStatus";
import { VaccinationTypesEnum } from "enums/vaccinationTypes";
import { EmployeeDto } from "types/dtos/employeeDto";
import { VaccinationtypeType } from "types/filters";

export const addVaccinationStateFilter = (query: string, filter: string) => {
  //Only add filter if searching either for vaccinated or no vaccinated people
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

  const existingEmployee = await getEmployeeByIdentification(
    identificationToSearch
  );

  const isThereAEmployeeWithThatIdentification = existingEmployee.length > 0;
  return isThereAEmployeeWithThatIdentification;
};

export const getEmployeeByIdentification = async (identification: string) => {
  const existingEmployee = await getQuery(
    addIdentificationFilterToQuery(
      `${endPointRoute}${employeeSlug}`,
      identification
    )
  );
  return existingEmployee;
};

export const getEmployeeByIdentificationAndPassword = async (
  identification: string,
  password: string
) => {
  if (identification !== "" && password !== "") {
    let query = addIdentificationFilterToQuery(
      `${endPointRoute}${employeeSlug}`,
      identification
    );
    query = addPasswordFilterToQuery(query, password);

    const existingEmployee = await getQuery(query);
    return existingEmployee[0] as EmployeeDto;
  }
  return {};
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

export const addPasswordFilterToQuery = (baseUrl: string, password: string) => {
  let allUrl = baseUrl;
  if (password !== "") {
    allUrl = allUrl + "&password=" + password;
  }
  return allUrl;
};

export const filterByDate = (
  employees: EmployeeDto[],
  lowerDate: string,
  higherDate: string
) => {
  let resultProductData = employees.filter((emp) => {
    const maximumDate = higherDate !== "" ? new Date(higherDate) : null;
    const minimumDate = lowerDate !== "" ? new Date(lowerDate) : null;

    const dateVaccinationEmp = new Date(emp.vaccinationdate ?? "");

    if (maximumDate && !minimumDate) {
      //If there is a maximum date, return true if date is less than that
      return dateVaccinationEmp <= maximumDate;
    } else if (!maximumDate && minimumDate) {
      //If there is a minimum date, return true if date is higher than that
      return dateVaccinationEmp >= minimumDate;
    } else if (maximumDate && minimumDate) {
      //If there is a minimum and maximum date, return true if date is between that range
      return (
        dateVaccinationEmp >= minimumDate && dateVaccinationEmp <= maximumDate
      );
    } else {
      return true;
    }
  });
  return resultProductData;
};
