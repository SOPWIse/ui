import { useSidebar } from "@/components/ui/sidebar";

import useGetAllUsers from "@/hooks/queries/user/useGetAllUsers";
import DataTable from "@/components/data-table/data-table";
import DataTableRowActions from "@/components/data-table/data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import useDataTable from "@/hooks/data-table/use-data-table";
import { Pencil, Trash } from "lucide-react";
import { UserData } from "@/schemas/all-users";
import { cn } from "@/lib/utils";

export const getUserTableColumns = ({
  onDelete,
  onEdit,
}: {
  onEdit: (data: UserData) => void;
  onDelete: (data: UserData) => void;
}): ColumnDef<UserData>[] => [
  {
    accessorFn: (data) => data.name,
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorFn: (data) => data.email,
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorFn: (data) => data.provider,
    accessorKey: "provider",
    header: "Provider",
  },
  {
    accessorFn: (data) => data.role,
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        actions={[
          {
            label: "Edit",
            icon: <Pencil className="w-4 h-4" />,
            onClick: () => onEdit(row.original),
            withSeparator: true,
          },
          {
            label: "Delete",
            icon: <Trash className="w-4 h-4 text-red-500" />,
            onClick: () => onDelete(row.original),
          },
        ]}
      />
    ),
  },
];

const UserManagement = () => {
  const { open } = useSidebar();
  const { state, setSorting, setPagination } = useDataTable();

  const { page, pageSize, searchBy, sortBy, sortOrder } = state;

  const { data, isLoading } = useGetAllUsers({
    page,
    search: searchBy,
    limit: pageSize,
    sortBy,
    sortOrder,
  });

  const totalPage = data?.data?.meta?.page?.total ?? 0;

  return (
    <section
      className={cn(
        `max-w-screen-lg mt-[100px] ms-40 transition-all duration-300 ease-in-out`,
        open ? "ps-[200px]" : "ps-[20px]"
      )}
    >
      <h1 className="mb-10 text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-4xl">
        User Management
      </h1>

      <DataTable
        state={state}
        totalPage={totalPage}
        isLoading={isLoading}
        columns={getUserTableColumns({
          onEdit: console.log,
          onDelete: console.log,
        })}
        data={data?.data?.data ?? []}
        onSortingChange={setSorting}
        pageSize={pageSize}
        onPageChange={setPagination}
      />
    </section>
  );
};

export default UserManagement;
