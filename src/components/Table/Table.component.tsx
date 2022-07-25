import { useEffect, useState } from "react";
import { ReactComponent as Edit } from "assets/icons/edit.svg";
import { ReactComponent as Trash } from "assets/icons/trash.svg";
import { TableContainer, TableStyled } from "./Table.styles";
import { EmployeeDto } from "types/dtos/employeeDto";
import { useEditingEmployee } from "contexts/editingEmployee/useEditingEmployee";
import { EmployeeApi } from "api/employee/employeeApi";
import { Title } from "components/Title/Title.styles";
import Filters from "components/Filters/Filters.component";

interface TableEmployeesProps {
  data: Array<EmployeeDto>;
  reloadData: () => Promise<void>;
}

const TableEmployees = ({ data, reloadData }: TableEmployeesProps) => {
  const { editingEmployee, setEmployeeBeignEdited } = useEditingEmployee();

  const handleEditClick = (employee: EmployeeDto) => {
    setEmployeeBeignEdited(employee);
  };

  const handleDeleteClick = async (employee: EmployeeDto) => {
    const deleteResult = await EmployeeApi.deleteEmployee(employee);
    setEmployeeBeignEdited({} as EmployeeDto);
    reloadData();
  };

  return (
    <TableContainer>
      <Title className="centered">Listado de empleados</Title>
      <Filters></Filters>

      <div className="table">
        <TableStyled className="">
          <div id="header">
            <div className="row border">
              <div className="border centered headerCell name ">Cédula</div>
              <div className="border centered headerCell image ">Nombre</div>
              <div className="border centered headerCell atack ">Apellidos</div>
              <div className="border centered headerCell defense ">
                Correo Electrónico
              </div>
              <div className="border centered headerCell actions ">
                Acciones
              </div>
            </div>
          </div>
          <div id="body">
            {data.map((employee, index) => (
              <div key={index} className="row border">
                <div className="identification cell border">
                  {employee.identification}
                </div>
                <div className="names cell border ">{employee.names}</div>
                <div className="lastnames cell border">
                  {employee.lastnames}
                </div>
                <div className="email cell border">{employee.email}</div>
                <div className="actions cell border ">
                  <div
                    className="edit"
                    onClick={() => handleEditClick(employee)}
                  >
                    <Edit />
                  </div>
                  <div
                    className="erase"
                    onClick={() => handleDeleteClick(employee)}
                  >
                    <Trash />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TableStyled>
      </div>
    </TableContainer>
  );
};

export default TableEmployees;
