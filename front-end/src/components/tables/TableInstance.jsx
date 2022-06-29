import { TableLayout } from "./TableLayout";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { useMemo } from "react";

export const TableInstance = ({
  tableId,
  tableRowName,
  tableData,
  tableColumns,
}) => {
  const [columns, data] = useMemo(() => {
    return [tableColumns, tableData];
  }, [tableData, tableColumns]);

  const tableInstance = useTable(
    {
      tableId,
      tableRowName,
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return <TableLayout {...tableInstance} />;
};
