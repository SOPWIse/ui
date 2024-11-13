import { useState } from "react";
import { Button } from "@/components/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllUsers from "@/hooks/queries/user/useGetAllUsers";
import { ArrowUpDown } from "lucide-react";
import { Loader } from "@/components/loader";

const UserManagement = () => {
  const { open } = useSidebar();

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined,
  );

  const { data, isLoading, isError } = useGetAllUsers({
    page,
    search,
    sortBy,
    sortOrder,
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const totalItems = data?.data?.meta?.items?.totalItems ?? 0;
  const pageSize = data?.data?.meta?.page?.size ?? 8;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section
      className={`max-w-screen-2xl mt-[100px] ms-40 transition-all duration-300 ease-in-out ${
        open ? "ps-[200px]" : "ps-[20px]"
      }`}
    >
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl mb-10">
        User Management
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("name")}>
                Name
                <ArrowUpDown size={"15px"} />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("email")}>
                Email
                <ArrowUpDown size={"15px"} />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("role")}>
                Role
                <ArrowUpDown size={"15px"} />
              </Button>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>No users found.</TableCell>
            </TableRow>
          ) : (
            data?.data?.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{""}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Pagination className={"justify-end mt-10 pe-10"}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(page - 1)}
              className={
                page === 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={index + 1 === page}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(page + 1)}
              className={
                page === totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default UserManagement;
