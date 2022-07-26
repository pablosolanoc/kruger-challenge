import { getEmployeeByIdentificationAndPassword } from "api/employee/employeeApi.utils";
import MyButton from "components/MyButton/MyButton.component";
import { useUser } from "context/user/useUser";
import { useFormik } from "formik";
import { LegacyRef, useRef, useState } from "react";
import {
  employeeLoginInitialValues,
  employeeLoginValidation,
} from "validationSchemas/loginValidation";
import { newEmployeeInitialValues } from "validationSchemas/newEmployeeValidation";
import { LoginEmployeeContainer } from "./LoginEmployee.styles";

const LoginEmployee = () => {
  const { user, setUser } = useUser();
  const [showNoUserFoundMessage, setShowNoUserFoundMessage] = useState(false);

  const formik = useFormik({
    initialValues: employeeLoginInitialValues,
    validationSchema: employeeLoginValidation,
    // validateOnChange: false,
    onSubmit: async (values) => {
      const employee = await getEmployeeByIdentificationAndPassword(
        values.identification,
        values.password
      );
      if (employee) {
        setUser(employee);
      } else {
        setShowNoUserFoundMessage(true);
      }
    },
  });

  const errorInIdentification =
    formik.touched.identification && Boolean(formik.errors.identification);
  const errorInPassword =
    formik.touched.password && Boolean(formik.errors.password);

  return (
    <LoginEmployeeContainer className="centered b-radius-15">
      <form onSubmit={formik.handleSubmit} className="centered">
        <div className=" inputErrorCombo">
          <div className="spanInputCombo centered">
            <span>Cédula:</span>
            <input
              className={`defaultInput ${
                errorInIdentification ? "inputError" : ""
              }`}
              name="identification"
              value={formik.values.identification}
              onChange={formik.handleChange}
            ></input>
          </div>
          <span className="error">
            {errorInIdentification && `${formik.errors.identification}`}
          </span>
        </div>
        <div className=" inputErrorCombo">
          <div className="spanInputCombo centered">
            <span>Contraseña: </span>
            <input
              className={`defaultInput ${errorInPassword ? "inputError" : ""}`}
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            ></input>
          </div>
          <span className="error">
            {errorInPassword && `${formik.errors.password}`}
          </span>
        </div>
        <span className="error">
          {showNoUserFoundMessage
            ? "No hay un usuario con esa cédula o contraseña"
            : ""}
        </span>
        <MyButton type="submit">Ingresar</MyButton>
        <span className="centered note">
          Nota: se ha puesto la contraseña por defecto para facilitar el uso, ya
          que todos los usuarios se crean teniendo la misma contraseña (secret).
        </span>
      </form>
    </LoginEmployeeContainer>
  );
};

export default LoginEmployee;
