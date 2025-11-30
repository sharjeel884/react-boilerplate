# Common Components Guide

## Overview

Reusable common components for tables, pagination, and search functionality.

## Components

### 1. DebounceSearch

A search input component with built-in debouncing to reduce API calls.

**Location:** `src/components/common/debounce-search.tsx`

**Props:**
- `value: string` - Current search value
- `onChange: (value: string) => void` - Called after debounce delay
- `placeholder?: string` - Input placeholder (default: "Search...")
- `debounceMs?: number` - Debounce delay in milliseconds (default: 500)
- `className?: string` - Additional CSS classes
- `onSearchChange?: (value: string) => void` - Optional callback for immediate changes

**Usage:**
```tsx
import { DebounceSearch } from "@/components/common";

const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");

<DebounceSearch
  value={search}
  onChange={(value) => {
    setSearch(value);
    setDebouncedSearch(value);
  }}
  placeholder="Search users..."
  debounceMs={500}
/>
```

**Features:**
- Automatic debouncing to reduce API calls
- Icon support (search icon included)
- Responsive design
- Syncs with parent value

### 2. Pagination

A fully-featured pagination component with page numbers and navigation.

**Location:** `src/components/common/pagination.tsx`

**Props:**
- `currentPage: number` - Current active page
- `totalPages: number` - Total number of pages
- `totalItems: number` - Total number of items
- `itemsPerPage: number` - Items per page
- `onPageChange: (page: number) => void` - Page change handler
- `className?: string` - Additional CSS classes
- `showInfo?: boolean` - Show item count info (default: true)
- `showPageNumbers?: boolean` - Show page number buttons (default: false)
- `maxPageNumbers?: number` - Max page numbers to show (default: 5)

**Usage:**
```tsx
import { Pagination } from "@/components/common";

<Pagination
  currentPage={page}
  totalPages={Math.ceil(total / limit)}
  totalItems={total}
  itemsPerPage={limit}
  onPageChange={setPage}
  showPageNumbers={true}
  maxPageNumbers={7}
/>
```

**Features:**
- Previous/Next navigation
- Page number buttons with ellipsis
- Item count display
- Responsive design
- Disabled states for first/last pages
- Customizable appearance

### 3. DataTable

A reusable table component built on TanStack React Table.

**Location:** `src/components/common/data-table.tsx`

**Props:**
- `columns: ColumnDef<TData, any>[]` - Table column definitions
- `data: TData[]` - Table data array
- `className?: string` - Additional CSS classes
- `emptyMessage?: string` - Message when no data (default: "No data available")
- `loading?: boolean` - Loading state
- `loadingComponent?: React.ReactNode` - Custom loading component
- All other TanStack Table options

**Usage:**
```tsx
import { DataTable } from "@/components/common";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
];

<DataTable
  columns={columns}
  data={users}
  loading={isLoading}
  emptyMessage="No users found"
/>
```

**Features:**
- Built on TanStack React Table
- Automatic loading state
- Empty state handling
- Responsive design
- Hover effects
- Type-safe with TypeScript
- Supports all TanStack Table features

## Complete Example

Here's a complete example using all three components:

```tsx
import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DebounceSearch, Pagination, DataTable } from "@/components/common";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUsers } from "../hooks/use-users";
import type { User } from "../types/user.types";

const columnHelper = createColumnHelper<User>();

export const UsersList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading } = useUsers({
    page,
    limit: 10,
    search: debouncedSearch,
  });

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
  ];

  const handleSearchChange = (value: string) => {
    setDebouncedSearch(value);
    setPage(1); // Reset to first page on search
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {/* Search */}
        <div className="mb-4">
          <DebounceSearch
            value={search}
            onChange={handleSearchChange}
            placeholder="Search users..."
            debounceMs={500}
          />
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={data?.users || []}
          loading={isLoading}
          emptyMessage="No users found"
        />

        {/* Pagination */}
        {data && (
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(data.total / data.limit)}
            totalItems={data.total}
            itemsPerPage={data.limit}
            onPageChange={setPage}
            className="mt-4"
            showPageNumbers={true}
          />
        )}
      </CardContent>
    </Card>
  );
};
```

## Benefits

1. **Reusability** - Use across multiple modules
2. **Consistency** - Same look and feel everywhere
3. **Type Safety** - Full TypeScript support
4. **Performance** - Debounced search reduces API calls
5. **Accessibility** - Proper ARIA labels and keyboard navigation
6. **Responsive** - Works on all screen sizes
7. **Customizable** - Flexible props for different use cases

## Import Path

All components can be imported from:

```tsx
import { DebounceSearch, Pagination, DataTable } from "@/components/common";
```

Or individually:

```tsx
import { DebounceSearch } from "@/components/common/debounce-search";
import { Pagination } from "@/components/common/pagination";
import { DataTable } from "@/components/common/data-table";
```

