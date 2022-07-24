import { useEffect, useState } from "react";
import { ReactComponent as Edit } from "assets/icons/edit.svg";
import { ReactComponent as Trash } from "assets/icons/trash.svg";
import { TableContainer, TableStyled } from "./Table.styles";
import { EmployeeDto } from "types/dtos/employeeDto";
import { useEditingEmployee } from "contexts/editingPokemon/useEditingPokemon";

interface TableEmployeesProps {
  data: Array<EmployeeDto>;
}

const TableEmployees = ({ data }: TableEmployeesProps) => {
  const { editingEmployee, setEmployeeBeignEdited } = useEditingEmployee();

  const handleEditClick = (employee: EmployeeDto) => {
    setEmployeeBeignEdited(employee);
  };

  return (
    <TableContainer>
      <span className="title centered">Listado de empleados</span>
      <div className="tableActions">
        {/* <SearchBar />
        <MyButton type="new">Nuevo</MyButton> */}
      </div>

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
                  <div className="erase">
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
