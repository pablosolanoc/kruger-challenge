import { ButtonTypes } from "types/button";
import { Button } from "./MyButton.styles";

interface MyButtonProps {
  children: React.ReactNode;
  type: ButtonTypes;
  disabled?: boolean | undefined;
  icon?: React.ReactNode;
}

const MyButton = ({
  children,
  type,
  disabled = false,
  icon,
}: MyButtonProps) => {
  return (
    <Button
      className={`${type} b-radius-15 clickable centered`}
      type={type === "normal" ? "button" : "button"}
      myButtonType={type}
      disabled={disabled}
    >
      <div className="buttonIcon centered">{icon}</div>
      <div>{children}</div>
    </Button>
  );
};

export default MyButton;
