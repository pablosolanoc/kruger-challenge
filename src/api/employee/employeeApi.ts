import { endPointRoute, employeeSlug } from "constants/apiEndPoints";
import { VaccinationStatusFilterEnum } from "enums/vaccinationStatus";
import { VaccinationTypesEnum } from "enums/vaccinationTypes";
import { EmployeeDto } from "types/dtos/employeeDto";
import { FiltersType, VaccinationtypeType } from "types/filters";
import { deleteQuery, getQuery, postQuery, putQuery } from "../querier";
import {
  addIdentificationFilterToQuery,
  addVaccinationStateFilter,
  addVaccinationTypeFilter,
  filterByDate,
  searchForExistingEmployee,
} from "./employeeApi.utils";

type EmployeeApiGetAll = {
  filters: FiltersType;
};
type EmployeeApiGetById = {
  id_employee: string;
};

export const EmployeeApi = {
  getEmployees: async ({ filters }: EmployeeApiGetAll) => {
    let query = `${endPointRoute}${employeeSlug}`;

    let searchingForNotVaccinated =
      filters.vaccinationstate.toString() ===
      VaccinationStatusFilterEnum.NOT_VACCINATED;

    query = addVaccinationStateFilter(
      query,
      filters.vaccinationstate.toString()
    );
    //Only add vaccinationtype filter if searching for vaccinated employees
    if (!searchingForNotVaccinated) {
      query = addVaccinationTypeFilter(query, filters.vaccinationtype);
    }

    console.log(query);
    //Load employees given vaccination state/type filter
    let allEmployee = await getQuery(query);

    //Only add vaccinationtype filter if searching for vaccinated employees
    if (!searchingForNotVaccinated) {
      allEmployee = filterByDate(
        allEmployee,
        filters.lowerDate,
        filters.higherDate
      );
    }
    return allEmployee as EmployeeDto[];
  },

  getEmployeeById: async ({ id_employee }: EmployeeApiGetById) => {
    const employee = await getQuery(
      `${endPointRoute}${employeeSlug}${id_employee}`
    );
    return [employee] as EmployeeDto[];
  },

  createEmployee: async (new_employee: EmployeeDto) => {
    const isThereAEmployeeWithThatIdentification =
      await searchForExistingEmployee(new_employee);

    if (isThereAEmployeeWithThatIdentification) {
      return false;
    }

    const employee = isThereAEmployeeWithThatIdentification
      ? ({} as EmployeeDto)
      : await postQuery(`${endPointRoute}${employeeSlug}`, new_employee);
    return [employee] as EmployeeDto[];
  },

  updateEmployee: async (employee_beign_edited: EmployeeDto) => {
    const isThereAEmployeeWithThatIdentification =
      await searchForExistingEmployee(employee_beign_edited);

    if (isThereAEmployeeWithThatIdentification) {
      return false;
    }

    const employee = await putQuery(
      `${endPointRoute}${employeeSlug}${employee_beign_edited.id}`,
      employee_beign_edited
    );
    return [employee] as EmployeeDto[];
  },

  deleteEmployee: async (employee_beign_deleted: EmployeeDto) => {
    const employee = await deleteQuery(
      `${endPointRoute}${employeeSlug}${employee_beign_deleted.id}`
    );
    return [employee] as EmployeeDto[];
  },
};
