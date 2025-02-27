import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authoptions } from "@/lib/auth";
import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest)=> {
    try {
        const user = await getServerSession(authoptions)
        if(!user){
            return new NextResponse("Unauthorized!",{status:403})
        }
        await connectToDB();
        const {title,description,image} = await req.json()
        const existingCollection = await Collection.findOne({title});

        if(existingCollection){
            return new NextResponse("Collection ရှိနေသည်။", {status:400});
        }
        const newCollection = await Collection.create({
            title,
            description,
            image,
        });
        await newCollection.save();
        return NextResponse.json(newCollection,{status: 200});
        
    } catch (err) {
        console.log("[collections_POST]", err);
        return new NextResponse("Internal Server error", {status: 500});
    }
}
export const GET = async(req: NextRequest)=> {
    try {
        await connectToDB();

        const collections = await Collection.find().sort({createdAt: "desc"});
        return NextResponse.json(collections,{status:200});
        
    } catch (err) {
        console.log("[collection_GET]",err);
        return new NextResponse("Internal Server error", {status:500});
    }
}