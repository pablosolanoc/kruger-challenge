import { screenSizeQueries } from "context/screenSize/useScreenSize";
import styled from "styled-components";
import { colors } from "themes/colors";

export const ChooseTypeUserContainer = styled.div`
  width: 50%;
  height: 30vh;

  background-color: ${colors.backgroundColor2};
  display: flex;

  justify-content: space-around;
  align-items: center;

  .division {
    height: 3rem;
    border: 1px solid ${colors.borderColorOne};

    @media ${screenSizeQueries.lesser("sm")} {
      display: none;
    }
  }

  @media ${screenSizeQueries.lesser("md")} {
    flex-wrap: wrap;
    width: 100%;
  }
`;
