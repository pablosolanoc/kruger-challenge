import { screenSizeQueries } from "context/screenSize/useScreenSize";
import styled from "styled-components";
import { colors } from "themes/colors";
import { fontSizes } from "themes/fontSizes";
import { transition } from "themes/generalStyles";

export type ButtonProps = {
  myButtonType: string;
};

export const Button = styled.button<ButtonProps>`
  display: flex;

  &:disabled {
    opacity: 0.4;
  }

  height: fit-content;

  border: 0;
  box-shadow: 5px 7px 10px gray;

  &.normal {
    height: 4rem;
    font-size: 1rem;
    background-color: ${colors.buttonColor.normal};

    padding: 1.3rem;
    color: ${colors.buttonText};

    :hover {
      background-color: ${colors.buttonColor.hover};
      /* height: 3.8rem; */
      box-shadow: none;
    }

    :action {
      background-color: ${colors.buttonColor.action};
    }
  }

  &.save,
  &.new,
  &.cancel,
  &.submit {
    height: 3rem;
    font-size: 1.2rem;
    background-color: ${colors.backgroundColor};

    padding: 1.3rem;
    color: ${colors.buttonText};

    :hover {
      background-color: ${colors.buttonColor.hover};
      /* height: 3.8rem; */
      box-shadow: none;
    }

    :action {
      background-color: ${colors.buttonColor.action};
    }
  }

  .buttonIcon {
    margin: 0 0.5rem;
    svg {
      fill: ${colors.buttonText};
    }
  }

  ${transition}
`;
