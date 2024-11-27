import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { startCase, upperCase } from "lodash";
import { Badge } from "@/components/ui";
import { ComponentProps } from "react";
import { Check } from "lucide-react";
import { BsGoogle, BsMicrosoft } from "react-icons/bs";
import { UserData } from "@/schemas/all-users";
import { DataTableRowActions } from "./data-table-row-actions";

const BADGE_VARIANTS_PER_PROVIDER = {
  sopwise: {
    variant: "secondary",
    icon: <Check className="w-2 h-2" />,
  },
  oauth_google: {
    variant: "info",
    icon: <BsGoogle className="w-2 h-2" />,
  },
  oauth_microsoft: {
    variant: "success",
    icon: <BsMicrosoft className="w-2 h-2" />,
  },
} satisfies Record<
  "sopwise" | "oauth_google" | "oauth_microsoft",
  {
    variant: ComponentProps<typeof Badge>["variant"];
    icon: JSX.Element;
  }
>;

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
