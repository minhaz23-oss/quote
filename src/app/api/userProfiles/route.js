import dbConnect from "@/dbConfig/dbConnect";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";

dbConnect();
export async function POST(req){
    try {
        //get the id from frontend
        const reqBody = await req.json();
        const {userId} = reqBody
        //find the user
        const user = await User.findById(userId);
        const {username,email,quotes} = user;
        console.log(username,email,quotes)
        return NextResponse.json(user,{status: 201})
    } catch (error) {
        return NextResponse.json({message : 'error while fetching data'},{status: 400})
    }
}