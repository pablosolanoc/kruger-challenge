import { useFilters } from "context/filters/useFilters";
import { VaccinationStatusFilterEnum } from "enums/vaccinationStatus";
import { useState } from "react";
import { VaccinationtypeType } from "types/filters";
import { FiltersContainer } from "./Filters.styles";

const Filters = () => {
  const {
    vaccinationstate,
    vaccinationtype,
    setVaccineTypeFilter,
    setVaccinationStatusFilter,
    setDateLowerFilter,
    setDateHigherFilter,
  } = useFilters();

  const [searchingForNotVaccinated, setSearchingForNotVaccinated] =
    useState(false);

  const handleChangeRadioButtons = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vaccinationStatusFilter = e.target.value;
    setVaccinationStatusFilter(vaccinationStatusFilter);
    if (
      vaccinationStatusFilter === VaccinationStatusFilterEnum.NOT_VACCINATED
    ) {
      setSearchingForNotVaccinated(true);
    } else {
      setSearchingForNotVaccinated(false);
    }
  };

  console.log(vaccinationtype);

  const handleChangeCheckBoxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxClicked = e.target.name;
    console.log(checkboxClicked);
    console.log(e.target.checked);
    if (checkboxClicked) {
      setVaccineTypeFilter({
        ...vaccinationtype,
        [`${checkboxClicked}`]: e.target.checked,
      } as VaccinationtypeType);
    }
  };

  const handleChangeLowerDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setDateLowerFilter(e.target.value);
  };

  const handleChangeHigherDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setDateHigherFilter(e.target.value);
  };

  return (
    <FiltersContainer className="centered">
      <div className="filter centered vaccinestate">
        <span className="makeItDotted">Estado de vacunación:</span>
        <div className="centered radioButtonGroup">
          <div className=" centered labelButtonGroupCombo">
            <span className="makeItDotted">All</span>
            <input
              type="radio"
              id="all"
              name="vaccineType"
              value={VaccinationStatusFilterEnum.ALL}
              defaultChecked
              onChange={handleChangeRadioButtons}
            ></input>
          </div>
          <div className=" centered labelButtonGroupCombo">
            <span className="makeItDotted">Vacunados</span>
            <input
              type="radio"
              id="vaccinated"
              name="vaccineType"
              value={VaccinationStatusFilterEnum.VACCINATED}
              onChange={handleChangeRadioButtons}
            ></input>
          </div>
          <div className=" centered labelButtonGroupCombo">
            <span className="makeItDotted">No vacunados</span>
            <input
              type="radio"
              id="notVaccinated"
              name="vaccineType"
              value={VaccinationStatusFilterEnum.NOT_VACCINATED}
              onChange={handleChangeRadioButtons}
            ></input>
          </div>
        </div>
      </div>
      <div className={`centered filter typevaccine`}>
        <span className="makeItDotted">Tipo de vacuna:</span>
        <div className="centered checkBoxGroup">
          <div className=" centered labelCheckBoxCombo">
            <span className="makeItDotted">Sputnik</span>
            <input
              type="checkbox"
              id="sputnik"
              name="sputnik"
              value="sputnik"
              defaultChecked
              disabled={searchingForNotVaccinated}
              onChange={handleChangeCheckBoxes}
            ></input>
          </div>
          <div className="centered labelCheckBoxCombo">
            <span className="makeItDotted">AstraZeneca</span>
            <input
              type="checkbox"
              id="astrazeneca"
              name="astrazeneca"
              value="astrazeneca"
              defaultChecked
              disabled={searchingForNotVaccinated}
              onChange={handleChangeCheckBoxes}
            ></input>
          </div>
          <div className="centered labelCheckBoxCombo">
            <span className="makeItDotted">Pfizer</span>
            <input
              type="checkbox"
              id="pfizer"
              name="pfizer"
              value="pfizer"
              defaultChecked
              disabled={searchingForNotVaccinated}
              onChange={handleChangeCheckBoxes}
            ></input>
          </div>
          <div className="centered labelCheckBoxCombo">
            <span className="makeItDotted">Jhonson&Jhonson</span>
            <input
              type="checkbox"
              id="jj"
              name="jj"
              value="jj"
              defaultChecked
              disabled={searchingForNotVaccinated}
              onChange={handleChangeCheckBoxes}
            ></input>
          </div>
        </div>
      </div>
      <div className="filter dates">
        <span className="">Rango de fechas:</span>
        <input
          type="date"
          disabled={searchingForNotVaccinated}
          onChange={handleChangeLowerDate}
        />
        <input
          type="date"
          disabled={searchingForNotVaccinated}
          onChange={handleChangeHigherDate}
        />
      </div>
    </FiltersContainer>
  );
};

export default Filters;
