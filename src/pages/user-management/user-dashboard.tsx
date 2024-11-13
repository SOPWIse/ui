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



const UserManagement = () => {
  const { open } = useSidebar();
  const {data} =  useGetAllUsers();
  
  return (
    <section className={`max-w-screen-2xl mt-[100px] ms-40 transition-all duration-300 ease-in-out ${
          open ? "ps-[200px]" : "ps-[20px]"
        }`}>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl mb-10">
        User Management
      </h1>
      <Table className="h-[50vh]">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className={"justify-end mt-10 pe-10"}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default UserManagement;
