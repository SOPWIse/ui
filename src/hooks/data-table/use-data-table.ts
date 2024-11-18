import { PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";

export type DataTableState = {
  page: number;
  searchText: string | undefined;
  searchBy: string | undefined;
  sortBy: string | undefined;
  sortOrder: "asc" | "desc" | undefined;
  pageSize: number;
};

const initialState: DataTableState = {
  page: 1,
  searchText: undefined,
  searchBy: undefined,
  sortBy: undefined,
  sortOrder: undefined,
  pageSize: 10,
};

const useDataTable = () => {
  const [state, setState] = useState<DataTableState>(initialState);

  const setPage = (page: number) => setState((prev) => ({ ...prev, page }));
  const setSearchText = (text: string | undefined) =>
    setState((prev) => ({ ...prev, searchText: text }));
  const setSearchBy = (searchBy: string | undefined) =>
    setState((prev) => ({ ...prev, searchBy }));
  const setSortBy = (sortBy: string | undefined) =>
    setState((prev) => ({ ...prev, sortBy }));
  const setSortOrder = (sortOrder: "asc" | "desc" | undefined) =>
    setState((prev) => ({ ...prev, sortOrder }));
  const setPageSize = (pageSize: number) =>
    setState((prev) => ({ ...prev, pageSize }));

  const updateState = (data: Partial<DataTableState>) =>
    setState((pre) => ({ ...pre, ...data }));

  const resetState = () => setState(initialState);

  function setSorting(sorting: SortingState): void {
    const isDesc = sorting?.[0]?.desc;
    const id = sorting?.[0]?.id;

    updateState({ sortBy: id, sortOrder: isDesc ? "desc" : "asc" });
  }

  function setPagination(page: PaginationState): void {
    
          updateState({ page: page?.pageIndex + 1, pageSize: page?.pageSize });
        
  }

  return {
    state,
    setPage,
    setSearchText,
    setSearchBy,
    setSortBy,
    setSortOrder,
    setPageSize,
    resetState,
    updateState,
    setSorting,
    setPagination
  };
};

export default useDataTable;
