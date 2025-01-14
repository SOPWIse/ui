import { Table } from "@tanstack/react-table";
import { debounce } from "lodash";

import { DataTableViewOptions } from "./data-table-view-options";
import { Button, Input } from "@/components/ui";
import { X } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  const handleSearch = debounce(table.setGlobalFilter, 500);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center flex-1 space-x-2">
        <Input
          placeholder="Search items..."
          onChange={(event) => {
            handleSearch(event?.target?.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/*
         * GET STATE FROM THE TABLE ITSELF AND USE IT TO DETERMINE IF THE COLUMN IS SORTABLE
         */}

        {/* <AsyncDataTableFacetedFilter
          column={table.getColumn("x")}
          title="Filter"
          options={[
            { label: "All", value: "" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
          onSearch={() => {}}
          chipLimit={3}
          sorting={"asc"}
          limit={10}
        /> */}
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={Status}
          />
        )} */}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
