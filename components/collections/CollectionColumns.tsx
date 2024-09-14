"use client"

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../delete-button";
import Link from "next/link";
import { CollectionType } from "@/lib/types";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/collections/${row.original._id}`} className="hover:text-blue-700">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "subtitle",
    header: "Subtitle",
    cell: ({ row }) => <p>{row.original.subtitle}</p>,
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="collection" id={row.original._id}/>,
  },
];
