import { PaginationState, type Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTableState } from "@/hooks/data-table/use-data-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  state: DataTableState;
  totalPage: number;
  onPageChange: (page: PaginationState) => void;
}

export function DataTablePagination<TData>({
  table,
  state,
  totalPage,
  onPageChange,
  pageSizeOptions = [5, 10, 15],
}: DataTablePaginationProps<TData>) {
  const nextDisable = totalPage === state.page;
  const prevDisable = state.page === 1;

  const canGoNext = totalPage >= state.page && nextDisable;
  const canGoPrev = state.page <= 1 && prevDisable;

  function goNext() {
    const updated = {
      pageIndex: state.page,
      pageSize: state.pageSize,
    };
    if (!canGoNext) {
      onPageChange(updated);
    }
  }

  function goPrev() {
    const updated = {
      pageIndex: state.page - 2,
      pageSize: state.pageSize,
    };
    if (!canGoPrev) {
      onPageChange(updated);
    }
  }

  function goToStart() {
    const updated = {
      pageIndex: 0,
      pageSize: state.pageSize,
    };
    if (canGoNext) {
      onPageChange(updated);
    }
  }

  function goToEnd() {
    const updated = {
      pageIndex: totalPage - 1,
      pageSize: state.pageSize,
    };
    if (canGoPrev) {
      onPageChange(updated);
    }
  }

  function onSizeChange(value: number) {
    const updated = {
      pageIndex: 0,
      pageSize: value,
    };
    onPageChange(updated);
  }

  return (
    <div className="flex flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div className="flex-1 whitespace-nowrap w-full text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s).
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
          <Select
            value={`${state?.pageSize}`}
            onValueChange={(value) => {
              onSizeChange(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          Page {state?.page} of {totalPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={goToStart}
            disabled={prevDisable}
          >
            <ChevronsLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={goPrev}
            disabled={canGoPrev}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={goNext}
            disabled={canGoNext}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={goToEnd}
            disabled={nextDisable}
          >
            <ChevronsRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
