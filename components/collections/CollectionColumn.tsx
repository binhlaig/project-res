"use client"
import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom ui/Delete"
import Link from "next/link"

export const columns: ColumnDef<CollectionType>[] = [
    {
      accessorKey: "title",
      header: "ထုတ်ကုန်ပစွည်း အမည်",
      cell: ({row}) =>(<Link href={`/dashboard/collection/${row.original._id}`} className="hover:text-red-800">{row.original.title}</Link>)
    },
    {
        accessorKey: "products",
        header: "Products",
        cell: ({ row }) => <p>{row.original.products.length}</p>,
      },
      {
        id: "action",
        cell: ({row}) => <Delete item="collection" id={row.original._id}/>
      },
  ]