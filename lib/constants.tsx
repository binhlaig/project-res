import {
    LayoutDashboard,
    Shapes,
    ShoppingBag,
    Tag,
    UsersRound,
  } from "lucide-react";

export const NavLink = [
    {
        url: "/dashboard",
        icon: <LayoutDashboard/>,
        label: "Dashboard"
    },
    {
        url:"/dashboard/products",
        icon:<Shapes/>,
        label : "Products"

    },
    {
        url:"/dashboard/collection",
        icon: <Tag/>,
        label : "Collection"
    },
    {
        url:"/dashboard/order",
        icon: <ShoppingBag/>,
        label : "Order"
    },
    {
        url: "/dashboard/customber",
        icon: <UsersRound/>,
        label:"User"
    }


]