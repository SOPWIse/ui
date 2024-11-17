import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function DataTableLoader({ pageSize }: { pageSize: number }) {
  const renderSkeletonRow = () => (
    <TableRow>
      <TableCell>
        <Skeleton className="h-6 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-full" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-6 w-full" />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className="h-6 w-full" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-6 w-full" />
      </TableCell>
    </TableRow>
  );

  return (
    <div className="border rounded-lg w-full">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Skeleton className="h-2 w-full" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-2 w-full" />
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Skeleton className="h-2 w-full" />
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Skeleton className="h-2 w-full" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-2 w-full" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: pageSize }, (_, index) => (
              <React.Fragment key={index}>{renderSkeletonRow()}</React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
