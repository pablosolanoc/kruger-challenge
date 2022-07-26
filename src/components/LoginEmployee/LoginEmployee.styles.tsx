import styled from "styled-components";
import { colors } from "themes/colors";

export const LoginEmployeeContainer = styled.div`
  width: 50%;

  background-color: ${colors.backgroundColor2};

  flex-direction: column;

  .spanInputCombo {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    span {
      width: 10rem;
      margin: 0 1rem 0 0;
    }

    margin: 2rem;
  }

  button {
    margin: 1rem 0;
  }

  form {
    flex-direction: column;
  }

  .inputErrorCombo {
    flex-direction: column;
  }

  .error {
    font-size: 0.9rem;
    color: ${colors.error};
  }

  .inputError {
    border-color: ${colors.error}!important;
  }

  .note {
    text-align: center;
  }
`;
