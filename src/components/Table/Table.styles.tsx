import { screenSizeQueries } from "context/screenSize/useScreenSize";
import styled from "styled-components";
import { colors } from "themes/colors";
import { fontSizes } from "themes/fontSizes";

export const TableContainer = styled.div`
  width: 90%;

  .title {
    font-size: ${fontSizes.title};
  }

  display: flex;
  flex-direction: column;

  margin-top: 2rem;

  .tableActions {
    display: flex;
    justify-content: space-between;

    flex-wrap: wrap;

    margin: 1rem 0;

    @media ${screenSizeQueries.lesser("sm")} {
      justify-content: center;
      align-items: center;
    }
  }

  .table {
    overflow-x: auto;
    overflow-y: auto;
    max-height: 30vh;
  }
`;

export const TableStyled = styled.div`
  width: 100%;

  min-width: 700px;

  #header {
  }

  .row {
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    height: 3rem;
    max-height: 4rem;
    overflow-y: auto;
    justify-content: center;
    align-items: center;

    /* border: 1px solid ${colors.borderColorOne}; */

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }

    transition: all 0.05s ease-in-out;
  }

  .headerCell {
    height: 100%;
    width: 100%;

    font-weight: bold;
  }

  .cell {
    overflow-x: auto;
    height: 100%;
    width: 100%;

    /* border: 1px solid ${colors.borderColorOne}; */

    display: flex;
    justify-content: center;
    align-items: center;

    &::-webkit-scrollbar {
      display: none;
    }
    /* max-width: 30%; */
  }

  .names {
    /* height: 8rem; */
  }

  .employeeImage {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: space-around;
    /* align-items: center; */
    .edit,
    .erase {
      margin: 0 0.25rem;
      cursor: pointer;
    }

    svg {
      fill: ${colors.buttonColor.normal};
      &:hover {
        fill: ${colors.buttonColor.hover};
      }
      &:active {
        fill: ${colors.buttonColor.action};
      }
    }
  }

  .noEmployee {
    width: 100%;
  }
`;
