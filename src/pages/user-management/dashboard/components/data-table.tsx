import * as React from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { AiOutlineLoading } from "react-icons/ai";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import useGetAllUsers from "@/hooks/queries/user/useGetAllUsers";
import { columns } from "./columns";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

export function UsersTable() {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "updatedAt",
      desc: true,
    },
  ]);

  const [searchText, setSearchText] = React.useState<string>();

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const usersQuery = useGetAllUsers({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: searchText,
    sortBy: sorting[0]?.id,
    // TODO : SEARCH BY ROLE CURRENTLY NOT SUPPORTED BY BACKEND (SINCE ITS AN ENUM)
    searchFields: ["name", "email", "provider"],
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
  });

  const table = useReactTable({
    data: usersQuery?.data?.data.data ?? [],
    columns: columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
      globalFilter: searchText,
    },
    // SORTING
    manualSorting: true,
    onSortingChange: setSorting,
    // PAGINATION
    manualPagination: true,
    pageCount: usersQuery?.data?.data.meta.items.totalItems ?? 1,
    onPaginationChange: setPagination,
    // FILTERING
    manualFiltering: true,
    onGlobalFilterChange: setSearchText,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const isLoading = usersQuery.isPending || usersQuery.isRefetching;

  return (
    <div className="space-y-4">
      {toolbar && <DataTableToolbar table={table} />}
      <div className="relative border rounded-md">
        <Table>
          {isLoading && (
            <div className="absolute left-1/2 top-1/2 ">
              <AiOutlineLoading className="w-16 h-auto animate-spin fill-foreground" />
            </div>
          )}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="cursor-pointer"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                {isLoading ? (
                  <>
                    {[0, 1, 2, 3, 4, 5].map((_) => (
                      <TableRow key={_}>
                        <TableCell colSpan={columns.length}>
                          <Skeleton className="w-full h-10" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {usersQuery.isPending ? null : <DataTablePagination table={table} />}
    </div>
  );
}
