import MyButton from "components/MyButton/MyButton.component";
import { ChooseTypeUserContainer } from "./ChooseTypeUser.styles";
import { ReactComponent as Employee } from "assets/icons/employee.svg";
import { ReactComponent as Admin } from "assets/icons/admin.svg";
import { Link } from "react-router-dom";
import { appRoutes } from "constants/routes/routes";

const ChooseTypeUser = () => {
  return (
    <ChooseTypeUserContainer className="b-radius-15">
      <Link to={appRoutes.admin}>
        <MyButton type="normal" icon={<Admin />}>
          Entrar como administrador
        </MyButton>
      </Link>
      <div className="division"></div>
      <Link to={appRoutes.employeeLogin}>
        <MyButton type="normal" icon={<Employee />}>
          Entrar como empleado
        </MyButton>
      </Link>
    </ChooseTypeUserContainer>
  );
};

export default ChooseTypeUser;
