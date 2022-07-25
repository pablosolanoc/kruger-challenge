import { screenSizeQueries } from "context/screenSize/useScreenSize";
import styled from "styled-components";

export const FiltersContainer = styled.div`
  width: 100%;

  flex-direction: row;
  justify-content: space-around !important;

  @media ${screenSizeQueries.lesser("sm")} {
    flex-direction: column;
  }

  .vaccinestate,
  .typevaccine {
    width: 20%;
    display: flex;
  }

  .dates {
    width: 40%;
    display: flex;
    input {
      width: 50%;
    }
    @media ${screenSizeQueries.lesser("sm")} {
      width: 100%;
    }
  }

  .vaccinestate,
  .typevaccine,
  .dates {
    margin-top: 1rem;
  }

  .checkBoxGroup,
  .radioButtonGroup {
    flex-direction: column;
  }

  .labelCheckBoxCombo,
  .labelButtonGroupCombo {
    span {
      width: 6rem;
    }
  }
`;
