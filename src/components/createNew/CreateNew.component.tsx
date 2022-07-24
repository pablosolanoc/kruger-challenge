import { EmployeeApi } from "api/employee/employeeApi";
import MyButton from "components/MyButton/MyButton.component";
import { Title } from "components/Title/Title.styles";
import { useEditingEmployee } from "contexts/editingPokemon/useEditingPokemon";
import { useFormik } from "formik";
import { EmployeeDto } from "types/dtos/employeeDto";
import {
  newEmployeeInitialValues,
  newEmployeeValidation,
} from "validationSchemas/employeeValidation";
import { CreateNewContainer } from "./CreateNew.styles";
import { ReactComponent as Save } from "assets/icons/save.svg";
import { ReactComponent as Cancel } from "assets/icons/cancel.svg";
import { useEffect } from "react";

const CreateNew = () => {
  const { editingEmployee, employeeBeignEdited, setEmployeeBeignEdited } =
    useEditingEmployee();

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
          names: values.names,
          lastnames: values.identification,
          email: values.email,
          identification: values.identification,
        };
        // const putResult = await EmployeeApi.updatePokemon(newPokemon);
        // window.location.reload();
      } else {
        console.log("hey 2");
        newEmployee = {
          names: values.names,
          lastnames: values.identification,
          email: values.email,
          identification: values.identification,
          birthdate: "",
          address: "",
          phone: "",
          vaccinationstate: 0,
          vaccine: 0,
          vaccinationdate: "",
          dosisnumber: 0,
        };
        // const postResult = await EmployeeApi.(newPokemon);
        // window.location.reload();
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

  return (
    <CreateNewContainer>
      <Title className="centered">Nuevo empleado</Title>
      <div className="centered newButton">
        <MyButton type="new">Agregar nuevo empleado</MyButton>
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
