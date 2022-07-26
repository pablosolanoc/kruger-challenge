import { screenSizeQueries } from "context/screenSize/useScreenSize";
import styled from "styled-components";
import { colors } from "themes/colors";

export const EditEmployeeContainer = styled.div`
  width: 100%;
  margin: 2rem 0;

  overflow-x: hidden;

  .formContainer {
    margin: 2rem 0 0 0;
    form {
      width: 100%;
    }
  }

  .spanInputCombo {
    width: 70%;
    display: flex;
    margin: 1rem 0;
    justify-content: center;
    span {
      width: 30%;
      font-size: 1.3rem;
      /* margin-right: 2rem; */
    }

    input {
      width: 70%;
    }

    @media ${screenSizeQueries.lesser("sm")} {
      flex-direction: column;
      width: 100%;
      span {
        width: fit-content;
        /* margin-right: 2rem; */
      }
      input {
        width: 80%;
      }
    }
  }

  .buttonsAction {
    width: 100%;
    margin: 2rem 0;
    justify-content: space-around;

    @media ${screenSizeQueries.lesser("sm")} {
      flex-direction: column;
    }
  }

  .newButton {
    width: 100%;
    flex-direction: column;
    text-align: center;

    span {
      margin-top: 1rem;
    }
  }

  .error {
    color: ${colors.error};
    width: 100%;
    min-height: 0.5rem;
    text-align: center;
  }
  .inputError {
    border: 2px solid ${colors.error};
  }
  .inputErrorCombo {
    flex-direction: column;
  }

  .notShow {
    display: none;
  }

  .vaccineTypes {
    flex-direction: column;
  }

  .labelButtonGroupCombo {
    width: 10rem;
    input {
      width: 10%;
    }
    span {
      width: 90%;
    }
  }
`;
