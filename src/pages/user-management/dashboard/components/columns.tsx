import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { startCase, upperCase } from "lodash";
import { Badge } from "@/components/ui";
import { UserData } from "@/schemas/all-users";
import { DataTableRowActions } from "./data-table-row-actions";
import { BADGE_VARIANTS_PER_PROVIDER } from "../constants/badge-variants-per-provider";

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-semibold">
            {startCase(row.original.name)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-normal">
            {row.original.email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "provider",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-semibold">
            <Badge
              className="flex gap-2"
              variant={
                BADGE_VARIANTS_PER_PROVIDER[
                  row?.original
                    ?.provider as keyof typeof BADGE_VARIANTS_PER_PROVIDER
                ].variant
              }
            >
              {
                BADGE_VARIANTS_PER_PROVIDER[
                  row?.original
                    ?.provider as keyof typeof BADGE_VARIANTS_PER_PROVIDER
                ].icon
              }
              {upperCase(row?.original?.provider)}
            </Badge>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-semibold">
            {row.original.role}
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
