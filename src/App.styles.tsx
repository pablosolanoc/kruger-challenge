// import styled from 'styled-components';

// export const AppContainer = styled.div`

import styled from "styled-components";
import { colors } from "themes/colors";
import { transition } from "themes/generalStyles";
// `;

export const AppContainer = styled.div`
  /* width: 100%; */
  min-height: 100vh;
  display: flex;

  justify-content: center;

  background-color: ${colors.backgroundColor};
`;

export const AppContent = styled.div`
  width: 90vw;

  .centered {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .b-radius-15 {
    border-radius: 15px;
  }

  .clickable {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  .border {
    border: 1px solid ${colors.borderColorOne};
  }

  .makeItDotted {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
