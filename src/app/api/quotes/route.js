import dbConnect from "@/dbConfig/dbConnect";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(){
    try {
        const users = await User.find({},'quotes username _id');
        const allQuotes = users.map(user => ({
            username : user.username,
            quotes: user.quotes,
            id: user._id
        }));
        return NextResponse.json(allQuotes,{status: 201})
    } catch (error) {
        return NextResponse.json({message: 'error while getting data'},{status: 400})
    }
}