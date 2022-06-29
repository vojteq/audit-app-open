import React from "react";
import {
  BorderedTrTop,
  BorderedTrBottom,
  TableContainer,
} from "../../../../styled";
import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import TableGlobalFilter from "../../../tables/TableGlobalFilter";
import { Icon, StyledTable } from "../../../../styled";
import { useExpanded, useGlobalFilter, useSortBy, useTable } from "react-table";
import { useMemo, useCallback } from "react";
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { getTaskTypeString } from "../../../utils/mappers/taskTypeToString";
import { getTaskTypeAdHocString } from "../../../utils/mappers/taskTypeAdHocToString";
import { getBooleanStatusString } from "../../../utils/mappers/booleanStatusToString";
import { getExternalEmployeeString } from "../../../utils/mappers/externalEmployeeToString";

const Container = styled.div`
  padding: 1em;
`;

const P = styled.p`
  margin: 0;
  display: inline;
`;

const Label = styled(P)``;

const Value = styled(P)`
  font-weight: bold;
`;

const Header = styled(P)`
  flex-grow: 1;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function ExpandableTable({
  tableId,
  tableRowName,
  tableData,
  tableColumns,
}) {
  const [columns, data] = useMemo(() => {
    return [tableColumns, tableData];
  }, [tableData, tableColumns]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, useExpanded);

  const renderRowSubComponent = useCallback(({ row }) => {
    return (
      <Container>
        <Row>
          <Col sm={12}>
            <Label>Temat zadania: </Label>
            <Value>{row.original.topic}</Value>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm={4}>
            <Label>Typ zadania: </Label>
            <Value>{getTaskTypeString(row.original.taskType)}</Value>
          </Col>
          <Col sm={4}>
            <Label>Stosowana metodologia: </Label>
            <Value>{row.original.methodologyName}</Value>
          </Col>
          <Col sm={4}>
            <Label>Rodzaj zadania: </Label>
            <Value>{getTaskTypeAdHocString(row.original.adHoc)}</Value>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm={12}>
            <Label>Zespół realizujący zadanie: </Label>
            <Value>{row.original.teamName}</Value>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm={12}>
            <Label>Członkowie zespołu: </Label>
            <Value>
              {(!!row.original.teamMembersNames &&
                row.original.teamMembersNames.length > 0) ||
              (!!row.original.externalEmployees &&
                row.original.externalEmployees.length > 0)
                ? row.original.teamMembersNames
                    .map((teamMember) => teamMember.name)
                    .concat(
                      row.original.externalEmployees.map((name) =>
                        getExternalEmployeeString(name)
                      )
                    )
                    .join(", ")
                : "---"}
            </Value>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm={4}>
            <Label>Planowana data zakończenia: </Label>
            <Value>{row.original.plannedFinishedDate}</Value>
          </Col>
          <Col sm={4}>
            <Label>Skorygowana planowana data zakończenia: </Label>
            <Value>
              {!!row.original.correctedFinishDate
                ? row.original.correctedFinishDate
                : "---"}
            </Value>
          </Col>
          <Col sm={4}>
            <Label>Data zakończenia: </Label>
            <Value>
              {!!row.original.finishedDate ? row.original.finishedDate : "---"}
            </Value>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm={12}>
            <Label>Zadanie zawieszone: </Label>
            <Value>
              {row.original.taskStatus === "SUSPENDED" ? "Tak" : "Nie"}
            </Value>
            <Label> Powód zawieszenia: </Label>
            <Value>
              {!!row.original.suspensionReason
                ? row.original.suspensionReason
                : "---"}
            </Value>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm={12}>
            <Label>Link do raportu: </Label>
            <Value>
              {row.original.sharepointUrl !== "URL not provided" ? (
                <a href={row.original.sharepointUrl}>
                  {row.original.sharepointUrl}
                </a>
              ) : (
                "---"
              )}
            </Value>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm={12}>
            <Label>Audytowane spółki: </Label>
            <Value>
              {!!row.original.auditedCompanies &&
              row.original.auditedCompanies.length > 0
                ? row.original.auditedCompanies
                    .map((company) => company.name)
                    .join(", ")
                : "---"}
            </Value>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm={12}>
            <Label>
              Czy wymagane były dodatkowe działania operacyjne po publikacji
              raportu wstępnego?{" "}
            </Label>
            <Value>
              {getBooleanStatusString(row.original.operActionPerformed)}
            </Value>
          </Col>
        </Row>
      </Container>
    );
  }, []);

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
            <tr {...headerGroup.getHeaderGroupProps({ title: undefined })}>
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
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Fragment>
                {row.isExpanded ? (
                  <Fragment>
                    <BorderedTrTop
                      name={tableRowName + "ExpandedTop"}
                      {...row.getToggleRowExpandedProps({
                        title: "Ukryj szczegóły zadania",
                      })}
                      style={{ cursor: "pointer" }}
                    >
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
                    </BorderedTrTop>
                    <BorderedTrBottom name={tableRowName + "ExpandedBottom"}>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent({ row })}
                      </td>
                    </BorderedTrBottom>
                  </Fragment>
                ) : (
                  <tr
                    name={tableRowName + "Collapsed"}
                    {...row.getToggleRowExpandedProps({
                      title: "Wyświetl szczegóły zadania",
                    })}
                    style={{ cursor: "pointer" }}
                  >
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
                )}
              </Fragment>
            );
          })}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}
