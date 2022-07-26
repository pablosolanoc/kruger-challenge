import { EmployeeDto } from "types/dtos/employeeDto";
import axios from "axios";

export const getQuery = async (route: string) => {
  try {
    const response = await fetch(`${route}`, {});

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteQuery = async (route: string) => {
  try {
    const response = await fetch(`${route}`, {
      method: "DELETE",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const postQuery = async (route: string, newEmployee: EmployeeDto) => {
  try {
    const response = await axios.post(route, newEmployee);

    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const putQuery = async (
  route: string,
  employee_beign_edited: EmployeeDto
) => {
  try {
    const response = await axios.put(route, employee_beign_edited);

    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
