import * as yup from "yup";

const namesValidation = yup
  .string()
  .required("Los nombres del nuevo empleado es obligatorio");
const lastNamesValidation = yup
  .string()
  .required("Los apellidos del nuevo empleado es obligatorio");
const identificationValidation = yup
  .string()
  .min(10, "La cédula debe tener una longitud mínima de 10 números")
  .max(10, "La cédula debe tener una longitud máxima de 10 números")
  .required("La cedula del nuevo empleado es obligatorio")
  .matches(/^\d+$/, "Solo pueden insertarse numeros");

const emailValidation = yup
  .string()
  .email("Ingrese un email valido.")
  .required("El e-mail del nuevo empleado es obligatorio");

export const newEmployeeValidation = yup.object({
  names: namesValidation,
  lastnames: lastNamesValidation,
  identification: identificationValidation,
  email: emailValidation,
});

export const newEmployeeInitialValues = {
  names: "Pablo",
  lastnames: "Solano",
  identification: "010210304",
  email: "pablo@kruger.com",
};
