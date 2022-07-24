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
    const employee = await getQuery(`${endPointRoute}${id_employee}`);
    return [employee] as EmployeeDto[];
  },

  // createEmployee: async (new_employee: EmployeeDto) => {
  //   const employee = await postQuery(`${endPointRoute}`, new_employee);
  //   return [employee] as EmployeeDto[];
  // },

  // updateEmployee: async (employee_beign_edited: EmployeeDto) => {
  //   const employee = await putQuery(
  //     `${endPointRoute}${employee_beign_edited.id}`,
  //     employee_beign_edited
  //   );
  //   return [employee] as EmployeeDto[];
  // },

  deleteEmployee: async (employee_beign_deleted: EmployeeDto) => {
    const employee = await deleteQuery(
      `${endPointRoute}${employee_beign_deleted.id}`
    );
    return [employee] as EmployeeDto[];
  },
};
