import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
  Updater,
  PaginationState,
} from "@tanstack/react-table";
import { CSSProperties, useState } from "react";
import { DataTablePagination } from "./data-table-footer";
import { DataTableState } from "@/hooks/data-table/use-data-table";
import DataTableLoader from "./data-table-skeleton-loader";

const DEFAULT_REACT_TABLE_COLUMN_WIDTH = 150;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize: number;
  totalPage: number;
  state: DataTableState;
  pageSizeOptions?: number[];
  isLoading?: boolean;
  onSortingChange: (sorting: SortingState) => void;
  onPageChange: (page: PaginationState) => void;
}

const DataTable = <TData, TValue>({
  data,
  state,
  columns,
  totalPage,
  onPageChange,
  onSortingChange,
  isLoading = false,
  pageSizeOptions = [2, 5, 10, 15],
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleSortingChange = (newSorting: Updater<SortingState>) => {
    const resolvedSorting =
      typeof newSorting === "function" ? newSorting(sorting) : newSorting;
    setSorting(resolvedSorting);
    onSortingChange(resolvedSorting);
  };

  const handlePageChange = (newPage: PaginationState) => {
    onPageChange(newPage);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: handleSortingChange,
    state: {
      sorting,
    },
    manualPagination: true,
    manualSorting: true,
  });

  if (isLoading) {
    return <DataTableLoader pageSize={state.pageSize} />;
  }

  return (
    <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const styles: CSSProperties =
                  header.getSize() !== DEFAULT_REACT_TABLE_COLUMN_WIDTH
                    ? { width: `${header.getSize()}px` }
                    : {};

                const isSorted = header.column.getIsSorted();
                const sortingIndicator = isSorted ? (
                  isSorted === "asc" ? (
                    <span> ▲</span>
                  ) : (
                    <span> ▼</span>
                  )
                ) : null;

                return (
                  <TableHead
                    key={header.id}
                    style={styles}
                    className="cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {sortingIndicator}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length} className="p-0">
              <DataTablePagination
                table={table}
                state={state}
                onPageChange={handlePageChange}
                totalPage={totalPage}
                pageSizeOptions={pageSizeOptions}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default DataTable;
