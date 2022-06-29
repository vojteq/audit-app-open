import styled from "styled-components";

export const SectionContainer = styled.div`
  ${(props) =>
    `
    padding: ${props.noPadding ? "0" : "1em 2em"};
    border-radius: 2px;
    background: ${props.theme.colors.bg.white};
    box-shadow: 0 0px 1px 0 rgb(0 0 0 / 30%), 0 0 0 1px rgb(0 0 0 / 4%);
  `};
`;

export const TableContainer = styled.div`
  ${(props) =>
    `
    padding: 2em;
    border-radius: 2px;
    background: ${props.theme.colors.bg.white};
    box-shadow: 0 0px 1px 0 rgb(0 0 0 / 30%), 0 0 0 1px rgb(0 0 0 / 4%);
    overflow-x: auto;
  `};
`;

export const PaddingContainer = styled.div`
  float: right;
  padding: 1em;
  border-radius: 2px;
`;
