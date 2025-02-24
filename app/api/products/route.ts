import { authoptions } from "@/lib/auth";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/product";
import Products from "@/lib/models/products";
import { connectToDB } from "@/lib/mongoDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const user = await getServerSession(authoptions);
    if (!user) {
      return new NextResponse("Unauthadized", { status: 401 });
    }
    await connectToDB();
    const {
      title,
      barcode,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (
      !title ||
      !description ||
      !media ||
      !category ||
      !price ||
      !expense
    ) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }
    const newProduct = await Products.create({
      title,
      barcode,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });
    await newProduct.save();

    if (collections) {
      for (const collectionId of collections){
        const collection = await Collection.findById(collectionId);
        if(collection) {
          collection.products.push(newProduct._id);
          await collection.save();
        }
      }
    }
    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[products_POST]", err);
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });
      return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.log("[products_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
