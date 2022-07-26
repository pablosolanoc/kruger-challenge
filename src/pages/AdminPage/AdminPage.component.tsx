import Table from "components/Table/Table.component";
import { useEffect, useState } from "react";
import { AdminPageContainer } from "./AdminPage.styles";
import { EmployeeApi } from "api/employee/employeeApi";
import { EmployeeDto } from "types/dtos/employeeDto";
import { CreateNewContainer } from "components/createNew/CreateNew.styles";
import CreateNew from "components/createNew/CreateNew.component";
import Filters from "components/Filters/Filters.component";
import { Title } from "components/Title/Title.styles";
import { useFilters } from "context/filters/useFilters";
import { Link } from "react-router-dom";
import MyButton from "components/MyButton/MyButton.component";
import Navigation from "components/Navigation/Navigation.component";

const AdminPage = () => {
  const [employeesList, setEmployeesList] = useState([] as EmployeeDto[]);
  const { vaccinationstate, vaccinationtype, lowerDate, higherDate } =
    useFilters();

  const loadEmployees = async () => {
    const filters = {
      vaccinationstate,
      vaccinationtype,
      lowerDate,
      higherDate,
    };
    const employees = await EmployeeApi.getEmployees({ filters });
    setEmployeesList(employees);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [vaccinationstate, vaccinationtype, lowerDate, higherDate]);

  return (
    <AdminPageContainer className="centered">
      <Navigation />
      <Table data={employeesList} reloadData={loadEmployees}></Table>
      <CreateNew></CreateNew>
    </AdminPageContainer>
  );
};

export default AdminPage;
