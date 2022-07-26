import LoginEmployee from "components/LoginEmployee/LoginEmployee.component";
import Navigation from "components/Navigation/Navigation.component";
import { LoginPageContainer } from "./Login.styles";

const LoginPage = () => {
  return (
    <LoginPageContainer className="centered">
      <Navigation />
      <LoginEmployee></LoginEmployee>
    </LoginPageContainer>
  );
};

export default LoginPage;
