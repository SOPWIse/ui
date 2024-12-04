import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDate } from "@/utils/formatDate";

export const columns: ColumnDef<(typeof sopMockData)[0]>[] = [
  {
    accessorKey: "sopName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SOP Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-semibold">
            {row.original.sopName}
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
          <span className="max-w-[500px] truncate font-normal">
            {row.original.status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "approvalStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approval Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-semibold">
            {row.original.approvalStatus}
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
          <span className="max-w-[500px] truncate font-semibold">
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

export const sopMockData = [
  {
    id: "qwertyuiop",
    sopName: "SOP 1",
    status: "Active",
    approvalStatus: "Approved",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
  },
  {
    id: "asdfghjkl",
    sopName: "SOP 2",
    status: "Inactive",
    approvalStatus: "Pending",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
  },
  {
    id: "zxcvbnm",
    sopName: "SOP 3",
    status: "Active",
    approvalStatus: "Approved",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
  },
  {
    id: "poiuytrewq",
    sopName: "SOP 4",
    status: "Inactive",
    approvalStatus: "Pending",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
  },
];
