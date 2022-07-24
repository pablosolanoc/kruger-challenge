import Table from "components/Table/Table.component";
import { useEffect, useState } from "react";
import { AdminPageContainer } from "./AdminPage.styles";
import { EmployeeApi } from "api/employee/employeeApi";
import { EmployeeDto } from "types/dtos/employeeDto";
import { CreateNewContainer } from "components/createNew/CreateNew.styles";
import CreateNew from "components/createNew/CreateNew.component";

const AdminPage = () => {
  const [employeesList, setEmployeesList] = useState([] as EmployeeDto[]);

  const loadEmployees = async () => {
    const employees = await EmployeeApi.getEmployees({});
    setEmployeesList(employees);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <AdminPageContainer className="centered">
      <Table data={employeesList}></Table>
      <CreateNew></CreateNew>
    </AdminPageContainer>
  );
};

export default AdminPage;
