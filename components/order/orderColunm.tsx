"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/OrderDelete";


export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "username",
    header: "OrderUser",
  },
  {
    accessorKey : "cart",
    header: "Ordername",
    cell: ({ row }) => <p>{row.original.cart.map((order:any)=>(
        <p>{order.item.title}</p>
    ))}</p>,
  },
  {
    accessorKey : "cart",
    header: "Size",
    cell: ({ row }) => <p>{row.original.cart.map((order:any)=>(
        <p>{order.size}</p>
    ))}</p>,
  },
  {
    accessorKey : "cart",
    header: "Quantity",
    cell: ({ row }) => <p>{row.original.cart.map((order:any)=>(
        <p>{order.quantity}</p>
    ))}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="order" id={row.original._id} />,
  },
];