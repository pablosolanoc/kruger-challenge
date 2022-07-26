import EditEmployee from "components/EditEmployee/EditEmployee.component";
import Navigation from "components/Navigation/Navigation.component";
import { EditEmployeePageContainer } from "./EditEmployeePage.styles";

const EditEmployeePage = () => {
  return (
    <EditEmployeePageContainer>
      <Navigation />
      <EditEmployee />
    </EditEmployeePageContainer>
  );
};

export default EditEmployeePage;
