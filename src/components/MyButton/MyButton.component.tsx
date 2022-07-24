import { Cancel, New } from "constants/button/button";
import { useEditingEmployee } from "contexts/editingPokemon/useEditingPokemon";
import { ButtonTypes } from "types/button";
import { EmployeeDto } from "types/dtos/employeeDto";
import { Button } from "./MyButton.styles";

interface MyButtonProps {
  children: React.ReactNode;
  type: ButtonTypes;
  disabled?: boolean | undefined;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const MyButton = ({
  children,
  type,
  disabled = false,
  icon,
  onClick,
}: MyButtonProps) => {
  const { setEmployeeBeignEdited } = useEditingEmployee();

  const onClickNew = () => {
    setEmployeeBeignEdited({} as EmployeeDto);
  };

  const onClickCancel = () => {
    setEmployeeBeignEdited({} as EmployeeDto);
  };

  return (
    <Button
      className={`${type} b-radius-15 clickable centered`}
      type={type === "save" ? "submit" : "button"}
      myButtonType={type}
      onClick={
        type === New ? onClickNew : type === Cancel ? onClickCancel : onClick
      }
      disabled={disabled}
    >
      {icon && <div className="buttonIcon centered">{icon}</div>}
      <div>{children}</div>
    </Button>
  );
};

export default MyButton;
