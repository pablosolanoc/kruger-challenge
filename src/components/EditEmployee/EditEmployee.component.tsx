import MyButton from "components/MyButton/MyButton.component";
import { Title } from "components/Title/Title.styles";
import { useUser } from "context/user/useUser";
import { ReactComponent as Save } from "assets/icons/save.svg";
import { VaccinationStatusFilterEnum } from "enums/vaccinationStatus";
import { useFormik } from "formik";
import {
  // newEmployeeInfoInitialValues,
  newEmployeeInfoValidation,
  newEmployeeInfoValidationDosiBiggerThanOne,
} from "validationSchemas/newEmployeeInfo";
import { newEmployeeValidation } from "validationSchemas/newEmployeeValidation";
import { EditEmployeeContainer } from "./EditEmployee.styles";
import { useEffect, useState } from "react";
import { VaccinationTypesEnum } from "enums/vaccinationTypes";
import { EmployeeApi } from "api/employee/employeeApi";
import { EmployeeDto } from "types/dtos/employeeDto";

const EditEmployee = () => {
  const { user, setUser, isThereUserLoggedIn } = useUser();
  const [savedMessage, setSavedMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const newEmployeeInfoInitialValues = {
    birthdate: user.birthdate,
    address: user.address,
    phone: user.phone,
    vaccinationstate: user.vaccinationstate
      ? user.vaccinationstate.toString()
      : VaccinationStatusFilterEnum.NOT_VACCINATED,
    vaccinationdate: user.vaccinationdate,
    dosisnumber: user.dosisnumber ? user.dosisnumber.toString() : "0",
    vaccine: user.vaccine
      ? user.vaccine.toString()
      : VaccinationTypesEnum.SPUTNIK,
  };

  const [vaccinated, setVaccinated] = useState(
    newEmployeeInfoInitialValues.vaccinationstate !==
      VaccinationStatusFilterEnum.NOT_VACCINATED
  );
  const [vaccineType, setVaccineType] = useState(
    newEmployeeInfoInitialValues.vaccine
  );

  const validationToUse = vaccinated
    ? newEmployeeInfoValidationDosiBiggerThanOne
    : newEmployeeInfoValidation;

  const handleChangeRadioButtons = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === VaccinationStatusFilterEnum.VACCINATED) {
      setVaccinated(true);
    } else {
      setVaccinated(false);
    }
  };

  const handleNotBeignVaccinated = () => {
    if (vaccinated === false) {
      formik.values.vaccinationdate = "";
      formik.values.dosisnumber = "0";
      formik.values.vaccine = VaccinationTypesEnum.NONE;
      setVaccineType(VaccinationTypesEnum.NONE as string);
    }
  };

  useEffect(() => {
    handleNotBeignVaccinated();
  }, [vaccinated]);

  const handleChangeRadioButtonsVaccineType = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVaccineType(e.target.value);
  };

  const formik = useFormik({
    initialValues: newEmployeeInfoInitialValues,
    validationSchema: validationToUse,
    // validateOnChange: false,
    onSubmit: async (values) => {
      let newEmployee = {} as EmployeeDto;
      newEmployee = {
        id: user.id,
        names: user.names,
        lastnames: user.lastnames,
        email: user.email,
        identification: user.identification,
        birthdate: values.birthdate,
        address: values.address,
        phone: values.phone,
        vaccinationstate: vaccinated
          ? parseInt(VaccinationStatusFilterEnum.VACCINATED)
          : parseInt(VaccinationStatusFilterEnum.NOT_VACCINATED),
        vaccine: parseInt(vaccineType),
        vaccinationdate: values.vaccinationdate,
        dosisnumber: parseInt(values.dosisnumber),
        username: user.username,
        password: user.password,
      };
      const putResult = await EmployeeApi.updateEmployee(newEmployee);
      if (typeof putResult === "boolean") {
        // setTryingToAddExistingEmployee(true);
        console.log("Usuario ya existe");
      } else {
        console.log("Anadido");
        // window.location.reload();
      }
      setUser(putResult[0]);
      console.log(putResult);
    },
  });

  const setDefaultInfo = () => {
    formik.values.address = user.address ?? "";
    formik.values.phone = user.phone ?? "";
    formik.values.vaccinationdate = user.vaccinationdate ?? "";
    formik.values.dosisnumber = user.dosisnumber?.toString() ?? "0";
    formik.values.birthdate = user.birthdate ?? "";
  };

  useEffect(() => {
    setDefaultInfo();
    handleNotBeignVaccinated();
  }, []);

  const errorBirthDate =
    formik.touched.birthdate && Boolean(formik.errors.birthdate);
  const errorAddress =
    formik.touched.birthdate && Boolean(formik.errors.address);
  const errorPhone = formik.touched.birthdate && Boolean(formik.errors.phone);
  const errorVaccinationDate =
    formik.touched.birthdate && Boolean(formik.errors.vaccinationdate);
  const errorDosisNumber =
    formik.touched.birthdate && Boolean(formik.errors.dosisnumber);

  return (
    <EditEmployeeContainer>
      <Title className="centered">
        {`Editando empleado-> ${user.names} ${user.lastnames}: ${user.identification}`}
      </Title>

      <div className="centered formContainer">
        <form onSubmit={formik.handleSubmit}>
          <div className="centered inputErrorCombo">
            <div className="centered spanInputCombo">
              <span>Fecha de nacimiento: </span>
              <input
                type="date"
                placeholder=""
                className={`textinput defaultInput ${
                  errorBirthDate ? "inputError" : ""
                }`}
                name="birthdate"
                value={formik.values.birthdate}
                onChange={formik.handleChange}
              ></input>
            </div>

            <span className="error">
              {errorBirthDate && formik.errors.birthdate}
            </span>
          </div>
          <div className="centered inputErrorCombo">
            <div className="centered spanInputCombo">
              <span>Dirección de domicilio: </span>
              <input
                placeholder=""
                className={`textinput defaultInput ${
                  errorAddress ? "inputError" : ""
                }`}
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              ></input>
            </div>

            <span className="error">
              {errorAddress && formik.errors.address}
            </span>
          </div>
          <div className="centered inputErrorCombo">
            <div className="centered spanInputCombo">
              <span>Teléfono: </span>
              <input
                placeholder=""
                className={`textinput defaultInput ${
                  errorPhone ? "inputError" : ""
                }`}
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              ></input>
            </div>

            <span className="error">{errorPhone && formik.errors.phone}</span>
          </div>
          <div className="centered inputErrorCombo">
            <div className="centered spanInputCombo">
              <span>Estado de vacunación: </span>
              <div className="centered radioButtonGroup">
                <div className=" centered labelButtonGroupCombo">
                  <input
                    type="radio"
                    id="vaccinated"
                    name="vaccinationstate"
                    defaultChecked={vaccinated}
                    value={VaccinationStatusFilterEnum.VACCINATED}
                    onChange={handleChangeRadioButtons}
                  ></input>
                  <span className="makeItDotted">Vacunado</span>
                </div>
                <div className=" centered labelButtonGroupCombo">
                  <input
                    type="radio"
                    id="notVaccinated"
                    name="vaccinationstate"
                    defaultChecked={!vaccinated}
                    value={VaccinationStatusFilterEnum.NOT_VACCINATED}
                    onChange={handleChangeRadioButtons}
                  ></input>
                  <span className="makeItDotted">No vacunado</span>
                </div>
              </div>
            </div>
            <span className="error">
              {errorVaccinationDate && formik.errors.vaccine}
            </span>
          </div>
          <div className={`${vaccinated ? "show" : "notShow"}`}>
            <div className="centered inputErrorCombo">
              <div className="centered spanInputCombo">
                <span>Fecha de vacunación: </span>
                <input
                  type="date"
                  placeholder=""
                  className={`textinput defaultInput ${
                    errorVaccinationDate ? "inputError" : ""
                  }`}
                  name="vaccinationdate"
                  value={formik.values.vaccinationdate}
                  onChange={formik.handleChange}
                ></input>
              </div>
              <span className="error">
                {errorVaccinationDate && formik.errors.vaccinationdate}
              </span>
            </div>

            <div className="centered inputErrorCombo">
              <div className="centered spanInputCombo">
                <span>Número de dosis: </span>
                <input
                  type=""
                  placeholder=""
                  className={`textinput  ${
                    errorDosisNumber ? "inputError" : ""
                  }`}
                  name="dosisnumber"
                  value={formik.values.dosisnumber}
                  onChange={formik.handleChange}
                ></input>
              </div>
              <span className="error">
                {errorDosisNumber && formik.errors.dosisnumber}
              </span>
            </div>

            <div className="centered inputErrorCombo">
              <div className="centered spanInputCombo ">
                <span>Tipo de vacuna: </span>
                <div className="centered radioButtonGroup vaccineTypes">
                  <div className=" centered labelButtonGroupCombo">
                    <input
                      type="radio"
                      id="vaccine"
                      name="vaccine"
                      defaultChecked={
                        vaccineType === VaccinationTypesEnum.SPUTNIK
                      }
                      value={VaccinationTypesEnum.SPUTNIK}
                      onChange={handleChangeRadioButtonsVaccineType}
                    ></input>
                    <span className="">Sputnik</span>
                  </div>
                  <div className=" centered labelButtonGroupCombo">
                    <input
                      type="radio"
                      id="vaccine"
                      name="vaccine"
                      defaultChecked={
                        vaccineType === VaccinationTypesEnum.ASTRAZENECA
                      }
                      value={VaccinationTypesEnum.ASTRAZENECA}
                      onChange={handleChangeRadioButtonsVaccineType}
                    ></input>
                    <span className="">Astrazeneca</span>
                  </div>
                  <div className=" centered labelButtonGroupCombo">
                    <input
                      type="radio"
                      id="vaccine"
                      name="vaccine"
                      defaultChecked={
                        vaccineType === VaccinationTypesEnum.PFIZER
                      }
                      value={VaccinationTypesEnum.PFIZER}
                      onChange={handleChangeRadioButtonsVaccineType}
                    ></input>
                    <span className="">Pfizer</span>
                  </div>
                  <div className=" centered labelButtonGroupCombo">
                    <input
                      type="radio"
                      id="vaccine"
                      name="vaccine"
                      defaultChecked={vaccineType === VaccinationTypesEnum.JJ}
                      value={VaccinationTypesEnum.JJ}
                      onChange={handleChangeRadioButtonsVaccineType}
                    ></input>
                    <span className="">Jhonson&Jhonson</span>
                  </div>
                </div>
              </div>
              <span className="error">{true && formik.errors.vaccine}</span>
            </div>
          </div>

          <div className="centered buttonsAction">
            <MyButton type="save" icon={<Save />}>
              Guardar
            </MyButton>
          </div>
        </form>
      </div>
    </EditEmployeeContainer>
  );
};

export default EditEmployee;
