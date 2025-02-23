import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDate } from "@/utils/formatDate";
import { SOP } from "@/schemas/sop-content";
import { Badge } from "@/components/ui";
import { BADGE_VARIANTS_SOP } from "../sops-dashboard/constants";
import { upperCase } from "lodash";

export const columns: ColumnDef<SOP>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SOP Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-semibold">
            {row.original.title}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.original.author.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-semibold">
            <Badge
              className="flex gap-2"
              variant={
                BADGE_VARIANTS_SOP[
                  row?.original?.status as keyof typeof BADGE_VARIANTS_SOP
                ].variant
              }
            >
              {
                BADGE_VARIANTS_SOP[
                  row?.original?.status as keyof typeof BADGE_VARIANTS_SOP
                ].icon
              }
              {upperCase(row?.original?.status)}
            </Badge>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approval Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-semibold bg-accent-foreground/10 text-accent-foreground rounded-md px-2 py-1">
            {/* @ts-ignore */}
            {row?.original?.isListed ? "Approved" : "Pending"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {formatDate(row.original.updatedAt, "dd MMM yyyy")}
          </span>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
