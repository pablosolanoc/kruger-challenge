import MyButton from "components/MyButton/MyButton.component";
import { Link } from "react-router-dom";
import { NavigationContainer } from "./Navigation.styles";
import { ReactComponent as Return } from "assets/icons/return.svg";

const Navigation = () => {
  return (
    <NavigationContainer>
      <Link to="/">
        <MyButton type="normal" icon={<Return />}>
          Regresar
        </MyButton>
      </Link>
    </NavigationContainer>
  );
};

export default Navigation;
