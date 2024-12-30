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

import {
  BookOpen,
  Copy,
  MoreHorizontal,
  Pen,
  ScanEye,
  Star,
  Trash,
} from "lucide-react";
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
    navigate(`/sop-content/${id}/overview`);
  }

  function handleManage(id: string) {
    navigate(`/sop-content/details/${id}`);
  }

  function handleReview(id: string) {
    navigate(`/sop-content/comment/${id}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="min-w-">
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

        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            // @ts-ignore
            handleManage(row.original?.id);
          }}
        >
          <BookOpen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Manage SOP
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            // @ts-ignore
            handleReview(row.original?.id);
          }}
        >
          <ScanEye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Review SOP
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
