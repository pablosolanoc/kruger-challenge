import { screenSizeQueries } from "context/screenSize/useScreenSize";
import styled from "styled-components";

export const NavigationContainer = styled.div`
  position: fixed;
  top: 1rem;
  left: 0.5rem;

  @media ${screenSizeQueries.lesser("md")} {
    top: unset;
    bottom: 1rem;
  }
`;
