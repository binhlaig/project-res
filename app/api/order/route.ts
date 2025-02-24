import Order from "@/lib/models/order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";


export const GET=async(req: NextRequest)=> {

    try {
        await connectToDB();
        const order= await Order.find().sort({createdAt: "desc"});
        return NextResponse.json(order,{status: 200});

    } catch (err) {
        console.log("[Order_GET]",err);
        return new NextResponse("Internal Server error", {status:500});       
    }
}