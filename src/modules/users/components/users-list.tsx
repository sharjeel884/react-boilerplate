import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useUsers, useDeleteUser } from "../hooks/use-users";
import type { User } from "../types/user.types";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { UserModal } from "./user-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { H1 } from "@/components/ui/typography";
import { FormError } from "@/components/ui/form-error";
import { DebounceSearch, Pagination, DataTable } from "@/components/common";

const columnHelper = createColumnHelper<User>();

export const UsersList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { data, isLoading, error } = useUsers({
    page,
    limit: 10,
    search: debouncedSearch,
  });
  const { mutate: deleteUser } = useDeleteUser();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => (
        <Badge variant={info.getValue() === "admin" ? "default" : "secondary"}>
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <Badge variant={info.getValue() === "active" ? "success" : "destructive"}>
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setEditingUser(info.row.original);
              setIsModalOpen(true);
            }}
          >
            <FiEdit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this user?")) {
                deleteUser(info.row.original.id);
              }
            }}
            className="text-error-600 hover:text-error-700 hover:bg-error-50"
          >
            <FiTrash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    }),
  ];

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleCreate = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleSearchChange = (value: string) => {
    setDebouncedSearch(value);
    setPage(1); // Reset to first page on search
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <FormError
        message={`Error loading users: ${error instanceof Error ? error.message : "Unknown error"}`}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <H1>Users Management</H1>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <FiPlus className="h-5 w-5" />
          Add User
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
        <div className="mb-4">
            <DebounceSearch
              value={search}
              onChange={(value) => {
                setSearch(value);
                handleSearchChange(value);
              }}
              placeholder="Search users..."
              debounceMs={500}
            />
          </div>

          <DataTable
            columns={columns}
            data={data?.users || []}
            loading={isLoading}
            emptyMessage="No users found"
          />

          {data && (
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(data.total / data.limit)}
              totalItems={data.total}
              itemsPerPage={data.limit}
              onPageChange={handlePageChange}
              className="mt-4"
              showPageNumbers={true}
            />
          )}
        </CardContent>
      </Card>

      {isModalOpen && (
        <UserModal user={editingUser} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

