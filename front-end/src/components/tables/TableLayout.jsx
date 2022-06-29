import React from "react";
import { TableContainer } from "../../styled";
import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import TableGlobalFilter from "./TableGlobalFilter";
import { Icon, StyledTable } from "../../styled";
import styled from "styled-components";
import { ButtonArrowLeft, ButtonArrowRight } from "../buttons/iconButtons";
import { PaddingContainer } from "../../styled/containers";

const Header = styled.p`
  margin: 0;
  display: inline;
  flex-grow: 1;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TableLayout = ({
  tableId,
  tableRowName,
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
  state,
  visibleColumns,
  preGlobalFilteredRows,
  setGlobalFilter,
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
  pageSize,
  setPageSize,
}) => {
  return (
    <TableContainer>
      <StyledTable id={tableId} {...getTableProps()}>
        <thead>
          <tr>
            <th colSpan={visibleColumns.length} className="searchBar">
              <TableGlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps({ title: "Sortuj" })
                  )}
                >
                  <HeaderContainer>
                    <Header>{column.render("Header")}</Header>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <Icon icon={faSortDown} />
                      ) : (
                        <Icon icon={faSortUp} />
                      )
                    ) : (
                      <Icon icon={faSort} />
                    )}
                  </HeaderContainer>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr name={tableRowName} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps([
                        {
                          className: cell.column.className,
                          style: cell.column.style,
                        },
                      ])}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      {pageCount > 1 && (
        <PaddingContainer>
          <ButtonArrowLeft
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          />
          <ButtonArrowRight
            onClick={() => nextPage()}
            disabled={!canNextPage}
          />
          <span style={{ marginLeft: "10px" }}>
            Strona{" "}
            <strong>
              {state.pageIndex + 1} z {pageOptions.length}
            </strong>
          </span>
        </PaddingContainer>
      )}
    </TableContainer>
  );
};
