import dbConnect from "@/dbConfig/dbConnect";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

dbConnect();

export async function DELETE(request,{params}){
    try {
        const ids = params.id;
        const token = request.cookies.get('token');

        const decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET);
    
        const {id} = decodedToken;
   
        const user = await User.findById(id);
        user.quotes.splice(ids, 1);
        await user.save();
        console.log(user.quotes)
        return NextResponse.json({message: 'quote deleted successfully'},{status: 201})
    } catch (error) {
        return NextResponse.json({message: error},{status: 400})
    }
}