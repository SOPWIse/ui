import React, { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { Command, CommandList, CommandSeparator } from "cmdk";
import { debounce } from "lodash";
import { CheckIcon, LucideIcon } from "lucide-react";
import { AiOutlineLoading, AiOutlineReload } from "react-icons/ai";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { MdCancel, MdClear } from "react-icons/md";
import {
  Badge,
  Button,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
} from "@/components/ui";
import { cn } from "@/lib/utils";

interface DataTableFacetedFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  value?: any;
  onSearch: (
    value?: string | undefined,
    sort?: "asc" | "desc",
    limit?: number,
  ) => void;
  options: {
    label: string;
    value: string;
    icon?: LucideIcon;
  }[];
  isLoading?: boolean;
  tooltipContent?: React.ReactNode;
  chipLimit?: number;
  sorting: "asc" | "desc";
  limit: number;
}

function Chip({ id, onSelect }: { id: string; onSelect: () => void }) {
  const { data, isPending } = { data: { name: "test" }, isPending: false };
  if (isPending)
    return <AiOutlineLoading className="w-4 h-auto m-0 animate-spin" />;
  return (
    <Badge
      variant="secondary"
      key={id}
      className="gap-1 px-1 font-normal rounded-sm w-fit "
    >
      {data?.name}
      <MdCancel
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className="w-4 h-auto hover:opacity-75"
      />
    </Badge>
  );
}

export function AsyncDataTableFacetedFilter<TData, TValue>({
  value,
  column,
  title,
  options,
  isLoading,
  onSearch,
  chipLimit = 2,
  sorting,
  limit,
}: DataTableFacetedFilter<TData, TValue>) {
  console.log(column?.getFilterValue());
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  const handleSearch = debounce(
    (value: string, sort?: "asc" | "desc", lim?: number) => {
      if (value === "" || value === undefined || value === null) {
        onSearch(undefined, sort, lim ?? limit);
      } else {
        onSearch(value, sort, lim ?? limit);
      }
    },
    300,
  );
  console.log("value", value);

  useEffect(() => {
    if (value === "" || value === undefined || value === null) {
      handleSearch("");
    }
  }, [value]);

  const isOptionsEmpty = !options || options?.length === 0;

  const handleOnSelect = (value: string) => {
    selectedValues.delete(value);
    const filterValues = Array.from(selectedValues);
    column?.setFilterValue(
      filterValues.length
        ? [filterValues?.at(filterValues.length - 1)]
        : undefined,
    );
  };

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed border-muted-foreground"
        >
          <PlusCircledIcon className="w-4 h-4 mr-2" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="h-4 mx-2" />
              {/* <Badge
                variant="secondary"
                className="px-1 font-normal rounded-sm lg:hidden"
              >
                {selectedValues.size}
              </Badge> */}
              {selectedValues.size > chipLimit ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="secondary"
                      className="h-6 px-2 font-normal rounded-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {selectedValues.size} selected
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-[400px]">
                    <div className="flex flex-wrap gap-2" ref={parent}>
                      {selectedValues.size > 0 &&
                        Array.from(selectedValues).map((value) => (
                          <Chip
                            id={value}
                            onSelect={() => handleOnSelect(value)}
                          />
                        ))}
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="flex flex-wrap gap-2" ref={parent}>
                  {selectedValues.size > 0 &&
                    Array.from(selectedValues).map((value) => (
                      <Chip id={value} onSelect={() => handleOnSelect(value)} />
                    ))}
                </div>
              )}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="start">
        <Command shouldFilter={false}>
          <div className="flex gap-2 border-b">
            <CommandInput
              placeholder={"Search a Group"}
              onValueChange={(val) => handleSearch(val)}
            />
            {isLoading ? (
              <AiOutlineReload className="w-5 h-auto m-0 ml-5 animate-spin" />
            ) : (
              <>
                {sorting === "desc" ? (
                  <BsSortDown
                    className="w-6 h-auto transition-colors duration-200 cursor-pointer fill-muted-foreground hover:fill-primary"
                    onClick={() => handleSearch("", "asc")}
                  />
                ) : (
                  <BsSortUp
                    className="w-6 h-auto transition-colors duration-200 cursor-pointer fill-muted-foreground hover:fill-primary"
                    onClick={() => handleSearch("", "desc")}
                  />
                )}

                <AiOutlineReload
                  className="w-6 h-auto m-0 transition-colors duration-200 cursor-pointer fill-muted-foreground hover:fill-primary"
                  onClick={() => handleSearch("")}
                />
              </>
            )}
            <div className="mx-1 flex w-[60px] items-center justify-center">
              <Select
                value={String(limit)}
                onValueChange={(value) => {
                  handleSearch("", sorting, Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={5} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <CommandList>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-2 p-2">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
              </div>
            ) : (
              <>
                <CommandGroup>
                  {isOptionsEmpty ? (
                    <div className="flex flex-col items-center justify-center gap-2 p-2 text-sm font-semibold text-muted-foreground">
                      <HiMagnifyingGlass className="w-5 h-auto m-0 fill-muted-foreground" />
                      No items found
                    </div>
                  ) : (
                    <>
                      {options.map((option) => {
                        const isSelected = selectedValues.has(option.value);
                        return (
                          <CommandItem
                            className="cursor-pointer"
                            key={option.value}
                            value={option.value}
                            onSelect={() => {
                              if (isSelected) {
                                selectedValues.delete(option.value);
                              } else {
                                selectedValues.add(option.value);
                              }
                              const filterValues = Array.from(selectedValues);
                              column?.setFilterValue(
                                filterValues.length
                                  ? [filterValues?.at(filterValues.length - 1)]
                                  : undefined,
                              );
                            }}
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible",
                              )}
                            >
                              <CheckIcon className={cn("h-4 w-4")} />
                            </div>
                            {option.icon && (
                              <option.icon className="w-4 h-4 mr-2 text-muted-foreground" />
                            )}
                            <span>{option.label}</span>
                          </CommandItem>
                        );
                      })}
                    </>
                  )}
                </CommandGroup>
              </>
            )}
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center cursor-pointer bg-muted hover:bg-muted-foreground hover:text-muted-foreground"
                  >
                    <MdClear className="w-4 h-4 mr-2" />
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
