"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui";
import { Row } from "@tanstack/react-table";

import { Copy, MoreHorizontal, Pen, Star, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  // RECEIVE THE ROW HERE
  row,
}: DataTableRowActionsProps<TData>) {
  const navigate = useNavigate();
  function handleDelete() {
    console.log("Deleting");
  }
  function handleEdit(id: string) {
    navigate(`/user/edit-user/${id}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            // @ts-ignore
            handleEdit(row.original?.id);
          }}
        >
          <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Copy className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Make a copy
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Star className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Favorite
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            // SEND ID
            handleDelete();
          }}
        >
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
