import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Action<TData> {
  label: string;
  icon: React.ReactNode;
  onClick: (value: TData) => void;
  withSeparator?: boolean;
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  actions: Action<TData>[];
}

const DataTableRowActions = <TData,>({
  row,
  actions,
}: DataTableRowActionsProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => (
          <div key={index}>
            <DropdownMenuItem onClick={() => action.onClick(row.original)}>
              <span className="mr-2">{action.icon}</span>
              {action.label}
            </DropdownMenuItem>
            {action.withSeparator && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowActions;
