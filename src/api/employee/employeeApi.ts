import { endPointRoute, employeeSlug } from "constants/apiEndPoints";
import { EmployeeDto } from "types/dtos/employeeDto";
import { deleteQuery, getQuery, postQuery, putQuery } from "../querier";

type EmployeeApiGetAll = {};
type EmployeeApiGetById = {
  id_employee: string;
};

export const EmployeeApi = {
  getEmployees: async ({}: EmployeeApiGetAll) => {
    const allEmployee = await getQuery(`${endPointRoute}${employeeSlug}`);
    return allEmployee as EmployeeDto[];
  },

  getEmployeeById: async ({ id_employee }: EmployeeApiGetById) => {
    const employee = await getQuery(
      `${endPointRoute}${employeeSlug}${id_employee}`
    );
    return [employee] as EmployeeDto[];
  },

  createEmployee: async (new_employee: EmployeeDto) => {
    const existingEmployee = await getQuery(
      addFilterToQuery(`${endPointRoute}${employeeSlug}`, {
        identification: new_employee.identification,
      })
    );
    console.log(existingEmployee);
    const isThereAEmployeeWithThatIdentification = existingEmployee.length > 0;

    if (isThereAEmployeeWithThatIdentification) {
      return false;
    }

    const employee = isThereAEmployeeWithThatIdentification
      ? ({} as EmployeeDto)
      : await postQuery(`${endPointRoute}${employeeSlug}`, new_employee);
    return [employee] as EmployeeDto[];
  },

  updateEmployee: async (employee_beign_edited: EmployeeDto) => {
    const employee = await putQuery(
      `${endPointRoute}${employeeSlug}${employee_beign_edited.id}`,
      employee_beign_edited
    );
    return [employee] as EmployeeDto[];
  },

  deleteEmployee: async (employee_beign_deleted: EmployeeDto) => {
    const employee = await deleteQuery(
      `${endPointRoute}${employee_beign_deleted.id}`
    );
    return [employee] as EmployeeDto[];
  },
};

type filtersType = {
  identification?: string;
  vaccinationstate?: string;
};

const addFilterToQuery = (baseUrl: string, filters: filtersType) => {
  let allUrl = baseUrl;
  const filtersKeys = Object.keys(filters);
  for (let i = 0; i < filtersKeys.length; i++) {
    allUrl =
      allUrl +
      "?" +
      filtersKeys[i] +
      "=" +
      filters[filtersKeys[i] as keyof filtersType];
  }
  console.log(allUrl);
  return allUrl;
};
