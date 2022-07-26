import * as yup from "yup";
import { identificationValidation } from "./newEmployeeValidation";

export const passwordValidation = yup
  .string()
  .required("Ingrese una contraseña por favor");

export const employeeLoginValidation = yup.object({
  identification: identificationValidation,
  password: passwordValidation,
});

export const employeeLoginInitialValues = {
  identification: "",
  password: "secret",
};
