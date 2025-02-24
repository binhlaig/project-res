import { authoptions } from "@/lib/auth";
import Order from "@/lib/models/order";
import { connectToDB } from "@/lib/mongoDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export const DELETE = async (
    req: NextRequest,
    { params }: { params: { orderId: string } }
  ) => {
    try {
      const user = await getServerSession(authoptions);
      if (!user) {
        return new NextResponse("Unauthdized", { status: 401 });
      }
      await connectToDB();
      const order = await Order.findById(params.orderId);
  
      if (!order) {
        return new NextResponse("Product not found!", { status: 404 });
      }
      await Order.findOneAndDelete(order._id);
  
      return new NextResponse(JSON.stringify({ message: "Order deleted!" }), {
        status: 200,
      });
    } catch (err) {
      console.log("productId_DELETE", err);
      return new NextResponse("Internal Server Error!", { status: 500 });
    }
  };