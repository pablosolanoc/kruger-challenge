import { EmployeeApi } from "api/employee/employeeApi";
import MyButton from "components/MyButton/MyButton.component";
import { Title } from "components/Title/Title.styles";
import { useEditingEmployee } from "contexts/editingEmployee/useEditingEmployee";
import { useFormik } from "formik";
import { EmployeeDto } from "types/dtos/employeeDto";
import {
  newEmployeeInitialValues,
  newEmployeeValidation,
} from "validationSchemas/newEmployeeValidation";
import { CreateNewContainer } from "./CreateNew.styles";
import { ReactComponent as Save } from "assets/icons/save.svg";
import { ReactComponent as Cancel } from "assets/icons/cancel.svg";
import { useEffect, useState } from "react";

const CreateNew = () => {
  const { editingEmployee, employeeBeignEdited, setEmployeeBeignEdited } =
    useEditingEmployee();
  const [tryingToAddExistingEmployee, setTryingToAddExistingEmployee] =
    useState(false);

  useEffect(() => {
    console.log(employeeBeignEdited);
    if (Object.keys(employeeBeignEdited).length > 0) {
      formik.setFieldValue("names", employeeBeignEdited.names);
      formik.setFieldValue("lastnames", employeeBeignEdited.lastnames);
      formik.setFieldValue("email", employeeBeignEdited.email);
      formik.setFieldValue(
        "identification",
        employeeBeignEdited.identification
      );
    } else {
      formik.setFieldValue("names", "");
      formik.setFieldValue("lastnames", "");
      formik.setFieldValue("email", "");
      formik.setFieldValue("identification", "");

      setTryingToAddExistingEmployee(false);
    }
  }, [employeeBeignEdited]);

  const formik = useFormik({
    initialValues: newEmployeeInitialValues,
    validationSchema: newEmployeeValidation,
    // validateOnChange: false,
    onSubmit: async (values) => {
      const isUpdating = editingEmployee;

      let newEmployee = {} as EmployeeDto;
      if (isUpdating) {
        console.log("hey ");
        newEmployee = {
          id: employeeBeignEdited.id,
          names: values.names,
          lastnames: values.lastnames,
          email: values.email,
          identification: values.identification,
          birthdate: employeeBeignEdited.birthdate,
          address: employeeBeignEdited.address,
          phone: employeeBeignEdited.phone,
          vaccinationstate: employeeBeignEdited.vaccinationstate,
          vaccine: employeeBeignEdited.vaccine,
          vaccinationdate: employeeBeignEdited.vaccinationdate,
          dosisnumber: employeeBeignEdited.dosisnumber,
          username: employeeBeignEdited.username,
          password: employeeBeignEdited.password,
        };
        const putResult = await EmployeeApi.updateEmployeeBasicInfo(
          newEmployee
        );
        if (typeof putResult === "boolean") {
          setTryingToAddExistingEmployee(true);
          console.log("Usuario ya existe");
        } else {
          console.log("Anadido");
          window.location.reload();
        }
        console.log(putResult);
      } else {
        console.log("hey 2");
        newEmployee = {
          names: values.names,
          lastnames: values.lastnames,
          email: values.email,
          identification: values.identification,
          birthdate: "",
          address: "",
          phone: "",
          vaccinationstate: 0,
          vaccine: 0,
          vaccinationdate: "",
          dosisnumber: 0,
          username: `${values.identification}${values.email}`,
          password: `${values.identification}secret`,
        };
        const postResult = await EmployeeApi.createEmployee(newEmployee);
        if (typeof postResult === "boolean") {
          setTryingToAddExistingEmployee(true);
          console.log("Usuario ya existe");
        } else {
          console.log("Anadido");
          window.location.reload();
        }
        console.log(postResult);
      }
    },
  });

  const errorInNamesInput =
    formik.touched.names && Boolean(formik.errors.names);
  const errorInLastNamesInput =
    formik.touched.lastnames && Boolean(formik.errors.lastnames);
  const errorInEmail = formik.touched.email && Boolean(formik.errors.email);
  const errorInIdentification =
    formik.touched.identification && Boolean(formik.errors.identification);

  const {
    identification: idBeginEdited,
    names: namesBeignEdited,
    lastnames: lastnamesBeignEdited,
  } = employeeBeignEdited;

  return (
    <CreateNewContainer>
      <Title className="centered">
        {editingEmployee
          ? `Editando empleado: ${idBeginEdited} (${namesBeignEdited} ${lastnamesBeignEdited})`
          : `Nuevo empleado`}
      </Title>
      <div className="centered newButton">
        <MyButton type="new">Agregar nuevo empleado</MyButton>
        {tryingToAddExistingEmployee && (
          <span className="error">
            {`El empleado con cédula ${formik.values.identification} ya existe. No se lo puede añadir otra vez.`}
          </span>
        )}
      </div>
      <div className="centered formContainer">
        <form onSubmit={formik.handleSubmit}>
          <div className="centered inputErrorCombo">
            <div className="centered spanInputCombo">
              <span>Cedula: </span>
              <input
                placeholder=""
                className={`textinput ${
                  errorInIdentification ? "inputError" : ""
                }`}
                name="identification"
                value={formik.values.identification}
                onChange={formik.handleChange}
              ></input>
            </div>

            <span className="error">
              {errorInIdentification && formik.errors.identification}
            </span>
          </div>
          <div className="centered inputErrorCombo">
            <div className="centered spanInputCombo">
              <span>Nombres: </span>
              <input
                placeholder=""
                className={`textinput ${errorInNamesInput ? "inputError" : ""}`}
                name="names"
                value={formik.values.names}
                onChange={formik.handleChange}
              ></input>
            </div>

            <span className="error">
              {errorInNamesInput && formik.errors.names}
            </span>
          </div>
          <div className="centered inputErrorCombo">
            <div className="centered spanInputCombo">
              <span>Apellidos: </span>
              <input
                placeholder=""
                className={`textinput ${
                  errorInLastNamesInput ? "inputError" : ""
                }`}
                name="lastnames"
                value={formik.values.lastnames}
                onChange={formik.handleChange}
              ></input>
            </div>

            <span className="error">
              {errorInLastNamesInput && formik.errors.lastnames}
            </span>
          </div>

          <div className="centered inputErrorCombo">
            <div className="centered spanInputCombo">
              <span>E-mail: </span>
              <input
                placeholder=""
                className={`textinput ${errorInEmail ? "inputError" : ""}`}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              ></input>
            </div>
            <span className="error">{errorInEmail && formik.errors.email}</span>
          </div>

          <div className="centered buttonsAction">
            <MyButton type="save" icon={<Save />}>
              Guardar
            </MyButton>
            <MyButton type="cancel" icon={<Cancel />}>
              Cancelar
            </MyButton>
          </div>
        </form>
      </div>
    </CreateNewContainer>
  );
};

export default CreateNew;
