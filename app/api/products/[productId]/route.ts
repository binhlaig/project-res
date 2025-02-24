import { authoptions } from "@/lib/auth";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/product";
import Products from "@/lib/models/products";
import { connectToDB } from "@/lib/mongoDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const user = await getServerSession(authoptions);
    if (!user) {
      return new NextResponse("Unauthdized", { status: 401 });
    }
    await connectToDB();
    const product = await Products.findById(params.productId);

    if (!product) {
      return new NextResponse("Product not found!", { status: 404 });
    }
    await Product.findOneAndDelete(product._id);

    return new NextResponse(JSON.stringify({ message: "product deleted!" }), {
      status: 200,
    });
  } catch (err) {
    console.log("productId_DELETE", err);
    return new NextResponse("Internal Server Error!", { status: 500 });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();
    const product = await Products.findById(params.productId).populate({
      path: "collections",
      model: Collection
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log("productId_GET", err);
    return new NextResponse("Internal Server Err!", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const user = await getServerSession(authoptions);
    if (!user) {
      return new NextResponse("Unauthaized", { status: 401 });
    }
    const product = await Products.findById(params.productId);
    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }
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

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create a new product", {
        status: 400,
      });
    }
    const addedCollections = collections.filter(
      (collectionId: string) => !product.collections.includes(collectionId)
    );
    const removedCollections = product.collections.filter(
      (collectionId: string) => !collections.includes(collectionId)
    );
    // Update collections
    await Promise.all([
      // Update added collections with this product
      ...addedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $push: { products: product._id },
        })
      ),

      // Update removed collections without this product
      ...removedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      ),
    ]);

    // Update product
    const updatedProduct = await Products.findByIdAndUpdate(
      product._id,
      {
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
      },
      { new: true }
    ).populate({ path: "collections", model: Collection });

    await updatedProduct.save();

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.log("productId_POST", err);
    return new NextResponse("Internal Server Error!", { status: 500 });
  }
};
