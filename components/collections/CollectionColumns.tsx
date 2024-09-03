"use client"

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../delete-button";
import Link from "next/link";
import { CollectionType } from "@/lib/types";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <p>{row.original.title}</p>,
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete />,
  },
];
