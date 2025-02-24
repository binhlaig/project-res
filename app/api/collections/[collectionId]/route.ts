import { authoptions } from "@/lib/auth";
import Collection from "@/lib/models/Collection";
import Products from "@/lib/models/products";
import { connectToDB } from "@/lib/mongoDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const GET = async(req: NextRequest, {params}: {params:{collectionId: string}})=>{
    try {
        await connectToDB();
        let collection = await Collection.findById(params.collectionId)
         if(!collection){
            return new NextResponse(JSON.stringify({message : "Collection not found"}),{status: 404});
         }
         return NextResponse.json(collection,{status: 200});
        
    } catch (err) {
        console.log("[collectionId_GET]",err);
        return new NextResponse("internal Server err!", {status: 500})     
    }
}
export const POST = async(req:NextRequest, {params}:{params:{collectionId: string}})=>{
    try {
        const user = await getServerSession(authoptions);
        if(!user)  {
 
            return new NextResponse("Unauthorized",{status:404});
        }
        await connectToDB();
        let collection =await Collection.findById(params.collectionId);
        if (!collection) {
            return new NextResponse("Collection not found", { status: 404 });
          }
          const { title, description, image } = await req.json();

          if (!title || !image) {
            return new NextResponse("Title and image are required", { status: 400 });
          }
          collection = await Collection.findByIdAndUpdate(
            params.collectionId,
            { title, description, image },
            { new: true }
          );
      
          await collection.save();

          return NextResponse.json(collection,{status:200});      
        
    } catch (err) {
        console.log("[collectionId_POST]", err);
        return new NextResponse("Internal Server err",{status: 500})       
    }
}
export const DELETE = async(req:NextRequest, {params}:{params:{collectionId: string}})=> {
    try {
        const user = await getServerSession(authoptions);
        if(!user)  {
 
            return new NextResponse("Unauthorized",{status:401});
        }
        await connectToDB();
        await Collection.findByIdAndDelete(params.collectionId);
        
        await Products.updateMany(
            {collections: params.collectionId},
            {$pull: {collections: params.collectionId}}
        )
        return new NextResponse("Collection is deleted", { status: 200 });

    } catch (err) {
        console.log("[collection_DELETE]",err);
        return new NextResponse("Internal Server err",{status: 500});    
        
    }
}