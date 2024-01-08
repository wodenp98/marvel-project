"use client";

import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useStore from "@/lib/store/tableHeroes";
import Link from "next/link";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { prisma } from "@/utils/prisma/prisma";
import { useSession } from "next-auth/react";

type HeroItem = {
  classhero: string;
  name: string;
  imageUrl: string;
  indice: number;
  stars: "5" | "6" | "7";
  rank: "1" | "5" | "2" | "3" | "4";
  cs: number;
  id: string;
};
const columns: ColumnDef<HeroItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "classhero",
    header: "Class",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("classhero")}</div>
    ),
  },
  {
    accessorKey: "indice",
    header: "Indice",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("indice")}</div>
    ),
  },
  {
    accessorKey: "stars",
    header: "Stars  ",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("stars")}</div>
    ),
  },
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => <div className="capitalize">{row.getValue("rank")}</div>,
  },
  {
    accessorKey: "cs",
    header: "CS",
    cell: ({ row }) => <div className="capitalize">{row.getValue("cs")}</div>,
  },
];
export const TableAddNewHeroes = () => {
  const { data: session } = useSession();
  const data = useStore((state) => state.items);
  const removeItem = useStore((state) => state.removeItem);
  const reset = useStore((state) => state.reset);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isClient, setIsClient] = useState(false);

  // if database = new table et pas table et new store?
  // meme procéder que pour le dashboard

  useEffect(() => {
    setIsClient(true);
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const deleteRow = () => {
    const test = table.getFilteredSelectedRowModel();
    test.rows.forEach((row) => {
      removeItem(row.original.id);
    });
  };

  const addToDashboard = async () => {
    if (!session) {
      return null;
    }

    const res = await fetch("/api/dashboardUser", {
      method: "POST",
      body: JSON.stringify({
        heros: data,
        userId: session.user.id,
      }),
    });

    if (res.ok) {
      reset();
    }
  };

  return (
    <>
      {isClient ? (
        <div>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
          <div className="w-10/12 mx-auto">
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter name..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
          <Button onClick={deleteRow}>Delete row</Button>
          <Button onClick={addToDashboard}>Create your dashboard</Button>
        </div>
      ) : null}
    </>
  );
};
