import User from "@/lib/models/user"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest, NextResponse } from "next/server"
import {hash} from 'bcryptjs';


export const POST = async (req: NextRequest) => {
    try {
      await connectToDB()
  
      const { username,email, password,address, image } = await req.json();
  
      const existingCollection = await User.findOne({ username })
  
      if (existingCollection) {
        return new NextResponse("Collection already exists", { status: 400 })
      }
  
      if (!username || !image) {
        return new NextResponse("Username and image are required", { status: 400 })
      }
         /* Hash the password */
         const saltRounds = 10
         const hashedPassword = await hash(password, saltRounds)
  
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        address,
        image,
      })
  
      await newUser.save()
  
      return NextResponse.json(newUser, { status: 200 })
    } catch (err) {
      console.log("[user_POST]", err)
      return new NextResponse("Internal Server Error", { status: 500 })
    }
  }