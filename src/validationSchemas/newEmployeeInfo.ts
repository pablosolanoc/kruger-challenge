import * as yup from "yup";
import { identificationValidation } from "./newEmployeeValidation";

export const dateValidationRequired = yup
  .date()
  .required("Ingrese una fecha válida por favor");

export const dateValidationNotRequired = yup.date();

export const addressValidationRequired = yup
  .string()
  .required("Ingrese una dirección de domicilio válida por favor");

export const telefonoRequired = yup
  .string()
  .min(10, "Mínimo 10 dígitos")
  .max(10, "Máximo 10 dígitos")
  .required("Ingrese un número de celular válido por favor");

export const vaccinationStateRequired = yup
  .string()
  .matches(/^[0-1]+$/, "Número entre 0 y 6")
  .required("Ingrese un estado de vacunación válido por favor");

export const dosisNumberRequired = yup
  .string()
  .matches(/^[0-6]+$/, "Número entre 0 y 6")
  .required("Ingrese un número de dosis válido por favor");

export const dosisNumberRequiredBiggerThanOne = yup
  .string()
  .matches(/^[1-6]+$/, "Número entre 1 y 6")
  .required("Ingrese un número de dosis válido por favor");

export const vaccineTypeRequired = yup
  .number()
  .min(0)
  .max(4)
  .required("Ingrese un tipo de vacuna válido por favor");

export const newEmployeeInfoValidation = yup.object({
  birthdate: dateValidationRequired,
  address: addressValidationRequired,
  phone: telefonoRequired,
  // vaccinationstate: vaccinationStateRequired,
  vaccinationdate: dateValidationNotRequired,
  dosisnumber: dosisNumberRequired,
  // vaccine: vaccineTypeRequired,
});

export const newEmployeeInfoValidationDosiBiggerThanOne = yup.object({
  birthdate: dateValidationRequired,
  address: addressValidationRequired,
  phone: telefonoRequired,
  // vaccinationstate: vaccinationStateRequired,
  vaccinationdate: dateValidationRequired,
  dosisnumber: dateValidationRequired,
  // vaccine: vaccineTypeRequired,
});

export const newEmployeeInfoInitialValues = {
  birthdate: "",
  address: "asdas",
  phone: "0991678640",
  vaccinationstate: "1",
  vaccinationdate: "2022-07-13",
  dosisnumber: "3",
  vaccine: "0",
};
