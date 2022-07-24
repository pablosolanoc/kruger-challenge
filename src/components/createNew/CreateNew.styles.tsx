import { screenSizeQueries } from "context/screenSize/useScreenSize";
import styled from "styled-components";
import { colors } from "themes/colors";

export const CreateNewContainer = styled.div`
  width: 90%;
  margin: 2rem 0;

  overflow-x: hidden;

  .formContainer {
    margin: 2rem 0 0 0;
  }

  .spanInputCombo {
    width: fit-content;
    display: flex;
    margin: 1rem 0;
    justify-content: center;
    span {
      width: 10rem;
      font-size: 1.3rem;
      /* margin-right: 2rem; */
    }

    /* input {
      width: 100%;
    } */

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
  }

  .error {
    color: ${colors.error};
    width: 100%;
    min-height: 0.5rem;
  }
  .inputError {
    border: 2px solid ${colors.error};
  }
  .inputErrorCombo {
    flex-direction: column;
  }
`;
